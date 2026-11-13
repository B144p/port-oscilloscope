import { graphql } from "@/lib/graphql/generated";

export const FrontendVersionsFields = graphql(`
  fragment FrontendVersionsFields on FrontendVersionList {
    totalViews
    versions {
      id
      key
      url
      title
      description
      thumbnail
      order
      views
    }
  }
`);

export const FrontendVersionsDocument = graphql(`
  query FrontendVersions {
    frontendVersions {
      ...FrontendVersionsFields
    }
  }
`);
