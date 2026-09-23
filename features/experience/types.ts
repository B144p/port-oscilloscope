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
