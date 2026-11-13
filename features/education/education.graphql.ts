import { graphql } from "@/lib/graphql/generated";

export const EducationFields = graphql(`
  fragment EducationFields on Education {
    id
    title
    startDate
    endDate
    descriptions {
      id
      description
    }
  }
`);

export const EducationsDocument = graphql(`
  query Educations {
    educations {
      ...EducationFields
    }
  }
`);
