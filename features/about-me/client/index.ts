import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSection } from "@/lib/graphql/client";
import { AboutMeDocument } from "../about-me.graphql";
import { aboutMeKeys } from "../keys";
import type { AboutMe } from "../types";

export type { AboutMe };

// Only runs when the SSR boot prefetch (features/boot/server.ts) didn't
// seed this key — i.e. that section failed, or ErrorState's retry fires.
// Always goes through this app's own /api/graphql, never port-server.
async function fetchAboutMe(): Promise<AboutMe> {
  return fetchSection(AboutMeDocument, "aboutMe");
}

export const aboutMeQuery = queryOptions({
  queryKey: aboutMeKeys.all,
  queryFn: fetchAboutMe,
});

export function useAboutMe() {
  return useQuery(aboutMeQuery);
}
