export interface FrontendVersion {
  id: string;
  key: string;
  url: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  show: boolean;
  order: number;
  views: number;
  /** ISO 8601 */
  createdAt: string;
  updatedAt: string;
}

/** GET /v1/frontend-version — server filters `show:false` and sorts by `order`. */
export interface FrontendVersionCatalog {
  totalViews: number;
  versions: FrontendVersion[];
}
