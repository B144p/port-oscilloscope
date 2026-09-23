import { queryOptions, useQuery } from "@tanstack/react-query";
import { projectKeys } from "../keys";
import type { Project } from "../types";

export type { Project, ProjectStatusValue, ProjectTag, ProjectSource } from "../types";

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/project");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /project`);
  return ((await res.json()) as Project[]).sort((a, b) => a.order - b.order);
}

export const projectsQuery = queryOptions({
  queryKey: projectKeys.all,
  queryFn: fetchProjects,
});

export function useProjects() {
  return useQuery(projectsQuery);
}
