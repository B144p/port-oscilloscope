"use client";

import { useState } from "react";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { useAiUsage, type AiUsageRange } from "@/features/ai-usage/client";
import { formatCompact, formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";
import { OS_FILL_VARS } from "../os-donut";
import { RangeSwitch } from "./range-switch";
import { Readout } from "./readout";
import { UsageGauge } from "./usage-gauge";
import { UsageWaveform } from "./usage-waveform";

function SubHeading({ children }: { children: string }) {
  return (
    <h3 className="text-[13px] uppercase tracking-[0.05em] text-text-muted">
      {children}
    </h3>
  );
}

/** §5.4 STATISTICS › AI USAGE — its own query, so WakaTime outages don't blank it. */
export function AiUsage() {
  const [range, setRange] = useState<AiUsageRange>("all");
  const { data, isPending, isError, isPlaceholderData, refetch } = useAiUsage(range);

  let body;
  if (isPending) body = <LoadingState />;
  else if (isError) body = <ErrorState onRetry={refetch} />;
  else if (!data.totals.requests) body = <EmptyState label="NO AI TRAFFIC IN RANGE" />;
  else {
    const totalTokens = data.totals.tokens || 1;
    body = (
      // Dim the previous range while the next one loads (keepPreviousData).
      <div
        className={cn(
          "flex flex-col gap-6 transition-opacity",
          isPlaceholderData && "opacity-50",
        )}
      >
        <Readout usage={data} />
        <UsageWaveform usage={data} />

        <section className="flex flex-col gap-3">
          <SubHeading>MODELS</SubHeading>
          {data.models.map((m) => (
            <UsageGauge
              key={m.model}
              label={m.model}
              value={`${formatCompact(m.tokens)} · ${
                m.estimatedCostUsd == null ? "N/A" : formatUsd(m.estimatedCostUsd)
              }`}
              percent={(m.tokens / totalTokens) * 100}
              fillVar="--green-mid"
            />
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <SubHeading>CLIENTS</SubHeading>
          {data.clients.map((c, i) => (
            <UsageGauge
              key={c.client}
              label={c.client}
              value={formatCompact(c.tokens)}
              percent={c.percent}
              fillVar={OS_FILL_VARS[i % OS_FILL_VARS.length]}
            />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-medium text-green-bright">AI USAGE</h2>
        <RangeSwitch value={range} onChange={setRange} />
      </div>
      {body}
    </div>
  );
}
