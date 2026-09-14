import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { aboutMeKeys } from "../keys";
import type { AboutMe } from "../types";

export const getAboutMe = () => backendGet<AboutMe>("/v1/about-me");

export function prefetchAboutMe(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: aboutMeKeys.all,
    queryFn: getAboutMe,
  });
}
