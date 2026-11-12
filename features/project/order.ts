import type { Project } from "./types";

/**
 * port-server already returns projects by `order`; sorting here keeps the
 * UI correct even if that changes. Used by both the SSR seed and the
 * client fetch so both paths agree.
 */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}
