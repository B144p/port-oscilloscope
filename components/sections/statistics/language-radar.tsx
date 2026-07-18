"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { formatHours } from "@/lib/format";
import type { LanguageStat } from "@/lib/types";

/** A 35-axis radar is noise — chart the top slice, list the rest below. */
const RADAR_AXES = 6;

const chartConfig = {
  value: { label: "Hours", color: "var(--chart-2)" },
};

/** §5.4 — tooltip rebuilt in the monitor language; stock styling is banned. */
function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: { language: string; hours: number; seconds: number; percent: number };
  }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-green-dim bg-bg-raised px-2 py-1 text-[11px] uppercase tracking-[0.05em]">
      <span className="text-green-bright">{point.language}</span>
      <span className="ml-2 text-green-mid">
        {formatHours(point.seconds)} · {point.percent.toFixed(1)}%
      </span>
    </div>
  );
}

export function LanguageRadar({ languages }: { languages: LanguageStat[] }) {
  const data = languages.slice(0, RADAR_AXES).map((lang) => {
    const hours = lang.totalSeconds / 3600;
    return {
      language: lang.language.toUpperCase(),
      value: Math.cbrt(hours),
      hours: Math.round(hours),
      seconds: lang.totalSeconds,
      percent: lang.percent,
    };
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-72 w-full"
    >
      <RadarChart data={data}>
        <PolarGrid stroke="var(--green-dim)" strokeWidth={1} />
        <PolarAngleAxis
          dataKey="language"
          tick={{
            fill: "var(--text-muted)",
            fontSize: 11,
            fontFamily: "inherit",
          }}
        />
        <ChartTooltip content={<RadarTooltip />} isAnimationActive={false} />
        <Radar
          dataKey="value"
          stroke="var(--green-mid)"
          strokeWidth={1}
          fill="var(--green-mid)"
          fillOpacity={0.15}
          dot={false}
          isAnimationActive={false}
        />
      </RadarChart>
    </ChartContainer>
  );
}
