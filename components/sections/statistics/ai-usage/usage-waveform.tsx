"use client";

import { useId, useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import type { AiUsage } from "@/features/ai-usage/client";
import { formatCompact, formatIsoDay, MONTHS } from "@/lib/format";

const chartConfig = {
  tokens: { label: "Tokens", color: "var(--green-bright)" },
};

interface Point {
  date: string;
  tokens: number;
  requests: number;
  cost: number;
  unpriced: boolean;
}

function addDay(isoDay: string): string {
  const d = new Date(`${isoDay}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** The API only returns days with usage; a trace needs every day, so gaps read as flat-line 0. */
function buildSeries(usage: AiUsage): Point[] {
  const byDay = new Map(usage.daily.map((d) => [d.date, d]));
  const start = usage.range.from ?? usage.daily[0]?.date;
  const end = usage.range.to ?? usage.daily.at(-1)?.date;
  if (!start || !end) return [];

  const points: Point[] = [];
  for (let day = start; day <= end; day = addDay(day)) {
    const d = byDay.get(day);
    points.push({
      date: day,
      tokens: d?.tokens ?? 0,
      requests: d?.requests ?? 0,
      cost: d?.estimatedCostUsd ?? 0,
      unpriced: d?.hasUnpricedModels ?? false,
    });
  }
  return points;
}

/** "2026-07-20" → "JUL 20" */
function shortDay(isoDay: string): string {
  return `${MONTHS[Number(isoDay.slice(5, 7)) - 1]} ${Number(isoDay.slice(8, 10))}`;
}

/** Same monitor-language tooltip as LanguageRadar; stock styling is banned (§5.4). */
function WaveTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: Point }>;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const cost = `${p.unpriced ? "≥ " : ""}$${p.cost.toFixed(2)}`;
  return (
    <div className="rounded-lg border border-green-dim bg-bg-raised px-2 py-1 text-[11px] uppercase tracking-[0.05em]">
      <span className="text-green-bright">{formatIsoDay(p.date)}</span>
      <span className="ml-2 text-green-mid">
        {formatCompact(p.tokens)} TOK · {p.requests} REQ · {cost}
      </span>
    </div>
  );
}

/** Tokens per day as a glowing trace on a graticule. */
export function UsageWaveform({ usage }: { usage: AiUsage }) {
  const glowId = `glow-${useId().replace(/:/g, "")}`;
  const data = useMemo(() => buildSeries(usage), [usage]);

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <filter id={glowId} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid stroke="var(--green-dim)" strokeOpacity={0.5} strokeDasharray="2 4" />
        <XAxis
          dataKey="date"
          tickFormatter={shortDay}
          tickLine={false}
          axisLine={{ stroke: "var(--green-dim)" }}
          minTickGap={32}
          tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "inherit" }}
        />
        <YAxis
          width={44}
          tickFormatter={formatCompact}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "inherit" }}
        />
        <ChartTooltip
          content={<WaveTooltip />}
          cursor={{ stroke: "var(--green-mid)", strokeDasharray: "2 2" }}
          isAnimationActive={false}
        />
        <Line
          dataKey="tokens"
          type="linear"
          stroke="var(--green-bright)"
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 3, fill: "var(--green-bright)", stroke: "none" }}
          filter={`url(#${glowId})`}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
