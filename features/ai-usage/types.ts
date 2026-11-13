import type { AiUsageFieldsFragment } from "@/lib/graphql/generated/graphql";

/**
 * Shape selected by AiUsageFields. Token counts are plain numbers (GraphQL
 * Float): range sums pass 2^31 but stay well inside 2^53. range.from/to
 * echo the query, or the data's bounds for all time.
 */
export type AiUsage = AiUsageFieldsFragment;
export type AiUsageTotals = AiUsage["totals"];
export type AiUsageModel = AiUsage["models"][number];
export type AiUsageClient = AiUsage["clients"][number];
export type AiUsageDay = AiUsage["daily"][number];
