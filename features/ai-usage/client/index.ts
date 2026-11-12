import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { aiUsageKeys } from "../keys";
import { rangeToParams, type AiUsageRange } from "../range";
import type { AiUsage } from "../types";

export type {
  AiUsage,
  AiUsageClient,
  AiUsageDay,
  AiUsageModel,
  AiUsageTotals,
} from "../types";
export { AI_USAGE_RANGES, type AiUsageRange } from "../range";

async function fetchAiUsage(params: { from?: string; to?: string }): Promise<AiUsage> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`/api/ai-usage${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /ai-usage`);
  return res.json() as Promise<AiUsage>;
}

/** Dates are resolved once, so the key and the request always describe the same window. */
export const aiUsageQuery = (range: AiUsageRange) => {
  const params = rangeToParams(range);
  return queryOptions({
    queryKey: aiUsageKeys.range(range, params.from),
    queryFn: () => fetchAiUsage(params),
  });
};

/** Keeps the previous range on screen while the next one loads. */
export function useAiUsage(range: AiUsageRange) {
  return useQuery({ ...aiUsageQuery(range), placeholderData: keepPreviousData });
}
