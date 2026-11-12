import { graphql } from "@/lib/graphql/generated";

export const AiUsageFields = graphql(`
  fragment AiUsageFields on AiUsage {
    range {
      from
      to
    }
    totals {
      requests
      inputTokens
      outputTokens
      cacheWriteTokens
      cacheReadTokens
      tokens
      estimatedCostUsd
    }
    models {
      model
      requests
      inputTokens
      outputTokens
      cacheWriteTokens
      cacheReadTokens
      tokens
      estimatedCostUsd
    }
    clients {
      client
      requests
      tokens
      percent
    }
    daily {
      date
      requests
      tokens
      estimatedCostUsd
      hasUnpricedModels
    }
    unpricedModels
  }
`);

/** from/to are inclusive UTC days; both omitted = all time. */
export const AiUsageDocument = graphql(`
  query AiUsage($from: String, $to: String) {
    aiUsage(from: $from, to: $to) {
      ...AiUsageFields
    }
  }
`);
