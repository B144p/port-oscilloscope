import { queryOptions, useQuery } from "@tanstack/react-query";
import { statisticKeys } from "../keys";
import type { Statistic } from "../types";

export type { Statistic, LanguageStat, OsStat, Contribution } from "../types";

async function fetchStatistic(): Promise<Statistic> {
  const res = await fetch("/api/statistic");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /statistic`);
  return res.json() as Promise<Statistic>;
}

export const statisticQuery = queryOptions({
  queryKey: statisticKeys.all,
  queryFn: fetchStatistic,
});

export function useStatistic() {
  return useQuery(statisticQuery);
}
