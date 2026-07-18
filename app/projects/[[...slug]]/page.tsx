import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "PORT-CATHODE // PROJECTS",
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
