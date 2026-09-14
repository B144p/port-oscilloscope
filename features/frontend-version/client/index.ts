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

export const frontendVersionQuery = queryOptions({
  queryKey: frontendVersionKeys.all,
  queryFn: fetchFrontendVersion,
});

export function useFrontendVersion() {
  return useQuery(frontendVersionQuery);
}
