import type { AiUsageRange } from "./range";

export const aiUsageKeys = {
  all: ["ai-usage"] as const,
  /**
   * Rolling ranges carry their start day: the cache never goes stale in-session
   * (§6), so a new UTC day must be a new key or 7D/30D would keep yesterday's window.
   */
  range: (range: AiUsageRange, from?: string) =>
    from
      ? ([...aiUsageKeys.all, range, from] as const)
      : ([...aiUsageKeys.all, range] as const),
};
