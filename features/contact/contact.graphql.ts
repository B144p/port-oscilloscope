import { graphql } from "@/lib/graphql/generated";

export const ContactFields = graphql(`
  fragment ContactFields on Contact {
    id
    title
    url
  }
`);

export const ContactsDocument = graphql(`
  query Contacts {
    contacts {
      ...ContactFields
    }
  }
`);
