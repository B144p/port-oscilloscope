import "server-only";
import type { QueryClient, QueryKey } from "@tanstack/react-query";
import { aboutMeKeys } from "@/features/about-me/keys";
import { aiUsageKeys } from "@/features/ai-usage/keys";
import { contactKeys } from "@/features/contact/keys";
import { educationKeys } from "@/features/education/keys";
import { experienceKeys } from "@/features/experience/keys";
import { frontendVersionKeys } from "@/features/frontend-version/keys";
import { projectKeys } from "@/features/project/keys";
import { statisticKeys } from "@/features/statistic/keys";
import { backendGraphql } from "@/lib/backend";
import { BootDocument } from "./boot.graphql";

/**
 * §6 — every section warm before the first channel switch, from one
 * request. Each non-null section is seeded under the same key its client
 * hook reads, so nothing refetches after hydration (except frontend-version,
 * whose staleTime: 0 refetch is how a visit gets counted).
 *
 * A null section (failed on port-server, or the whole request failed) is
 * simply left unseeded: its client query fetches it through /api/graphql,
 * the same recovery path a failed REST prefetch had. Never throws — a
 * layout must render even when the backend is down.
 */
export async function prefetchAll(queryClient: QueryClient): Promise<void> {
  let data;
  try {
    ({ data } = await backendGraphql(BootDocument));
  } catch {
    return;
  }
  if (!data) return;

  const seed = (key: QueryKey, value: unknown) => {
    if (value != null) queryClient.setQueryData(key, value);
  };
  seed(aboutMeKeys.all, data.aboutMe);
  seed(educationKeys.all, data.educations);
  seed(experienceKeys.all, data.experiences);
  seed(projectKeys.all, data.projects);
  seed(contactKeys.all, data.contacts);
  seed(statisticKeys.all, data.statistic);
  seed(frontendVersionKeys.all, data.frontendVersions);
  seed(aiUsageKeys.range("all"), data.aiUsage);
}
