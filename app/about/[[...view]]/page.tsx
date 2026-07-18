import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "PORT-CATHODE // ABOUT",
};

export default function AboutPage() {
  return <AboutSection />;
}
