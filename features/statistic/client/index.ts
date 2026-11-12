import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSection } from "@/lib/graphql/client";
import { StatisticDocument } from "../statistic.graphql";
import { statisticKeys } from "../keys";
import type { Statistic } from "../types";

export type { Statistic, LanguageStat, OsStat, Contribution } from "../types";

async function fetchStatistic(): Promise<Statistic> {
  return fetchSection(StatisticDocument, "statistic");
}

export const statisticQuery = queryOptions({
  queryKey: statisticKeys.all,
  queryFn: fetchStatistic,
});

export function useStatistic() {
  return useQuery(statisticQuery);
}
