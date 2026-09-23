// Client-safe: no import here may reach port-server (lib/backend.ts / ./server).
export const aboutMeKeys = {
  all: ["about-me"] as const,
};
