import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSection } from "@/lib/graphql/client";
import { EducationsDocument } from "../education.graphql";
import { educationKeys } from "../keys";
import type { EducationEntry } from "../types";

export type { EducationEntry };

async function fetchEducation(): Promise<EducationEntry[]> {
  return fetchSection(EducationsDocument, "educations");
}

export const educationQuery = queryOptions({
  queryKey: educationKeys.all,
  queryFn: fetchEducation,
});

export function useEducation() {
  return useQuery(educationQuery);
}
