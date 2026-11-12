export const AI_USAGE_RANGES = ["7d", "30d", "all"] as const;
export type AiUsageRange = (typeof AI_USAGE_RANGES)[number];

const DAYS: Record<Exclude<AiUsageRange, "all">, number> = { "7d": 7, "30d": 30 };

function utcDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Inclusive UTC day bounds for port-server's from/to; "all" sends none. */
export function rangeToParams(range: AiUsageRange): { from?: string; to?: string } {
  if (range === "all") return {};
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - (DAYS[range] - 1));
  return { from: utcDay(from), to: utcDay(to) };
}
