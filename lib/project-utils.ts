import type { Project } from "@/lib/types";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function projectSlug(project: Project): string {
  return slugify(project.title) || project.id;
}

/** Match by slugified title first; fall back to raw id so old links keep working. */
export function resolveProject(
  projects: Project[],
  param: string,
): Project | undefined {
  return (
    projects.find((p) => slugify(p.title) === param) ??
    projects.find((p) => p.id === param)
  );
}

export type ProjectStatus = "active" | "in-progress" | "archived";

/**
 * The API only exposes inProgress today; "archived" is kept in the union so a
 * future backend field only touches this function.
 */
export function getProjectStatus(project: Project): ProjectStatus {
  return project.inProgress ? "in-progress" : "active";
}

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { label: string; colorClass: string }
> = {
  active: { label: "ACTIVE", colorClass: "text-green-bright" },
  "in-progress": { label: "IN PROGRESS", colorClass: "text-amber" },
  archived: { label: "ARCHIVED", colorClass: "text-red-alert" },
};
