import type { AiUsageRange } from "./range";

export const aiUsageKeys = {
  all: ["ai-usage"] as const,
  range: (range: AiUsageRange) => [...aiUsageKeys.all, range] as const,
};
