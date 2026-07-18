// Response shapes for port-server public endpoints (raw JSON, no envelope).

export interface AboutMe {
  id: string;
  intro: string;
  bio: string | null;
  mission: string | null;
}

export interface EducationDescription {
  id: string;
  educationId: string;
  description: string;
}

export interface EducationEntry {
  id: string;
  title: string;
  /** Unix seconds */
  startDate: number;
  endDate: number | null;
  descriptions: EducationDescription[];
}

export interface Responsibility {
  id: string;
  experienceId: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  /** Unix seconds */
  startDate: number;
  endDate: number | null;
  responsibilities: Responsibility[];
}

export interface ProjectTag {
  id: string;
  projectId: string;
  tag: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  preview: string | null;
  logo: string | null;
  inProgress: boolean;
  tags: ProjectTag[];
}

export interface Contact {
  id: string;
  title: string;
  url: string;
}

export interface LanguageStat {
  id: string;
  statisticsId: string;
  language: string;
  totalSeconds: number;
  humanReadable: string;
  percent: number;
}

export interface OsStat {
  id: string;
  statisticsId: string;
  os: string;
  totalSeconds: number;
  humanReadable: string;
  percent: number;
}

export interface Contribution {
  id: string;
  statisticsId: string;
  /** Unix seconds (day) */
  date: number;
  totalSeconds: number;
}

export interface Statistic {
  id: string;
  /** Unix seconds */
  startDate: number;
  /** Unix seconds */
  endDate: number;
  totalSeconds: number;
  humanReadable: string;
  lastFetch: string;
  languages: LanguageStat[];
  operatingSystems: OsStat[];
  contributions: Contribution[];
}
