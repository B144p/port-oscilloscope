"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AI_USAGE_RANGES, type AiUsageRange } from "@/features/ai-usage/client";

const LABELS: Record<AiUsageRange, string> = {
  "7d": "7D",
  "30d": "30D",
  all: "ALL",
};

/** Oscilloscope "timebase" selector — shadcn ToggleGroup in monitor styling. */
export function RangeSwitch({
  value,
  onChange,
}: {
  value: AiUsageRange;
  onChange: (range: AiUsageRange) => void;
}) {
  return (
    <ToggleGroup
      aria-label="Time range"
      variant="outline"
      size="sm"
      spacing={0}
      value={[value]}
      onValueChange={(next) => {
        // Single-select that can't be cleared: ignore the deselect event.
        const picked = next[0] as AiUsageRange | undefined;
        if (picked) onChange(picked);
      }}
    >
      {AI_USAGE_RANGES.map((range) => (
        <ToggleGroupItem
          key={range}
          value={range}
          className={
            "border-green-dim px-3 text-[11px] uppercase tracking-[0.05em] text-green-dim " +
            "hover:bg-green-dim/15 hover:text-green-mid " +
            "aria-pressed:bg-green-dim/25 aria-pressed:text-green-bright " +
            "aria-pressed:shadow-[0_0_6px_0_var(--green-glow)] " +
            "focus-visible:ring-green-mid/50"
          }
        >
          {LABELS[range]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
