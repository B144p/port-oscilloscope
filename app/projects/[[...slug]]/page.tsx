import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "OSCILLOSCOPE // PROJECTS",
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
