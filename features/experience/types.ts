import type { ExperienceFieldsFragment } from "@/lib/graphql/generated/graphql";

/** Shape selected by ExperienceFields; startDate/endDate are Unix seconds. */
export type ExperienceEntry = ExperienceFieldsFragment;
export type Responsibility = ExperienceEntry["responsibilities"][number];
