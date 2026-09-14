import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { contactKeys } from "../keys";
import type { Contact } from "../types";

export const getContacts = () => backendGet<Contact[]>("/v1/contact");

export function prefetchContacts(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: contactKeys.all,
    queryFn: getContacts,
  });
}
