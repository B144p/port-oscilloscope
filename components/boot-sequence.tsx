"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ALL_QUERIES } from "@/lib/queries";

const BOOT_LINES = [
  "INITIALIZING OSCILLOSCOPE INTERFACE...",
  "ESTABLISHING LINK TO PORT-SERVER...",
  "FETCHING DATA VAULT...",
  "LINK ESTABLISHED.",
];

/** §6.1 cap: never hold the UI longer than this, even on slow fetches. */
const BOOT_CAP_MS = 1200;
const BOOTED_FLAG = "pc-booted";

/**
 * §6.1 — a genuine loading state: the boot log is paced by the real
 * prefetch of every section's data, so after it finishes every channel
 * switch hits warm cache. Renders nothing on the server (sessionStorage
 * is only read after mount) and never replays in-session.
 */
export function BootSequence() {
  const queryClient = useQueryClient();
  const [phase, setPhase] = useState<"idle" | "booting" | "done">("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    const prefetch = () =>
      Promise.allSettled(
        ALL_QUERIES.map((query) => queryClient.prefetchQuery(query)),
      );

    if (sessionStorage.getItem(BOOTED_FLAG)) {
      // Warm the cache silently on in-session reloads.
      prefetch();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only sessionStorage gate, runs once
      setPhase("done");
      return;
    }

    setPhase("booting");

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      sessionStorage.setItem(BOOTED_FLAG, "1");
      setPhase("done");
    };

    // Reveal lines while the prefetch runs; the cap guarantees fall-through
    // to per-section states if the backend is slow (§6.1).
    const lineInterval = setInterval(() => {
      setVisibleLines((n) => Math.min(n + 1, BOOT_LINES.length));
    }, 220);

    const capTimer = setTimeout(finish, BOOT_CAP_MS);
    prefetch().then(finish);

    // Skippable on any keypress or click.
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);

    return () => {
      clearInterval(lineInterval);
      clearTimeout(capTimer);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [queryClient]);

  if (phase !== "booting") return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-bg-void">
      <div className="flex w-full max-w-md flex-col gap-2 p-8 text-[13px] text-green-mid">
        {BOOT_LINES.slice(0, visibleLines + 1).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p aria-hidden className="animate-cursor-blink">
          ▮
        </p>
      </div>
    </div>
  );
}
