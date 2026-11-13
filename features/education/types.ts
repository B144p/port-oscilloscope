import type { EducationFieldsFragment } from "@/lib/graphql/generated/graphql";

/** Shape selected by EducationFields; startDate/endDate are Unix seconds. */
export type EducationEntry = EducationFieldsFragment;
export type EducationDescription = EducationEntry["descriptions"][number];
