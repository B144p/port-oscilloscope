import type { Icon } from "@phosphor-icons/react";
import {
  ChartLineUp,
  House,
  IdentificationCard,
  Phone,
  SquaresFour,
} from "@phosphor-icons/react";

export const SITE_CONFIG = {
  mark: "[ OSCILLOSCOPE // v1.0 ]",
  build: "2.0.1",
  clearance: "PUBLIC",
} as const;

/**
 * Hero identity comes from GET /v1/about-me (`handle`, `role`). These are the
 * fallbacks for when those fields are null — they are unset in the DB today,
 * so this is the live path, not a rare edge case.
 */
export const IDENTITY_FALLBACK = {
  handle: "OPERATOR-BT_144P",
  role: "SOFTWARE ENGINEER — WHO LOST IN MIND",
} as const;

export interface Channel {
  number: string;
  label: string;
  path: string;
  /** First pathname segment ('' for home) */
  segment: string;
  icon: Icon;
}

/** §5.1 — channel numbers are fixed. */
export const CHANNELS: Channel[] = [
  { number: "01", label: "HOME", path: "/", segment: "", icon: House },
  { number: "02", label: "ABOUT", path: "/about", segment: "about", icon: IdentificationCard },
  { number: "03", label: "STATISTICS", path: "/statistics", segment: "statistics", icon: ChartLineUp },
  { number: "04", label: "PROJECTS", path: "/projects", segment: "projects", icon: SquaresFour },
  { number: "05", label: "CONTACT", path: "/contact", segment: "contact", icon: Phone },
];

export function channelForSegment(segment: string): Channel {
  return CHANNELS.find((c) => c.segment === segment) ?? CHANNELS[0];
}
