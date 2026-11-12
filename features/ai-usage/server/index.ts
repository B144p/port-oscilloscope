import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { aiUsageKeys } from "../keys";
import type { AiUsage } from "../types";

/** All-time: the tab's default range, so the first paint needs no fetch. */
export const getAiUsage = () => backendGet<AiUsage>("/v1/ai-usage");

export function prefetchAiUsage(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: aiUsageKeys.range("all"),
    queryFn: getAiUsage,
  });
}
