import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { experienceKeys } from "../keys";
import type { ExperienceEntry } from "../types";

export const getExperience = () =>
  backendGet<ExperienceEntry[]>("/v1/experience");

export function prefetchExperience(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: experienceKeys.all,
    queryFn: getExperience,
  });
}
