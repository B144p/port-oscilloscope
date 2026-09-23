import { queryOptions, useQuery } from "@tanstack/react-query";
import { aboutMeKeys } from "../keys";
import type { AboutMe } from "../types";

export type { AboutMe };

// Only runs when the server's prefetch (../server) didn't already hydrate
// this key — i.e. the SSR fetch failed, or ErrorState's retry fires. Always
// goes through this app's own route handler, never port-server directly.
async function fetchAboutMe(): Promise<AboutMe> {
  const res = await fetch("/api/about-me");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /about-me`);
  return res.json() as Promise<AboutMe>;
}

export const aboutMeQuery = queryOptions({
  queryKey: aboutMeKeys.all,
  queryFn: fetchAboutMe,
});

export function useAboutMe() {
  return useQuery(aboutMeQuery);
}
