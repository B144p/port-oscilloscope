---
name: ssr-vs-csr-audit
description: Diagnostic checklist for determining whether a page in a Next.js App Router (or similar server/client-component framework like Remix, SvelteKit, Nuxt) project actually fetches data on the server or in the browser — and therefore whether the real backend URL and API calls are hidden from or exposed to the browser's network tab. Use this whenever the user asks "is this SSR or CSR", "does this hide the server/API from the client", "is the backend exposed to the browser", wants to audit multiple repos/frontends for rendering strategy, or is deciding where to move a fetch call to stop leaking a backend URL to visitors.
---

# SSR vs CSR Audit

The word "Next.js" (or "SSR framework") on its own tells you nothing about whether a *specific* fetch is hidden from the browser. A server-rendering framework can still ship fully client-fetched pages, and a classic SPA (Vite/CRA) is CSR by construction with no further checking needed. What actually determines whether a backend call is visible in the browser's network tab is **which side of the server/client component boundary the fetch call itself executes on** — not the framework name, and not whether an env var happens to be prefixed `NEXT_PUBLIC_`.

This skill is a repeatable trace-the-boundary procedure. Apply it per-route, since different pages in the same app can land on different sides.

## Step 1 — Rule out "no server framework at all"

Check for a bundler-only SPA setup before doing anything else:

- `vite.config.ts`/`.js` + `index.html` + a client entry (`main.tsx`), or Create React App layout, with no `next`/`react-router` server integration, `@remix-run/*`, `@sveltejs/kit`, or `nuxt` in `package.json`.
- If found: this is CSR by construction. There is no server render step, so every fetch — no matter where it's written in the code — runs in the browser. Stop here; no further tracing needed.

Otherwise, proceed — you have a meta-framework with a server/client split to trace.

## Step 2 — Check for a static-export escape hatch

Even a genuine App Router / SvelteKit / Nuxt project can be configured to ship with **no live server at runtime**:

- Next.js: grep `next.config.*` for `output: "export"`.
- Other frameworks: look for their equivalent static-adapter config (e.g. SvelteKit's `adapter-static`, Nuxt's `nitro.preset: 'static'`).

If present, treat the deployed app as CSR regardless of component types — there's no server process at request time to keep anything hidden.

## Step 3 — Trace the data fetch to its actual execution boundary

For each route you care about (e.g. `app/**/page.tsx` in Next.js App Router):

1. Open the route's page/entry file. Check for a `"use client"` directive at the top.
   - **No directive, and the component is `async function ... { await someFetch(...) }` directly in its body** → the fetch executes during server rendering (SSR/RSC). The browser receives only the finished HTML/RSC payload — the backend call itself is invisible in the network tab. This data is genuinely hidden.
   - **Directive present, or the file is a thin wrapper** → keep walking down the component tree.
2. When walking down: find the *first* `"use client"` boundary you cross. Everything below that boundary renders and re-renders in the browser.
   - Grep the relevant `app/` and `components/` (or equivalent) directories for `"use client"` to map out where the boundaries are.
   - Grep for the actual network-call call sites: `fetch(`, `axios`, `useQuery(`, `useSWR(`, or any custom data hook. Whichever side of the client boundary these calls live on is where the request actually happens.
   - A very common false negative: the framework is Next.js, the outer page even looks like a server component, but it just renders `<SomeClientComponent />`, and that component calls `useQuery(...)` (TanStack Query, SWR, etc.) inside a `"use client"` file. That fetch is 100% client-side — SSR framework, CSR data. Don't stop at "it's Next.js" — follow the call.
3. Repeat per-route. A single app commonly mixes both: some pages server-fetch, others client-fetch (e.g. a marketing/landing page vs. a live/interactive dashboard that intentionally polls from the browser).

## Step 4 — Cross-check the backend URL itself

Find how the base URL is sourced (commonly `lib/api.ts` or similar):

- Note the env var name (e.g. `NEXT_PUBLIC_API_URL`). A `NEXT_PUBLIC_`/public-prefixed var gets inlined into the client JS bundle wherever it's referenced *from client code* — but that alone doesn't mean the backend is exposed. The determining factor is still Step 3: **where does the fetch call using that URL actually execute?** A server component can reference a `NEXT_PUBLIC_*` var and still never leak the request itself to the browser, since the request happens server-side even though the string constant could theoretically also appear in a client bundle elsewhere.
- Confirm the real value by checking `.env.local` / `.env.example` for what the URL actually points at (localhost vs. a real deployed backend host) — useful context for judging how sensitive the exposure is.

## Conclusion criteria

- **SSR (backend hidden from the browser)**: the fetch call executes inside a server component — i.e., no `"use client"` anywhere in its ancestry up to the point of the call, and it's not a statically-exported build.
- **CSR (backend exposed to the browser)**: the fetch call executes inside a `"use client"` component/hook (React Query, SWR, `useEffect` + `fetch`, axios in a client file), OR the app has no server-rendering framework at all (SPA), OR it's a static export with no live server.

## Reporting results

When auditing multiple repos or routes, present a table: repo/route → SSR or CSR → the specific evidence (file + line, or component name) that proves which side of the boundary the fetch executes on. Don't just say "it's Next.js so it's SSR" or "it's Next.js so it must be fine" — cite the actual call site. If the goal is hiding a backend, call out routes that fetch from `"use client"` components as the ones still leaking the API, and suggest moving that data-fetching into the nearest server component (or a server-side prefetch + hydration pattern, e.g. TanStack Query's `HydrationBoundary` + `queryClient.prefetchQuery` called from a server component) as the fix — while noting that data which is *intentionally* live/polling (e.g. real-time view counters) is a legitimate reason to keep it client-side.

## Remediation when the app has no server at all (pure SPA)

Step 1 sometimes turns up a Vite/CRA-style SPA with no meta-framework — there's no server-rendered boundary to move a fetch across, so the Step-3 fix ("move it into a server component") doesn't apply. There are exactly two ways to actually hide the backend from such an app, and the right one depends on how much the rest of the user's stack has already standardized on a meta-framework:

1. **Migrate the SPA into the same meta-framework the other apps use** (e.g. Next.js App Router), then apply the normal Step 3 pattern: server component `fetch`/`await`, or React Query's `prefetchQuery` + `HydrationBoundary` seeded from a server component. This is the right call when the user already has sibling apps on that framework — it keeps the whole fleet on one rendering model instead of introducing a second hiding mechanism.
2. **Keep the SPA as-is and put a thin server (a BFF / reverse-proxy) in front of it** — a small Next.js API-routes app, an Express server, or an edge function that itself calls the real backend, and point the SPA's existing fetch/React-Query calls at *that* proxy's URL instead of the real backend's URL. The browser then only ever sees the proxy's host; the real backend host and any of its secrets never appear in client code or the network tab. Use this when migrating the SPA off Vite isn't worth it (e.g. it's legacy, or actively being retired/replaced).

Note what neither option is: swapping `axios`/`fetch` calls to run inside a `useEffect` differently, changing env var prefixes, or any other client-side-only change — none of that moves the request off the browser, because there is still no server in the request path to hide behind.
