import "server-only";
import { FRONTEND_VERSION_KEY } from "@/features/frontend-version/keys";
import type { TypedDocumentString } from "@/lib/graphql/generated/graphql";
import type { GraphQLResponse } from "@/lib/graphql/types";

// No fallback: the obvious default (localhost:3000) is also Next's own dev
// port, so a missing API_URL would quietly make this app proxy to itself.
const API_URL = process.env.API_URL || missingEnv("API_URL");
const PROXY_SHARED_SECRET = process.env.PROXY_SHARED_SECRET;

// X-Forwarded-For is only as trustworthy as whatever sits in front of this
// server. Vercel overwrites it at its edge and drops client-sent values, so
// it's safe there (VERCEL=1 is set automatically). Served directly — e.g. a
// bare `next start` — Next.js passes a client-sent header straight through,
// so it's ignored and port-server falls back to this server's own IP. Set
// TRUST_FORWARDED_FOR=true only behind another proxy that sets the header.
const TRUST_FORWARDED_FOR =
  process.env.VERCEL === "1" || process.env.TRUST_FORWARDED_FOR === "true";

/**
 * Server-side GraphQL read with no version header, so it never counts as a
 * page view. Use this from Server Components / prefetch — never from a
 * Route Handler that a browser can call, since that IS a view (that's
 * proxyGraphql below). Sent as GET so Next.js caches it by
 * URL like any other read (its fetch cache and dedupe are documented for
 * GET); Apollo's CSRF prevention requires the preflight header on GET.
 *
 * Throws only when the request itself fails (network, 4xx/5xx). A section
 * that fails inside an otherwise good response comes back null with an
 * entry in `errors` — the caller decides what to do with partial data.
 * Note a partial response is cached like any 200 for `revalidate` seconds;
 * the browser recovers that section through /api/graphql meanwhile.
 */
export async function backendGraphql<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables,
  { revalidate = 60 }: { revalidate?: number } = {},
): Promise<GraphQLResponse<TResult>> {
  const params = new URLSearchParams({ query: document.toString() });
  if (variables) params.set("variables", JSON.stringify(variables));
  const res = await fetch(`${API_URL}/graphql?${params}`, {
    headers: { "apollo-require-preflight": "true" },
    next: { revalidate },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) {
    // Keep port-server's reason (e.g. a complexity or validation error) in
    // the server log; this message never reaches the browser.
    const body = (await res.json().catch(() => null)) as GraphQLResponse<unknown> | null;
    const reason = body?.errors?.map((e) => e.message).join("; ");
    throw new Error(`LINK FAILURE // ${res.status} /graphql${reason ? ` — ${reason}` : ""}`);
  }
  return res.json() as Promise<GraphQLResponse<TResult>>;
}

/**
 * Headers for a browser-triggered request (app/api/*\/route.ts handlers —
 * the only fetches a browser can actually trigger). Forwards enough of the
 * visitor's own request that port-server can attribute the view and
 * rate-limit correctly: X-Visitor-Ip + X-Proxy-Secret let port-server's
 * trusted-proxy middleware substitute the visitor's IP for this server's IP
 * (see port-server's trusted-proxy.middleware.ts) so view-count dedupe and
 * rate limiting stay per-visitor instead of collapsing onto this Next
 * server's IP.
 */
function forwardHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Frontend-Version": FRONTEND_VERSION_KEY,
  };

  // The LAST entry, not the first: with a proxy that appends rather than
  // overwrites, anything left of the entry it added is client-controlled.
  // This mirrors port-server's own TRUST_PROXY_HOPS: trust exactly the one
  // real hop between the visitor and this app, counted from the end.
  const visitorIp = TRUST_FORWARDED_FOR
    ? request.headers
        .get("x-forwarded-for")
        ?.split(",")
        .map((ip) => ip.trim())
        .filter(Boolean)
        .at(-1)
    : undefined;
  if (visitorIp) headers["X-Visitor-Ip"] = visitorIp;
  if (PROXY_SHARED_SECRET) headers["X-Proxy-Secret"] = PROXY_SHARED_SECRET;

  for (const name of ["user-agent", "accept-language", "referer"]) {
    const value = request.headers.get(name);
    if (value) headers[name] = value;
  }
  return headers;
}

/**
 * Long enough to outlast a port-server cold start. Unlike backendGraphql's
 * 5s (which holds the page's HTML), this runs after the page is visible,
 * so a slow answer only extends a section's loading state — giving up early
 * would turn every cold start into LINK FAILURE.
 */
const RELAY_TIMEOUT_MS = 30_000;

/** Streams port-server's answer back; never leaks the backend URL. */
async function relay(url: string, init: RequestInit): Promise<Response> {
  try {
    const res = await fetch(url, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(RELAY_TIMEOUT_MS),
    });
    return new Response(res.body, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return new Response(JSON.stringify({ message: "LINK FAILURE" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}

/**
 * Browser-triggered GraphQL, so it carries the visitor headers and counts
 * as a view. POST with a JSON body (a non-simple request, so Apollo's CSRF
 * prevention lets it through). The caller passes a document it already
 * allow-listed — never a query string taken from the browser.
 */
export async function proxyGraphql(
  request: Request,
  query: string,
  variables?: Record<string, unknown>,
): Promise<Response> {
  return relay(`${API_URL}/graphql`, {
    method: "POST",
    headers: { ...forwardHeaders(request), "content-type": "application/json" },
    body: JSON.stringify(variables ? { query, variables } : { query }),
  });
}

function missingEnv(name: string): never {
  throw new Error(`${name} is not set — point it at port-server (see .env.example).`);
}
