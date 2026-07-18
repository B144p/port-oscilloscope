"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { DataReadout } from "@/components/data-readout";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { formatRange } from "@/lib/format";
import {
  aboutMeQuery,
  educationQuery,
  experienceQuery,
} from "@/lib/queries";

export function Overall() {
  const { data, isPending, isError, refetch } = useQuery(aboutMeQuery);
  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;
  const paragraphs = [data.intro, data.bio, data.mission].filter(
    (p): p is string => Boolean(p),
  );
  if (paragraphs.length === 0) return <EmptyState />;
  return (
    <DataReadout title="OVERALL" fields={[]}>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </DataReadout>
  );
}

export function Education({ entryId }: { entryId?: string }) {
  const { data, isPending, isError, refetch } = useQuery(educationQuery);
  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data.length) return <EmptyState />;
  const entry = data.find((e) => e.id === entryId) ?? data[0];
  return (
    <DataReadout
      title={entry.title}
      fields={[
        { label: "PERIOD", value: formatRange(entry.startDate, entry.endDate) },
        { label: "RECORDS", value: String(entry.descriptions.length) },
      ]}
    >
      <ul className="flex flex-col gap-2">
        {entry.descriptions.map((d) => (
          <li key={d.id} className="flex gap-2">
            <span className="shrink-0 text-text-muted">&gt;</span>
            <span>{d.description}</span>
          </li>
        ))}
      </ul>
    </DataReadout>
  );
}

export function Experience({ entryId }: { entryId?: string }) {
  const { data, isPending, isError, refetch } = useQuery(experienceQuery);
  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data.length) return <EmptyState />;
  const entry = data.find((e) => e.id === entryId) ?? data[0];
  return (
    <DataReadout
      title={entry.company}
      fields={[
        { label: "ROLE", value: entry.role },
        { label: "PERIOD", value: formatRange(entry.startDate, entry.endDate) },
      ]}
    >
      <ul className="flex flex-col gap-2">
        {entry.responsibilities.map((r) => (
          <li key={r.id} className="flex gap-2">
            <span className="shrink-0 text-text-muted">&gt;</span>
            <span>{r.description}</span>
          </li>
        ))}
      </ul>
    </DataReadout>
  );
}

/** §5.4 ABOUT — one sub-view at a time, selected by URL. */
export function AboutSection() {
  const params = useParams<{ view?: string[] }>();
  const [view = "overall", entryId] = params.view ?? [];

  if (view === "education") return <Education entryId={entryId} />;
  if (view === "experience") return <Experience entryId={entryId} />;
  return <Overall />;
}
