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
