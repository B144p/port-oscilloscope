import type {
  AboutMe,
  Contact,
  EducationEntry,
  ExperienceEntry,
  FrontendVersionCatalog,
  Project,
  Statistic,
} from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

/**
 * Must match a FrontendVersion.key row in port-server — it identifies this
 * frontend for view counting and CORS. Kept in code, not an env var: it is a
 * property of this repo, and `.gitignore` ignores `.env*` so an env var would
 * be invisible to every deploy target.
 */
export const FRONTEND_VERSION_KEY = "port-oscilloscope";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "X-Frontend-Version": FRONTEND_VERSION_KEY },
  });
  if (!res.ok) {
    throw new Error(`LINK FAILURE // ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

export const getAboutMe = () => fetchJson<AboutMe>("/v1/about-me");
export const getEducation = () => fetchJson<EducationEntry[]>("/v1/education");
export const getExperience = () =>
  fetchJson<ExperienceEntry[]>("/v1/experience");
export const getProjects = async () =>
  (await fetchJson<Project[]>("/v1/project")).sort((a, b) => a.order - b.order);
export const getContacts = () => fetchJson<Contact[]>("/v1/contact");
export const getStatistic = () => fetchJson<Statistic>("/v1/statistic");
export const getFrontendVersion = () =>
  fetchJson<FrontendVersionCatalog>("/v1/frontend-version");
