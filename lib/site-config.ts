import type { Icon } from "@phosphor-icons/react";
import {
  ChartLineUp,
  House,
  IdentificationCard,
  Phone,
  SquaresFour,
} from "@phosphor-icons/react";

export const SITE_CONFIG = {
  /** Hero handle — replace with your real handle. No API field exists for this. */
  handle: "OPERATOR_UNKNOWN",
  /** One-line role descriptor under the hero handle (§5.4 HOME). */
  role: "FRONTEND DEVELOPER — CONTROL ENGINEERING GRADUATE",
  mark: "[ PORT-CATHODE // v2.0 ]",
  build: "2.0.1",
  clearance: "PUBLIC",
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
