import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { frontendVersionKeys } from "../keys";
import type { FrontendVersionCatalog } from "../types";

// No view header here — see lib/backend.ts's backendGet doc. The SSR
// prefetch reads the catalog silently; only the client-side refetch (see
// ../client, staleTime: 0) counts an actual visit.
export const getFrontendVersion = () =>
  backendGet<FrontendVersionCatalog>("/v1/frontend-version");

export function prefetchFrontendVersion(
  queryClient: QueryClient,
): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: frontendVersionKeys.all,
    queryFn: getFrontendVersion,
  });
}
