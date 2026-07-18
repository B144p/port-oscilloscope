"use client";

import { useQuery } from "@tanstack/react-query";
import { Monitor } from "@/components/monitor";
import { useChannel } from "@/hooks/use-channel";
import {
  contactsQuery,
  educationQuery,
  experienceQuery,
  projectsQuery,
} from "@/lib/queries";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * §5.1 — channel ID + section readout. The readout reads the same
 * react-query cache the body uses; it never fetches on its own after boot.
 */
export function Header() {
  const { channel } = useChannel();
  const { data: education } = useQuery(educationQuery);
  const { data: experience } = useQuery(experienceQuery);
  const { data: projects } = useQuery(projectsQuery);
  const { data: contacts } = useQuery(contactsQuery);

  const readout = (() => {
    switch (channel.label) {
      case "ABOUT": {
        const count = (education?.length ?? 0) + (experience?.length ?? 0);
        return count ? `REC: ${count} ENTRIES` : "REC: ---";
      }
      case "STATISTICS":
        return "SRC: PORT-SERVER";
      case "PROJECTS":
        return projects ? `IDX: ${projects.length} PROJECTS` : "IDX: ---";
      case "CONTACT":
        return contacts ? `LINK: ${contacts.length} CHANNELS` : "LINK: ---";
      default:
        return "SIG: NOMINAL";
    }
  })();

  return (
    <Monitor
      className="col-span-3"
      contentClassName="flex items-center justify-between gap-4 whitespace-nowrap py-0 text-[13px]"
    >
      <span className="shrink-0 font-medium text-green-bright">
        {SITE_CONFIG.mark}
      </span>
      <span className="flex min-w-0 items-center gap-4">
        <span className="uppercase tracking-[0.05em] text-green-mid">
          CH.{channel.number} // {channel.label}
        </span>
        <span className="hidden truncate text-[11px] uppercase tracking-[0.05em] text-text-muted lg:inline">
          {readout}
        </span>
        <span className="shrink-0 text-[11px] text-green-bright">● ONLINE</span>
      </span>
    </Monitor>
  );
}
