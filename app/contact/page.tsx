import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "PORT-CATHODE // CONTACT",
};

export default function ContactPage() {
  return <ContactSection />;
}
