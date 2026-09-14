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
