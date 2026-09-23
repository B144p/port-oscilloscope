import { queryOptions, useQuery } from "@tanstack/react-query";
import { experienceKeys } from "../keys";
import type { ExperienceEntry } from "../types";

export type { ExperienceEntry };

async function fetchExperience(): Promise<ExperienceEntry[]> {
  const res = await fetch("/api/experience");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /experience`);
  return res.json() as Promise<ExperienceEntry[]>;
}

export const experienceQuery = queryOptions({
  queryKey: experienceKeys.all,
  queryFn: fetchExperience,
});

export function useExperience() {
  return useQuery(experienceQuery);
}
