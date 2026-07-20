import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "OSCILLOSCOPE // ABOUT",
};

export default function AboutPage() {
  return <AboutSection />;
}
