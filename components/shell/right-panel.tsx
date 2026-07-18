"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Monitor } from "@/components/monitor";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useChannel } from "@/hooks/use-channel";
import { formatRange } from "@/lib/format";
import {
  getProjectStatus,
  projectSlug,
  PROJECT_STATUS_META,
} from "@/lib/project-utils";
import {
  aboutMeQuery,
  contactsQuery,
  educationQuery,
  experienceQuery,
  projectsQuery,
  statisticQuery,
} from "@/lib/queries";
import { cn } from "@/lib/utils";

function PanelLink({
  href,
  label,
  active,
  indent = false,
  expanded,
}: {
  href: string;
  label: string;
  active: boolean;
  indent?: boolean;
  expanded?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-expanded={expanded}
      className={cn(
        "block py-1.5 text-[13px] uppercase tracking-[0.05em]",
        indent && "pl-4",
        active
          ? "text-green-bright"
          : "text-green-dim hover:text-green-mid",
      )}
    >
      {indent ? <span className="mr-1 text-text-muted">└─</span> : null}
      {label}
    </Link>
  );
}

function HomePanel() {
  const { data: aboutMe } = useQuery(aboutMeQuery);
  const quote =
    aboutMe?.mission ?? "Signal locked. All instruments nominal.";
  return (
    <blockquote className="text-[13px] leading-[1.6] text-text-muted">
      <span className="mr-2">&gt;</span>
      {quote}
    </blockquote>
  );
}

function AboutPanel() {
  const params = useParams<{ view?: string[] }>();
  const [view = "overall", entryId] = params.view ?? [];
  const { data: education } = useQuery(educationQuery);
  const { data: experience } = useQuery(experienceQuery);

  return (
    <div className="flex flex-col">
      <PanelLink href="/about" label="OVERALL" active={view === "overall"} />
      {/* Sub-menus expand instantly — no height animation (§5.3). The URL
          is the open state, so the "trigger" is just the section link. */}
      <PanelLink
        href="/about/education"
        label="EDUCATION"
        active={view === "education"}
        expanded={view === "education"}
      />
      <Collapsible open={view === "education"}>
        <CollapsibleContent>
          {education?.map((entry, i) => (
            <PanelLink
              key={entry.id}
              href={`/about/education/${entry.id}`}
              label={entry.title}
              active={entryId ? entryId === entry.id : i === 0}
              indent
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
      <PanelLink
        href="/about/experience"
        label="EXPERIENCE"
        active={view === "experience"}
        expanded={view === "experience"}
      />
      <Collapsible open={view === "experience"}>
        <CollapsibleContent>
          {experience?.map((entry, i) => (
            <PanelLink
              key={entry.id}
              href={`/about/experience/${entry.id}`}
              label={entry.company}
              active={entryId ? entryId === entry.id : i === 0}
              indent
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function StatisticsPanel() {
  const params = useParams<{ view?: string[] }>();
  const [view = "languages"] = params.view ?? [];
  const { data: statistic } = useQuery(statisticQuery);

  return (
    <div className="flex flex-col gap-4">
      <dl className="flex flex-col gap-2 border-b border-green-dim/40 pb-4 text-[11px] uppercase tracking-[0.05em]">
        <div className="flex flex-col">
          <dt className="text-text-muted">RANGE</dt>
          <dd className="text-green-mid">
            {statistic ? formatRange(statistic.startDate, statistic.endDate) : "---"}
          </dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-text-muted">TOTAL TIME</dt>
          <dd className="text-green-mid">
            {statistic ? statistic.humanReadable.toUpperCase() : "---"}
          </dd>
        </div>
      </dl>
      <div className="flex flex-col">
        <PanelLink
          href="/statistics"
          label="LANGUAGES"
          active={view === "languages"}
        />
        <PanelLink
          href="/statistics/operating-system"
          label="OPERATING SYSTEM"
          active={view === "operating-system"}
        />
        <PanelLink
          href="/statistics/contributions"
          label="CONTRIBUTIONS"
          active={view === "contributions"}
        />
      </div>
    </div>
  );
}

function ProjectsPanel() {
  const params = useParams<{ slug?: string[] }>();
  const activeSlug = params.slug?.[0];
  const { data: projects } = useQuery(projectsQuery);

  return (
    <div className="flex flex-col">
      {projects?.map((project, i) => {
        const slug = projectSlug(project);
        const status = PROJECT_STATUS_META[getProjectStatus(project)];
        const active = activeSlug ? activeSlug === slug : i === 0;
        return (
          <Link
            key={project.id}
            href={`/projects/${slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center justify-between gap-2 py-1.5 text-[13px] uppercase tracking-[0.05em]",
              active ? "text-green-bright" : "text-green-dim hover:text-green-mid",
            )}
          >
            <span className="truncate">{project.title}</span>
            <span aria-hidden className={cn("text-[9px]", status.colorClass)}>
              ●
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function ContactPanel() {
  const { data: contacts } = useQuery(contactsQuery);
  return (
    <div className="flex flex-col">
      {contacts?.map((contact) => (
        <span
          key={contact.id}
          className="py-1.5 text-[13px] uppercase tracking-[0.05em] text-green-mid"
        >
          {contact.title}
        </span>
      ))}
    </div>
  );
}

/** §5.3 — contextual sub-nav + metadata for the active section. */
export function RightPanel() {
  const { channel } = useChannel();

  return (
    <Monitor title={`${channel.label} // INDEX`}>
      {channel.label === "HOME" && <HomePanel />}
      {channel.label === "ABOUT" && <AboutPanel />}
      {channel.label === "STATISTICS" && <StatisticsPanel />}
      {channel.label === "PROJECTS" && <ProjectsPanel />}
      {channel.label === "CONTACT" && <ContactPanel />}
    </Monitor>
  );
}
