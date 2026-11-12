/** Mirrors port-server src/ai-usage/models/ai-usage.model.ts. Token counts
 *  are plain numbers: range sums pass 2^31 but stay well inside 2^53. */

export interface AiUsageTotals {
  requests: number;
  inputTokens: number;
  outputTokens: number;
  cacheWriteTokens: number;
  cacheReadTokens: number;
  tokens: number;
  estimatedCostUsd: number;
}

export interface AiUsageModel {
  model: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  cacheWriteTokens: number;
  cacheReadTokens: number;
  tokens: number;
  /** Null when the model has no price row. */
  estimatedCostUsd: number | null;
}

export interface AiUsageClient {
  client: string;
  requests: number;
  tokens: number;
  percent: number;
}

export interface AiUsageDay {
  /** YYYY-MM-DD */
  date: string;
  requests: number;
  tokens: number;
  /** Priced models only. */
  estimatedCostUsd: number;
  /** True when this day's cost is a lower bound. */
  hasUnpricedModels: boolean;
}

export interface AiUsage {
  /** Echo of the query; both absent for all-time. */
  range: { from?: string | null; to?: string | null };
  totals: AiUsageTotals;
  models: AiUsageModel[];
  clients: AiUsageClient[];
  daily: AiUsageDay[];
  unpricedModels: string[];
}
