import { isServer, QueryClient } from "@tanstack/react-query";

/**
 * §6 — every section's data is prefetched at boot and never goes stale
 * in-session, so channel switches always hit warm cache.
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        // Never retry during server rendering: a down backend would otherwise hold
        // the render for the fetch timeout twice over. Browsers still retry once.
        retry: isServer ? 0 : 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * The server needs a fresh client per request (no cross-request state
 * leakage); the browser needs exactly one shared client so navigating
 * around the app doesn't lose its cache.
 */
export function getQueryClient(): QueryClient {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
