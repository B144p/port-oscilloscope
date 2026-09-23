import { queryOptions, useQuery } from "@tanstack/react-query";
import { contactKeys } from "../keys";
import type { Contact } from "../types";

export type { Contact };

async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch("/api/contact");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /contact`);
  return res.json() as Promise<Contact[]>;
}

export const contactsQuery = queryOptions({
  queryKey: contactKeys.all,
  queryFn: fetchContacts,
});

export function useContacts() {
  return useQuery(contactsQuery);
}
