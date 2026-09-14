import { queryOptions, useQuery } from "@tanstack/react-query";
import { frontendVersionKeys } from "../keys";
import type { FrontendVersionCatalog } from "../types";

export type { FrontendVersion, FrontendVersionCatalog } from "../types";
export { FRONTEND_VERSION_KEY } from "../keys";

async function fetchFrontendVersion(): Promise<FrontendVersionCatalog> {
  const res = await fetch("/api/frontend-version");
  if (!res.ok)
    throw new Error(`LINK FAILURE // ${res.status} /frontend-version`);
  return res.json() as Promise<FrontendVersionCatalog>;
}

// staleTime: 0 (unlike every other feature, which inherits the client's
// staleTime: Infinity default) is deliberate: this is the one query that's
// also how a visit gets counted. Hydrated SSR data is immediately stale,
// so mount triggers one real refetch through /api/frontend-version —
// carrying the visitor's IP for port-server's view-count dedupe — instead
// of silently reusing the server's (view-count-silent) prefetch forever.
export const frontendVersionQuery = queryOptions({
  queryKey: frontendVersionKeys.all,
  queryFn: fetchFrontendVersion,
  staleTime: 0,
});

export function useFrontendVersion() {
  return useQuery(frontendVersionQuery);
}
