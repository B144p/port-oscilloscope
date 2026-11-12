"use client";

import type { AiUsage } from "@/features/ai-usage/client";
import { formatCompact, formatIsoDay, formatUsd } from "@/lib/format";

function rangeLabel(usage: AiUsage): string {
  const from = usage.range.from ?? usage.daily[0]?.date;
  const to = usage.range.to ?? usage.daily.at(-1)?.date;
  if (!from || !to) return "---";
  return `${formatIsoDay(from)} – ${formatIsoDay(to)}`;
}

/** Headline numbers, in the same <dl> language as the statistics panel. */
export function Readout({ usage }: { usage: AiUsage }) {
  const { totals, unpricedModels } = usage;
  const rows = [
    { label: "REQUESTS", value: formatCompact(totals.requests) },
    { label: "TOKENS", value: formatCompact(totals.tokens) },
    {
      label: "EST. COST",
      value: formatUsd(totals.estimatedCostUsd, {
        lowerBound: unpricedModels.length > 0,
      }),
    },
    { label: "RANGE", value: rangeLabel(usage) },
  ];

  return (
    <div className="flex flex-col gap-2">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-green-dim/40 pb-3 text-[11px] uppercase tracking-[0.05em] sm:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col">
            <dt className="text-text-muted">{row.label}</dt>
            <dd className="tabular-nums text-green-mid">{row.value}</dd>
          </div>
        ))}
      </dl>
      {unpricedModels.length > 0 && (
        <p className="text-[11px] uppercase tracking-[0.05em] text-text-muted">
          ≥ COST EXCLUDES UNPRICED: {unpricedModels.join(", ")}
        </p>
      )}
    </div>
  );
}
