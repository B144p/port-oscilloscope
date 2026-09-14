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
        retry: 1,
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
