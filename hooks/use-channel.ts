"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { channelForSegment, type Channel } from "@/lib/site-config";

function segmentOf(pathname: string): string {
  return pathname.split("/")[1] ?? "";
}

/**
 * Derives the active channel from the URL and remembers the previous
 * pathname so surfaces can tell a channel change (full CRT effect) from
 * a sub-view change (light effect) — §4's severity tiers.
 *
 * Previous-pathname tracking uses the render-phase state-adjustment
 * pattern (not a ref): refs must not be read during render.
 */
export function useChannel(): {
  pathname: string;
  channel: Channel;
  channelChanged: boolean;
} {
  const pathname = usePathname();
  const segment = segmentOf(pathname);
  const channel = channelForSegment(segment);

  const [nav, setNav] = useState({ pathname, changed: false });
  if (nav.pathname !== pathname) {
    setNav({ pathname, changed: segmentOf(nav.pathname) !== segment });
  }
  const channelChanged =
    nav.pathname === pathname ? nav.changed : segmentOf(nav.pathname) !== segment;

  return { pathname, channel, channelChanged };
}
