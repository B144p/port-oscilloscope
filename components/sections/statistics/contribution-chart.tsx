"use client";

import { EmptyState } from "@/components/states";

/**
 * §5.4 — deliberate stub. The backend already returns contributions[],
 * but the spec ships this module offline.
 * TODO: contributions chart — GET /v1/statistic → contributions[{date, totalSeconds}]
 */
export function ContributionChart() {
  return <EmptyState />;
}
