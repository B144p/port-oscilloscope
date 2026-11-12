export const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** Unix seconds → "FEB 2023" */
export function formatMonthYear(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Unix seconds (day) → "JUL 20, 2026" */
export function formatDayLabel(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** Unix seconds pair → "FEB 2023 – JUN 2025" (open end → "PRESENT") */
export function formatRange(start: number, end: number | null): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : "PRESENT"}`;
}

/** Seconds → hours and minutes, e.g. "142H 30M" */
export function formatHours(totalSeconds: number): string {
  const totalMinutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}H ${minutes}M`;
}

export function formatPercent(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

const COMPACT_UNITS = [
  { value: 1e9, suffix: "B" },
  { value: 1e6, suffix: "M" },
  { value: 1e3, suffix: "K" },
];

/** Large counts → "1.2K" / "3.4M" / "5.6B"; token sums pass 2^31 quickly. */
export function formatCompact(n: number): string {
  for (const { value, suffix } of COMPACT_UNITS) {
    if (Math.abs(n) >= value) {
      const scaled = n / value;
      return `${scaled >= 100 ? Math.round(scaled) : scaled.toFixed(1)}${suffix}`;
    }
  }
  return String(Math.round(n));
}

/** USD, e.g. "$12.34"; `lowerBound` marks a sum that skips unpriced models. */
export function formatUsd(n: number, { lowerBound = false } = {}): string {
  const amount = n > 0 && n < 0.01 ? "<$0.01" : `$${n.toFixed(2)}`;
  return lowerBound ? `≥ ${amount}` : amount;
}

/** "2026-07-20" → "JUL 20, 2026", read as a UTC day like the rest of this file. */
export function formatIsoDay(isoDay: string): string {
  return formatDayLabel(Date.parse(`${isoDay}T00:00:00Z`) / 1000);
}
