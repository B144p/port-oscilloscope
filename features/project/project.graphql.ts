import { graphql } from "@/lib/graphql/generated";

export const ProjectFields = graphql(`
  fragment ProjectFields on Project {
    id
    title
    description
    preview
    logo
    status
    order
    tags {
      id
      tag
    }
    sources {
      id
      title
      url
    }
  }
`);

export const ProjectsDocument = graphql(`
  query Projects {
    projects {
      ...ProjectFields
    }
  }
`);
