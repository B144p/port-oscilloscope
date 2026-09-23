import { FRONTEND_VERSION_KEY, useFrontendVersion } from "@/features/frontend-version/client";

/** `"12/48"` (this version / all versions), or `"---"` before the catalog resolves. */
export function useViewCount(): string {
  const { data } = useFrontendVersion();
  const mine = data?.versions.find((v) => v.key === FRONTEND_VERSION_KEY);
  return data && mine ? `${mine.views}/${data.totalViews}` : "---";
}
