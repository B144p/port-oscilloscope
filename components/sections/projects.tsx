"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { DataReadout } from "@/components/data-readout";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { projectStatusMeta, resolveProject } from "@/lib/project-utils";
import { projectsQuery } from "@/lib/queries";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/** `preview` is either a live demo or a source repo — never both — so one button, labeled by host. */
function previewLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "") === "github.com"
      ? "SOURCE"
      : "WEBSITE";
  } catch {
    return "LINK";
  }
}

/** `sources[]` supersedes `preview`; it's empty everywhere in the DB today,
 *  so `preview` stays as the fallback until sources are backfilled. */
function projectLinks(
  project: Project,
): { key: string; title: string; url: string }[] {
  if (project.sources.length)
    return project.sources.map((s) => ({ key: s.id, title: s.title, url: s.url }));
  return project.preview
    ? [{ key: "preview", title: previewLabel(project.preview), url: project.preview }]
    : [];
}

/** §5.4 PROJECTS — instrument readout for the selected project. */
export function ProjectsSection() {
  const params = useParams<{ slug?: string[] }>();
  const slug = params.slug?.[0];
  const { data, isPending, isError, refetch } = useQuery(projectsQuery);

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data.length) return <EmptyState />;

  const project = (slug ? resolveProject(data, slug) : undefined) ?? data[0];
  const status = projectStatusMeta(project.status);
  const links = projectLinks(project);

  return (
    <DataReadout
      title={project.title}
      fields={[
        {
          label: "STATUS",
          value: (
            <span
              className={cn("uppercase tracking-[0.05em]", status.colorClass)}
            >
              ● {status.label}
            </span>
          ),
        },
        {
          label: "STACK",
          value: (
            <span className="flex flex-wrap gap-2">
              {project.tags.length
                ? project.tags.map((t) => (
                    <span
                      key={t.id}
                      className="rounded-lg border border-green-dim px-2 py-0.5 text-[11px] uppercase tracking-[0.05em]"
                    >
                      {t.tag}
                    </span>
                  ))
                : "—"}
            </span>
          ),
        },
        ...(links.length
          ? [
              {
                label: "SOURCES",
                value: (
                  <span className="flex flex-wrap gap-2">
                    {links.map((link) => (
                      <a
                        key={link.key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-1 rounded-lg border border-green-dim px-2 py-0.5 text-[11px] uppercase tracking-[0.05em] text-green-mid transition-colors hover:border-green-bright hover:text-green-bright"
                      >
                        OPEN {link.title} ↗
                      </a>
                    ))}
                  </span>
                ),
              },
            ]
          : []),
        {
          label: "DESCRIPTION",
          value: project.description,
        },
      ]}
    />
  );
}
