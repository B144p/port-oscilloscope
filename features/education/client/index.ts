import { queryOptions, useQuery } from "@tanstack/react-query";
import { educationKeys } from "../keys";
import type { EducationEntry } from "../types";

export type { EducationEntry };

async function fetchEducation(): Promise<EducationEntry[]> {
  const res = await fetch("/api/education");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /education`);
  return res.json() as Promise<EducationEntry[]>;
}

export const educationQuery = queryOptions({
  queryKey: educationKeys.all,
  queryFn: fetchEducation,
});

export function useEducation() {
  return useQuery(educationQuery);
}
