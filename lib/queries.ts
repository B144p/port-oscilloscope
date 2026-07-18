import { queryOptions } from "@tanstack/react-query";
import {
  getAboutMe,
  getContacts,
  getEducation,
  getExperience,
  getProjects,
  getStatistic,
} from "@/lib/api";

export const aboutMeQuery = queryOptions({
  queryKey: ["about-me"],
  queryFn: getAboutMe,
});

export const educationQuery = queryOptions({
  queryKey: ["education"],
  queryFn: getEducation,
});

export const experienceQuery = queryOptions({
  queryKey: ["experience"],
  queryFn: getExperience,
});

export const projectsQuery = queryOptions({
  queryKey: ["project"],
  queryFn: getProjects,
});

export const contactsQuery = queryOptions({
  queryKey: ["contact"],
  queryFn: getContacts,
});

export const statisticQuery = queryOptions({
  queryKey: ["statistic"],
  queryFn: getStatistic,
});

/** Everything the boot sequence prefetches in parallel (§6). */
export const ALL_QUERIES = [
  aboutMeQuery,
  educationQuery,
  experienceQuery,
  projectsQuery,
  contactsQuery,
  statisticQuery,
] as const;
