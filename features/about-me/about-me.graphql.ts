import { graphql } from "@/lib/graphql/generated";

export const AboutMeFields = graphql(`
  fragment AboutMeFields on AboutMe {
    id
    intro
    bio
    mission
    displayName
    handle
    role
    location
    avatar
    resumeUrl
    availability
  }
`);

export const AboutMeDocument = graphql(`
  query AboutMe {
    aboutMe {
      ...AboutMeFields
    }
  }
`);
