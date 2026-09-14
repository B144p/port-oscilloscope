export interface ProjectTag {
  id: string;
  projectId: string;
  tag: string;
}

export interface ProjectSource {
  id: string;
  projectId: string;
  title: string;
  url: string;
}

/** Mirrors the ProjectStatus enum in port-server's Prisma schema. */
export type ProjectStatusValue = "IN_PROGRESS" | "ACTIVE" | "HOLD" | "PLANNING";

export interface Project {
  id: string;
  title: string;
  description: string;
  preview: string | null;
  logo: string | null;
  status: ProjectStatusValue;
  order: number;
  tags: ProjectTag[];
  sources: ProjectSource[];
}
