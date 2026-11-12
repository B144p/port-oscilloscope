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

async function fetchAiUsage(range: AiUsageRange): Promise<AiUsage> {
  const qs = new URLSearchParams(rangeToParams(range)).toString();
  const res = await fetch(`/api/ai-usage${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /ai-usage`);
  return res.json() as Promise<AiUsage>;
}

export const aiUsageQuery = (range: AiUsageRange) =>
  queryOptions({
    queryKey: aiUsageKeys.range(range),
    queryFn: () => fetchAiUsage(range),
  });

/** Keeps the previous range on screen while the next one loads. */
export function useAiUsage(range: AiUsageRange) {
  return useQuery({ ...aiUsageQuery(range), placeholderData: keepPreviousData });
}
