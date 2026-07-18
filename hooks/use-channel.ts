"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { channelForSegment, type Channel } from "@/lib/site-config";

/**
 * Derives the active channel from the URL and remembers the previous
 * pathname so surfaces can tell a channel change (full CRT effect) from
 * a sub-view change (light effect) — §4's severity tiers.
 */
export function useChannel(): {
  pathname: string;
  channel: Channel;
  channelChanged: boolean;
} {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const channel = channelForSegment(segment);

  const prevPathnameRef = useRef(pathname);
  const prevSegment = prevPathnameRef.current.split("/")[1] ?? "";
  const channelChanged = prevSegment !== segment;

  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return { pathname, channel, channelChanged };
}
