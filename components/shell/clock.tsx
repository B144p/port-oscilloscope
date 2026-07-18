"use client";

import { useEffect, useState } from "react";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatClock(d: Date): string {
  const offsetHours = -d.getTimezoneOffset() / 60;
  const sign = offsetHours >= 0 ? "+" : "-";
  const offset = Number.isInteger(offsetHours)
    ? `${Math.abs(offsetHours)}`
    : `${Math.abs(offsetHours).toFixed(1)}`;
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} GMT${sign}${offset}`;
}

/**
 * §5.5 — machine-timezone clock. Renders a placeholder until mounted:
 * emitting Date.now() during SSR is a guaranteed hydration mismatch.
 */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">{now ? formatClock(now) : "--:--:-- GMT+0"}</span>
  );
}
