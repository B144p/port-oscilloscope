import { useQuery } from "@tanstack/react-query";
import { FRONTEND_VERSION_KEY } from "@/lib/api";
import { frontendVersionQuery } from "@/lib/queries";

/** `"12/48"` (this version / all versions), or `"---"` before the catalog resolves. */
export function useViewCount(): string {
  const { data } = useQuery(frontendVersionQuery);
  const mine = data?.versions.find((v) => v.key === FRONTEND_VERSION_KEY);
  return data && mine ? `${mine.views}/${data.totalViews}` : "---";
}
