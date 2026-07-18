import type {
  AboutMe,
  Contact,
  EducationEntry,
  ExperienceEntry,
  Project,
  Statistic,
} from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`LINK FAILURE // ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

export const getAboutMe = () => fetchJson<AboutMe>("/v1/about-me");
export const getEducation = () => fetchJson<EducationEntry[]>("/v1/education");
export const getExperience = () =>
  fetchJson<ExperienceEntry[]>("/v1/experience");
export const getProjects = () => fetchJson<Project[]>("/v1/project");
export const getContacts = () => fetchJson<Contact[]>("/v1/contact");
export const getStatistic = () => fetchJson<Statistic>("/v1/statistic");
