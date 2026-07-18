"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Clock } from "@/components/shell/clock";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function timestamp(): string {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const emptySubscribe = () => () => {};

/**
 * §5.5 — the system bus. No monitor chassis, one line, hidden on phones.
 * Keeps a rolling in-memory log but renders only the latest line. The
 * hydration gate (server snapshot false) keeps Date out of SSR markup;
 * after that, route lines are appended via render-phase state adjustment.
 */
export function LogStrip() {
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [log, setLog] = useState<{ path: string | null; lines: string[] }>({
    path: null,
    lines: [],
  });
  if (hydrated && log.path !== pathname) {
    setLog({
      path: pathname,
      lines: [...log.lines.slice(-49), `[${timestamp()}] ROUTE → ${pathname}`],
    });
  }
  const latest = log.lines[log.lines.length - 1];

  return (
    <div className="col-span-3 hidden items-center justify-between gap-4 overflow-hidden whitespace-nowrap text-[11px] text-text-muted md:flex">
      <span className="truncate">{latest ?? "[--:--:--] SYSTEM IDLE"}</span>
      <span className="flex shrink-0 items-center gap-4">
        <span>VIEWS: ---</span>
        <Clock />
      </span>
    </div>
  );
}
