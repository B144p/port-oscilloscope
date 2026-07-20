import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "OSCILLOSCOPE // CONTACT",
};

export default function ContactPage() {
  return <ContactSection />;
}
