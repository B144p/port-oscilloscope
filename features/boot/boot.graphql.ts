import { graphql } from "@/lib/graphql/generated";

/**
 * Every section in one request, for the root layout's SSR prefetch (§6:
 * all data warm before the first channel switch). Roots are nullable on
 * port-server, so one failing section comes back null with its own error
 * instead of blanking the rest. aiUsage without args = the default ALL range.
 */
export const BootDocument = graphql(`
  query Boot {
    aboutMe {
      ...AboutMeFields
    }
    educations {
      ...EducationFields
    }
    experiences {
      ...ExperienceFields
    }
    projects {
      ...ProjectFields
    }
    contacts {
      ...ContactFields
    }
    statistic {
      ...StatisticFields
    }
    frontendVersions {
      ...FrontendVersionsFields
    }
    aiUsage {
      ...AiUsageFields
    }
  }
`);
