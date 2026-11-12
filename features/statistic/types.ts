import type { StatisticFieldsFragment } from "@/lib/graphql/generated/graphql";

/** Shape selected by StatisticFields; startDate/endDate and Contribution.date are Unix seconds. */
export type Statistic = StatisticFieldsFragment;
export type LanguageStat = Statistic["languages"][number];
export type OsStat = Statistic["operatingSystems"][number];
export type Contribution = Statistic["contributions"][number];
