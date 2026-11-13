import { graphql } from "@/lib/graphql/generated";

export const ExperienceFields = graphql(`
  fragment ExperienceFields on Experience {
    id
    company
    role
    startDate
    endDate
    responsibilities {
      id
      description
    }
  }
`);

export const ExperiencesDocument = graphql(`
  query Experiences {
    experiences {
      ...ExperienceFields
    }
  }
`);
