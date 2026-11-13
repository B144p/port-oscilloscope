import type { FrontendVersionsFieldsFragment } from "@/lib/graphql/generated/graphql";

/** port-server filters hidden versions and sorts by `order`. */
export type FrontendVersionCatalog = FrontendVersionsFieldsFragment;
export type FrontendVersion = FrontendVersionCatalog["versions"][number];
