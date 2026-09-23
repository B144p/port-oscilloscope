---
name: bff-hide-backend
description: How to actually build the BFF (backend-for-frontend) layer that hides a real backend behind a Next.js App Router server — server-only fetch client, proxy route handlers, and TanStack Query v5 server-prefetch + HydrationBoundary — plus a three-item security/correctness checklist that a code review will otherwise catch after the fact. Use this whenever implementing or reviewing a Next.js proxy/BFF route that forwards to another backend, wiring up React Query SSR hydration, debugging why a server render is slow or hangs when a backend is down, investigating why an app seems to be calling itself or getting 404s from its own API routes, or checking whether a forwarded-visitor-IP header (X-Forwarded-For) can be spoofed. This is the implementation follow-up to ssr-vs-csr-audit's "add a BFF" remediation — reach for this once that decision is made, not to decide whether SSR/CSR is the problem in the first place.
---

# Hiding a backend behind a Next.js BFF (SSR + React Query hydration)

This pattern was implemented identically across three sibling Next.js apps sharing one backend. A code review afterward found the same three non-obvious bugs in every copy — because the pattern was copied, the bugs were copied with it. This skill is both the recipe and the checklist that would have caught them the first time.

## The shape of the pattern

Two fetch paths exist on the server side of the app. The browser never holds the backend's URL or any secret — grep the built client bundle for the backend's hostname to confirm.

- **Silent server-side read**, used only for prefetching: no visitor-attribution headers, since this call must never itself count as a "visit" or a rate-limited hit.
- **Proxy route handler**, the only thing a *browser* fetch is allowed to call. It forwards to the backend and passes through just enough of the visitor's own request for the backend to attribute it correctly (real visitor IP, a shared secret, user-agent) — see the pitfalls below for exactly how this goes wrong.

```ts
// lib/backend.ts — the only file that reads the backend URL/secret
import "server-only";

const API_URL = process.env.API_URL || missingEnv("API_URL"); // see pitfall 3

export async function backendGet<T>(path: string, opts?: { revalidate?: number }): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: opts?.revalidate ?? 60 } });
  if (!res.ok) throw new Error(`backend ${res.status} ${path}`);
  return res.json();
}

export async function proxyGet(request: Request, path: string): Promise<Response> {
  // forward attribution headers here — see pitfall 1 before trusting X-Forwarded-For
  const res = await fetch(`${API_URL}${path}`, { headers: buildForwardHeaders(request), cache: "no-store" });
  return new Response(res.body, { status: res.status }); // stream, don't buffer with .text()
}
```

One `QueryClient` factory serves both sides: a fresh instance per server request, one singleton in the browser.

```ts
// lib/query-client.ts
import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: isServer ? 0 : 1 } }, // see pitfall 2
  });
}

let browserClient: QueryClient | undefined;
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  return (browserClient ??= makeQueryClient());
}
```

The top-most Server Component every route needs (usually the root layout) is `async`, prefetches everything in parallel, and hydrates it down:

```tsx
const queryClient = getQueryClient();
await Promise.all([prefetchA(queryClient), prefetchB(queryClient) /* … */]);
return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
```

Keep client-safe code (query keys, types) separate from server-only code (`import "server-only"` at the top of anything touching the backend URL or secrets). The client's own `queryFn` calls this app's own `/api/*` route, never the backend directly — that way a failed SSR prefetch still recovers through a real client-side fetch.

If one query is also how a "visit" gets counted, give *only that one* `staleTime: 0` plus `refetchOnWindowFocus: false, refetchOnReconnect: false` — otherwise every tab refocus fires another counted ping. Everything else can stay at a long or infinite `staleTime`, since page content doesn't change mid-visit.

## Three pitfalls a review will catch — check these first

### 1. Trusting a forwarded-IP header without knowing who sets it

Forwarding the visitor's real IP to the backend (for rate limiting or view dedupe) almost always means reading `X-Forwarded-For`. Reading the *last* entry instead of the first looks secure — the reasoning is usually "the first entry is client-appendable, the last is what our proxy added" — but that reasoning has a hidden assumption: that something in front of this server actually *does* append to (or overwrite) that header. On a platform that does this (many edge/CDN platforms overwrite the header and drop client-supplied values), trusting the last hop is safe. Served directly with no such proxy in front, the header passes straight through unmodified — so "the last hop" is simply whatever the client sent, trivially spoofable.

**Fix:** gate on environment, not just on parsing position. Check for the platform's own signal that it manages this header, and require an explicit opt-in for self-hosted deployments that sit behind a proxy they control:

```ts
const TRUST_FORWARDED_FOR = process.env.VERCEL === "1" || process.env.TRUST_FORWARDED_FOR === "true";
const visitorIp = TRUST_FORWARDED_FOR ? lastHopOf(request.headers.get("x-forwarded-for")) : undefined;
```

Everywhere else, don't forward the header at all — let the backend fall back to its own connection IP rather than trust a value that might be attacker-controlled.

### 2. A shared `retry` default silently also runs on the server

React Query normally skips retries during server rendering — retries are a client-side resilience feature for a user staring at a loading spinner. But a `QueryClient` factory that sets `defaultOptions.queries.retry` to a flat number, shared unconditionally between the server-per-request client and the browser singleton, undoes that. A slow or unreachable backend then makes *every server render* wait out the fetch timeout, the retry delay, and another timeout — before the framework paints anything. This roughly doubles worst-case render latency and is easy to miss, since it's invisible whenever the backend is healthy.

**Fix:** make retry conditional on `isServer` in the factory, never a bare number shared between both.

### 3. A "sensible-looking" default for the backend URL that collides with the framework's own port

`const API_URL = process.env.API_URL ?? "http://localhost:3000"` is tempting — it makes local dev work with zero setup. But `3000` is also the default port most frameworks (including Next.js) use for their own dev/start server. If the env var is ever unset — a forgotten `.env.local`, a deploy target missing a variable — the app doesn't fail loudly. It fetches from *itself*, its own routes 404, and the failure shows up as confusing empty sections or a generic "link failure" message that doesn't point at the real cause.

**Fix:** don't default a required, correctness-relevant config value to something that can silently resolve to "a different but still-listening service." Throw a named error at first read instead:

```ts
const API_URL = process.env.API_URL || missingEnv("API_URL");
function missingEnv(name: string): never {
  throw new Error(`${name} is not set — point it at the backend.`);
}
```

A build/startup failure with a clear message beats a page that renders wrong for a reason nobody can see.

## Applying this as a checklist

When implementing this pattern, or reviewing a PR that touches a proxy/BFF layer for a hidden backend:

- Grep for `X-Forwarded-For` (or any per-visitor header) and confirm the code checks *where it's running*, not just which entry in the header to trust.
- Grep the shared `QueryClient` defaults for `retry` and confirm it's conditional on `isServer`.
- Grep every place the backend/API base URL is read and confirm no fallback resolves to a live, listening port on the same machine — especially the framework's own default port.
- **If this pattern is being copied across multiple sibling repos** (common when several frontends share one backend), apply every fix identically in each copy. These bugs travel with the pattern itself — that's exactly how the same three findings turned up in three separate repos in one review pass.

## Related

- Run `ssr-vs-csr-audit` first to confirm the backend is actually exposed to the browser and that adding a BFF (rather than just moving an existing fetch into an existing server component) is the right fix.
- This isn't generic React Query usage — see the `react-query` skill for query/mutation patterns unrelated to SSR. This skill is specifically the SSR-hydration-plus-security layer on top of a hidden-backend setup.
