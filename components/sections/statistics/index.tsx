"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { statisticQuery } from "@/lib/queries";
import type { Statistic } from "@/lib/types";
import { ContributionChart } from "./contribution-chart";
import { GaugeRow } from "./gauge-row";

/** §5.4 — bar fills reserve amber/red for status meaning elsewhere. */
const OS_FILL_VARS = ["--green-bright", "--green-mid", "--green-dim"];

function Languages({ statistic }: { statistic: Statistic }) {
  if (!statistic.languages.length) return <EmptyState />;
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium text-green-bright">LANGUAGES</h2>
      {/* Radar chart lands with the chart pass */}
      <div className="flex flex-col gap-3">
        {statistic.languages.map((lang) => (
          <GaugeRow
            key={lang.id}
            label={lang.language}
            totalSeconds={lang.totalSeconds}
            percent={lang.percent}
            fillVar="--green-mid"
            dotLeader
          />
        ))}
      </div>
    </div>
  );
}

function OperatingSystem({ statistic }: { statistic: Statistic }) {
  if (!statistic.operatingSystems.length) return <EmptyState />;
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium text-green-bright">
        OPERATING SYSTEM
      </h2>
      <div className="flex max-w-[70ch] flex-col gap-4">
        {statistic.operatingSystems.map((os, i) => (
          <GaugeRow
            key={os.id}
            label={os.os}
            totalSeconds={os.totalSeconds}
            percent={os.percent}
            fillVar={OS_FILL_VARS[i % OS_FILL_VARS.length]}
          />
        ))}
      </div>
    </div>
  );
}

/** §5.4 STATISTICS — one sub-view at a time. */
export function StatisticsSection() {
  const params = useParams<{ view?: string[] }>();
  const [view = "languages"] = params.view ?? [];
  const { data, isPending, isError, refetch } = useQuery(statisticQuery);

  if (view === "contributions") return <ContributionChart />;
  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;

  if (view === "operating-system") return <OperatingSystem statistic={data} />;
  return <Languages statistic={data} />;
}
