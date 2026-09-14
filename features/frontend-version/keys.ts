export const frontendVersionKeys = {
  all: ["frontend-version"] as const,
};

/**
 * Must match a FrontendVersion.key row in port-server — it identifies this
 * frontend for view counting and CORS. Kept in code, not an env var: it is
 * a property of this repo, and `.gitignore` ignores `.env*` so an env var
 * would be invisible to every deploy target. Lives here (not lib/backend.ts)
 * because the client also needs it, to find "this version" in the catalog
 * (see hooks/use-view-count.ts) — lib/backend.ts is server-only.
 */
export const FRONTEND_VERSION_KEY = "port-oscilloscope";
