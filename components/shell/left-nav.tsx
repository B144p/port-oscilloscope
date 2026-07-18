"use client";

import Link from "next/link";
import { Monitor } from "@/components/monitor";
import { useChannel } from "@/hooks/use-channel";
import { CHANNELS, SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * §5.2 — channel selector. Content never changes, so it never runs the
 * channel-switch effect; the active row re-keys for an 80ms flicker only.
 */
export function LeftNav() {
  const { channel: active } = useChannel();

  return (
    <Monitor contentClassName="flex flex-col justify-between p-0 xl:p-0">
      <nav aria-label="Channels">
        <ul>
          {CHANNELS.map((channel) => {
            const isActive = channel.segment === active.segment;
            return (
              <li
                key={channel.number}
                className="border-b border-green-dim/40"
              >
                <Link
                  href={channel.path}
                  aria-current={isActive ? "page" : undefined}
                  // Re-keying the active row restarts the flicker animation
                  // on each selection (§5.2).
                  {...(isActive ? { "data-flicker-key": active.segment } : {})}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 text-[13px] uppercase tracking-[0.05em]",
                    isActive
                      ? "animate-row-flicker border-l-2 border-l-green-bright bg-bg-raised text-green-bright"
                      : "border-l-2 border-l-transparent text-green-dim hover:text-green-mid",
                  )}
                >
                  <span className="text-[11px] text-text-muted">
                    {channel.number}
                  </span>
                  <span>{channel.label}</span>
                  {isActive ? (
                    <span aria-hidden className="ml-auto animate-cursor-blink">
                      ▮
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col gap-1 px-3 pb-3 text-[11px] uppercase tracking-[0.05em] text-text-muted">
        <span>CLEARANCE: {SITE_CONFIG.clearance}</span>
        <span>BUILD: {SITE_CONFIG.build}</span>
      </div>
    </Monitor>
  );
}
