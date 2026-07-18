const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** Unix seconds → "FEB 2023" */
export function formatMonthYear(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
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
