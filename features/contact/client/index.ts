import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSection } from "@/lib/graphql/client";
import { ContactsDocument } from "../contact.graphql";
import { contactKeys } from "../keys";
import type { Contact } from "../types";

export type { Contact };

async function fetchContacts(): Promise<Contact[]> {
  return fetchSection(ContactsDocument, "contacts");
}

export const contactsQuery = queryOptions({
  queryKey: contactKeys.all,
  queryFn: fetchContacts,
});

export function useContacts() {
  return useQuery(contactsQuery);
}
