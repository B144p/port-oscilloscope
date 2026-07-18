"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Clock } from "@/components/shell/clock";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function timestamp(): string {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/**
 * §5.5 — the system bus. No monitor chassis, one line, hidden on phones.
 * Keeps a rolling in-memory log but renders only the latest line.
 */
export function LogStrip() {
  const pathname = usePathname();
  const logRef = useRef<string[]>([]);
  const [latest, setLatest] = useState<string | null>(null);

  useEffect(() => {
    const line = `[${timestamp()}] ROUTE → ${pathname}`;
    logRef.current = [...logRef.current.slice(-49), line];
    setLatest(line);
  }, [pathname]);

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
