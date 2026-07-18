"use client";

import Link from "next/link";
import { Monitor } from "@/components/monitor";
import { useChannel } from "@/hooks/use-channel";
import { CHANNELS, SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * §5.2 — channel selector. Content never changes, so it never runs the
 * channel-switch effect; the active row re-keys for an 80ms flicker only.
 * On tablet (§8.1) it collapses to a 56px icon rail with a custom
 * sharp-cornered tooltip — labels return at xl.
 */
export function LeftNav() {
  const { channel: active } = useChannel();

  return (
    <Monitor allowOverflow contentClassName="flex flex-col justify-between p-0 xl:p-0">
      <nav aria-label="Channels">
        <ul>
          {CHANNELS.map((channel) => {
            const isActive = channel.segment === active.segment;
            const Icon = channel.icon;
            return (
              <li key={channel.number} className="border-b border-green-dim/40">
                <Link
                  href={channel.path}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center justify-center gap-3 px-0 py-3 text-[13px] uppercase tracking-[0.05em] xl:justify-start xl:px-3",
                    isActive
                      ? "animate-row-flicker border-l-2 border-l-green-bright bg-bg-raised text-green-bright"
                      : "border-l-2 border-l-transparent text-green-dim hover:text-green-mid",
                  )}
                >
                  <Icon size={16} aria-hidden className="xl:hidden" />
                  <span className="hidden text-[11px] text-text-muted xl:inline">
                    {channel.number}
                  </span>
                  <span className="hidden xl:inline">{channel.label}</span>
                  {isActive ? (
                    <span
                      aria-hidden
                      className="ml-auto hidden animate-cursor-blink xl:inline"
                    >
                      ▮
                    </span>
                  ) : null}
                  {/* §8.1 custom tooltip — rail only, sharp corners, no library */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-green-dim bg-bg-raised px-2 py-1 text-[11px] text-green-mid group-hover:block xl:group-hover:hidden"
                  >
                    {channel.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="hidden flex-col gap-1 px-3 pb-3 text-[11px] uppercase tracking-[0.05em] text-text-muted xl:flex">
        <span>CLEARANCE: {SITE_CONFIG.clearance}</span>
        <span>BUILD: {SITE_CONFIG.build}</span>
      </div>
    </Monitor>
  );
}
