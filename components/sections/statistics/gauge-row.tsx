"use client";

import { formatHours, formatPercent } from "@/lib/format";
import { useMemo } from "react";

/**
 * Label + hours + percent + bar gauge. A control panel is full of bar
 * gauges — this is the §5.4 building block for languages and OS share.
 */
export function GaugeRow({
  label,
  totalSeconds,
  percent,
  fillVar,
  dotLeader = false,
  balance = "none",
}: {
  label: string;
  totalSeconds: number;
  percent: number;
  /** CSS custom property name for the fill, e.g. "--green-mid" */
  fillVar: string;
  dotLeader?: boolean;
  balance?: "none" | "squre" | "qube";
}) {
  const gaugeWidth = useMemo(() => {
    switch (balance) {
      case "squre":
        return Math.sqrt(percent / 100) * 100;
      case "qube":
        return Math.cbrt(percent / 100) * 100;
      default:
        return percent;
    }
  }, [balance, percent]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2 text-[13px]">
        <span className="shrink-0 uppercase tracking-[0.05em] text-green-mid">
          {label}
        </span>
        {dotLeader ? (
          <span
            aria-hidden
            className="min-w-4 flex-1 overflow-hidden whitespace-nowrap text-text-muted/60"
          >
            {"·".repeat(200)}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        <span className="shrink-0 tabular-nums text-green-mid">
          {formatHours(totalSeconds)}
        </span>
        <span className="w-[6ch] shrink-0 text-right tabular-nums text-text-muted">
          {formatPercent(percent)}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1 w-full bg-bg-raised"
      >
        <div
          className="h-full"
          style={{ width: `${gaugeWidth}%`, background: `var(${fillVar})` }}
        />
      </div>
    </div>
  );
}
