import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { projectKeys } from "../keys";
import type { Project } from "../types";

export const getProjects = async (): Promise<Project[]> =>
  (await backendGet<Project[]>("/v1/project")).sort((a, b) => a.order - b.order);

export function prefetchProjects(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: projectKeys.all,
    queryFn: getProjects,
  });
}
