"use client";

import { useSyncExternalStore } from "react";

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

function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/**
 * §5.5 — machine-timezone clock. useSyncExternalStore renders the
 * server snapshot (null → placeholder) during SSR/hydration, so no
 * Date ever reaches server markup — the classic mismatch here.
 */
export function Clock() {
  const seconds = useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );

  return (
    <span className="tabular-nums">
      {seconds !== null ? formatClock(new Date(seconds * 1000)) : "--:--:-- GMT+0"}
    </span>
  );
}
