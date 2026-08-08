import type { Project, ProjectStatusValue } from "@/lib/types";

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

export const PROJECT_STATUS_META: Record<
  ProjectStatusValue,
  { label: string; colorClass: string }
> = {
  ACTIVE: { label: "ACTIVE", colorClass: "text-green-bright" },
  IN_PROGRESS: { label: "IN PROGRESS", colorClass: "text-amber" },
  HOLD: { label: "ON HOLD", colorClass: "text-red-alert" },
  PLANNING: { label: "PLANNING", colorClass: "text-text-muted" },
};

/** Status is typed but arrives as untyped JSON — an unrecognized value must
 *  not crash the readout. */
export function projectStatusMeta(status: string) {
  return (
    PROJECT_STATUS_META[status as ProjectStatusValue] ?? {
      label: status,
      colorClass: "text-text-muted",
    }
  );
}
