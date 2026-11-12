import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSection } from "@/lib/graphql/client";
import { ExperiencesDocument } from "../experience.graphql";
import { experienceKeys } from "../keys";
import type { ExperienceEntry } from "../types";

export type { ExperienceEntry };

async function fetchExperience(): Promise<ExperienceEntry[]> {
  return fetchSection(ExperiencesDocument, "experiences");
}

export const experienceQuery = queryOptions({
  queryKey: experienceKeys.all,
  queryFn: fetchExperience,
});

export function useExperience() {
  return useQuery(experienceQuery);
}
