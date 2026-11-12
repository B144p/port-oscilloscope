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
  { value: 1e3, suffix: "K" },
  { value: 1e6, suffix: "M" },
  { value: 1e9, suffix: "B" },
];

/** What the label will show: whole numbers from 100 up, one decimal below. */
function roundCompact(scaled: number): number {
  return scaled >= 100 ? Math.round(scaled) : Math.round(scaled * 10) / 10;
}

/**
 * Large counts → "1.2K" / "3.4M" / "5.6B"; token sums pass 2^31 quickly.
 * The unit is chosen after rounding, so 999,950 reads "1.0M", not "1000K".
 */
export function formatCompact(n: number): string {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (Math.round(abs) < 1000) return `${sign}${Math.round(abs)}`;

  let i = 0;
  while (
    i < COMPACT_UNITS.length - 1 &&
    roundCompact(abs / COMPACT_UNITS[i].value) >= 1000
  ) {
    i++;
  }
  const scaled = roundCompact(abs / COMPACT_UNITS[i].value);
  const digits = scaled >= 100 ? String(scaled) : scaled.toFixed(1);
  return `${sign}${digits}${COMPACT_UNITS[i].suffix}`;
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
