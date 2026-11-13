import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSection } from "@/lib/graphql/client";
import { ProjectsDocument } from "../project.graphql";
import { sortProjects } from "../order";
import { projectKeys } from "../keys";
import type { Project } from "../types";

export type { Project, ProjectStatusValue, ProjectTag, ProjectSource } from "../types";

async function fetchProjects(): Promise<Project[]> {
  return sortProjects(await fetchSection(ProjectsDocument, "projects"));
}

export const projectsQuery = queryOptions({
  queryKey: projectKeys.all,
  queryFn: fetchProjects,
});

export function useProjects() {
  return useQuery(projectsQuery);
}
