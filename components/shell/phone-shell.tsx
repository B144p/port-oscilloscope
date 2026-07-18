"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ListIcon } from "@phosphor-icons/react";
import { ChannelSwitch } from "@/components/channel-switch";
import { Monitor } from "@/components/monitor";
import {
  Education,
  Experience,
  Overall,
} from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { HomeSection } from "@/components/sections/home";
import { ProjectsSection } from "@/components/sections/projects";
import { StatisticsSection } from "@/components/sections/statistics";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useChannel } from "@/hooks/use-channel";
import { formatRange } from "@/lib/format";
import {
  getProjectStatus,
  projectSlug,
  PROJECT_STATUS_META,
} from "@/lib/project-utils";
import {
  aboutMeQuery,
  educationQuery,
  experienceQuery,
  projectsQuery,
  statisticQuery,
} from "@/lib/queries";
import { CHANNELS, SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  label: string;
  href: string;
  right?: React.ReactNode;
  content?: React.ReactNode;
}

/**
 * §8.2 — one-open-at-a-time accordion; the URL is the open state, so
 * tabs are links (deep links and back button stay canonical). 44px rows
 * for touch, +/− indicator, instant toggle.
 */
function Accordion({ items, openId }: { items: AccordionItem[]; openId: string }) {
  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <div key={item.id} className="border-b border-green-dim/40">
            <Link
              href={item.href}
              aria-expanded={open}
              className={cn(
                "flex min-h-11 w-full items-center justify-between gap-3 py-2 text-[13px] uppercase tracking-[0.05em]",
                open ? "text-green-bright" : "text-green-dim",
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{item.label}</span>
                {item.right}
              </span>
              <span aria-hidden className="shrink-0">
                {open ? "−" : "+"}
              </span>
            </Link>
            {open && item.content ? (
              <div className="pb-4">{item.content}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function PhoneEntryList({
  entries,
  basePath,
  activeId,
}: {
  entries: Array<{ id: string; label: string }>;
  basePath: string;
  activeId?: string;
}) {
  return (
    <div className="mb-4 flex flex-col border-b border-green-dim/40 pb-2">
      {entries.map((entry, i) => {
        const active = activeId ? activeId === entry.id : i === 0;
        return (
          <Link
            key={entry.id}
            href={`${basePath}/${entry.id}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center py-1 text-[13px] uppercase tracking-[0.05em]",
              active ? "text-green-bright" : "text-green-dim",
            )}
          >
            <span className="mr-1 text-text-muted">└─</span>
            {entry.label}
          </Link>
        );
      })}
    </div>
  );
}

function AboutPhone() {
  const params = useParams<{ view?: string[] }>();
  const [view = "overall", entryId] = params.view ?? [];
  const { data: education } = useQuery(educationQuery);
  const { data: experience } = useQuery(experienceQuery);

  const items: AccordionItem[] = [
    { id: "overall", label: "OVERALL", href: "/about", content: <Overall /> },
    {
      id: "education",
      label: "EDUCATION",
      href: "/about/education",
      content: (
        <>
          <PhoneEntryList
            entries={(education ?? []).map((e) => ({ id: e.id, label: e.title }))}
            basePath="/about/education"
            activeId={entryId}
          />
          <Education entryId={entryId} />
        </>
      ),
    },
    {
      id: "experience",
      label: "EXPERIENCE",
      href: "/about/experience",
      content: (
        <>
          <PhoneEntryList
            entries={(experience ?? []).map((e) => ({ id: e.id, label: e.company }))}
            basePath="/about/experience"
            activeId={entryId}
          />
          <Experience entryId={entryId} />
        </>
      ),
    },
  ];

  return <Accordion items={items} openId={view} />;
}

function StatisticsPhone() {
  const params = useParams<{ view?: string[] }>();
  const [view = "languages"] = params.view ?? [];
  const { data: statistic } = useQuery(statisticQuery);

  const items: AccordionItem[] = [
    { id: "languages", label: "LANGUAGES", href: "/statistics" },
    { id: "operating-system", label: "OPERATING SYSTEM", href: "/statistics/operating-system" },
    { id: "contributions", label: "CONTRIBUTIONS", href: "/statistics/contributions" },
  ].map((item) => ({
    ...item,
    content: <StatisticsSection />,
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* §8.2 — RANGE + TOTAL TIME pinned above the stack: context for
          every sub-view. */}
      <dl className="grid grid-cols-2 gap-2 border-b border-green-dim/40 pb-3 text-[11px] uppercase tracking-[0.05em]">
        <div>
          <dt className="text-text-muted">RANGE</dt>
          <dd className="text-green-mid">
            {statistic ? formatRange(statistic.startDate, statistic.endDate) : "---"}
          </dd>
        </div>
        <div>
          <dt className="text-text-muted">TOTAL TIME</dt>
          <dd className="text-green-mid">
            {statistic ? statistic.humanReadable.toUpperCase() : "---"}
          </dd>
        </div>
      </dl>
      <Accordion items={items} openId={view} />
    </div>
  );
}

function ProjectsPhone() {
  const params = useParams<{ slug?: string[] }>();
  const activeSlug = params.slug?.[0];
  const { data: projects } = useQuery(projectsQuery);

  const items: AccordionItem[] = (projects ?? []).map((project) => {
    const slug = projectSlug(project);
    const status = PROJECT_STATUS_META[getProjectStatus(project)];
    return {
      id: slug,
      label: project.title,
      href: `/projects/${slug}`,
      right: (
        <span aria-hidden className={cn("text-[9px]", status.colorClass)}>
          ●
        </span>
      ),
      content: <ProjectsSection />,
    };
  });

  const openId = activeSlug ?? (items[0]?.id || "");
  return <Accordion items={items} openId={openId} />;
}

function HomePhone() {
  const { data: aboutMe } = useQuery(aboutMeQuery);
  const quote = aboutMe?.mission ?? "Signal locked. All instruments nominal.";
  return (
    <div className="flex flex-col gap-6">
      {/* Right-sidebar content precedes the detail it frames (§8.2). */}
      <blockquote className="border-b border-green-dim/40 pb-4 text-[13px] leading-[1.6] text-text-muted">
        <span className="mr-2">&gt;</span>
        {quote}
      </blockquote>
      <HomeSection />
    </div>
  );
}

/** §8.2 — one scrolling column; native scroll, no ScrollArea on phones. */
export function PhoneShell() {
  const { pathname, channel } = useChannel();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col gap-[14px] p-[14px] md:hidden">
      <Monitor className="shrink-0" contentClassName="flex items-center justify-between py-0">
        <span className="text-[13px] font-medium text-green-bright">
          {SITE_CONFIG.mark}
        </span>
        <span className="flex items-center gap-3">
          <span className="text-[13px] uppercase tracking-[0.05em] text-green-mid">
            CH.{channel.number}
          </span>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open channel menu"
              className="flex size-8 items-center justify-center text-green-mid"
            >
              <ListIcon size={20} />
            </SheetTrigger>
            {/* Full-screen, instant: a mode switch, not a drawer (§8.2).
                The stock transition is ease-in-out — banned (§11). */}
            <SheetContent
              side="left"
              showCloseButton
              className="h-full w-full max-w-none border-0 bg-bg-void !transition-none data-[side=left]:w-full data-[side=left]:sm:max-w-none"
            >
              <SheetTitle className="px-4 pt-6 text-[11px] uppercase tracking-[0.08em] text-text-muted">
                CHANNEL SELECT
              </SheetTitle>
              <nav aria-label="Channels" className="flex flex-col p-4">
                {CHANNELS.map((item) => {
                  const isActive = item.segment === channel.segment;
                  return (
                    <Link
                      key={item.number}
                      href={item.path}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex min-h-11 items-center gap-3 border-b border-green-dim/40 py-3 text-base uppercase tracking-[0.05em]",
                        isActive
                          ? "text-green-bright"
                          : "text-green-dim",
                      )}
                    >
                      <span className="text-[11px] text-text-muted">
                        {item.number}
                      </span>
                      {item.label}
                      {isActive ? (
                        <span aria-hidden className="ml-auto animate-cursor-blink">
                          ▮
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </span>
      </Monitor>

      <Monitor className="min-h-0 flex-1" contentClassName="h-full overflow-y-auto p-3">
        <ChannelSwitch switchKey={pathname} severity="full">
          <main>
            {channel.label === "HOME" && <HomePhone />}
            {channel.label === "ABOUT" && <AboutPhone />}
            {channel.label === "STATISTICS" && <StatisticsPhone />}
            {channel.label === "PROJECTS" && <ProjectsPhone />}
            {channel.label === "CONTACT" && <ContactSection />}
          </main>
        </ChannelSwitch>
      </Monitor>
    </div>
  );
}
