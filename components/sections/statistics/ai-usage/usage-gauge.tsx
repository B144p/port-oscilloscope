"use client";

import type { CSSProperties } from "react";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * GaugeRow's look (label · dot leader · value · percent over a bar), built
 * on shadcn Progress. The fill colour arrives as a CSS custom property so
 * the shadcn track/indicator only need restyling, not replacing.
 */
export function UsageGauge({
  label,
  value,
  percent,
  fillVar,
}: {
  label: string;
  /** Pre-formatted, e.g. "3.4M · $12.30" */
  value: string;
  percent: number;
  /** CSS custom property name, e.g. "--green-mid" */
  fillVar: string;
}) {
  return (
    <Progress
      value={Math.min(100, Math.max(0, percent))}
      style={{ "--gauge-fill": `var(${fillVar})` } as CSSProperties}
      className={cn(
        "gap-1",
        "[&_[data-slot=progress-track]]:bg-bg-raised",
        "[&_[data-slot=progress-indicator]]:bg-(--gauge-fill)",
      )}
    >
      <div className="flex w-full items-baseline gap-2 text-[13px]">
        <ProgressLabel className="min-w-0 shrink truncate text-[13px] uppercase tracking-[0.05em] text-green-mid">
          {label}
        </ProgressLabel>
        <span
          aria-hidden
          className="min-w-4 flex-1 overflow-hidden whitespace-nowrap text-text-muted/60"
        >
          {"·".repeat(200)}
        </span>
        <span className="shrink-0 tabular-nums text-green-mid">{value}</span>
        <span className="w-[6ch] shrink-0 text-right tabular-nums text-text-muted">
          {formatPercent(percent)}
        </span>
      </div>
    </Progress>
  );
}
