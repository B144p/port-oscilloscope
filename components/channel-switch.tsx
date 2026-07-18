"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * §4 — the signature interaction. Changing `switchKey` remounts the
 * subtree and replays the CRT sequence. `severity` picks the tier
 * (full ~300ms with static window, light ~120ms blip); `delayMs`
 * staggers monitors so they don't lock in unison (§4.2).
 *
 * The very first app render never animates — booting into a static
 * burst reads as a glitch, not an effect.
 */
export function ChannelSwitch({
  switchKey,
  severity,
  delayMs = 0,
  className,
  children,
}: {
  switchKey: string;
  severity: "full" | "light";
  delayMs?: number;
  className?: string;
  children: React.ReactNode;
}) {
  // The very first key never animates; any later key change does — even
  // navigating back to the initial key. Render-phase state adjustment
  // instead of a ref: refs must not be read during render.
  const [initialKey] = useState(switchKey);
  const [everChanged, setEverChanged] = useState(false);
  if (!everChanged && switchKey !== initialKey) {
    setEverChanged(true);
  }

  return (
    <Keyed
      key={switchKey}
      animate={everChanged || switchKey !== initialKey}
      severity={severity}
      delayMs={delayMs}
      className={className}
    >
      {children}
    </Keyed>
  );
}

function Keyed({
  animate,
  severity,
  delayMs,
  className,
  children,
}: {
  animate: boolean;
  severity: "full" | "light";
  delayMs: number;
  className?: string;
  children: React.ReactNode;
}) {
  // Captured once at mount: later parent re-renders (without a key
  // change) must never restart or newly trigger the animation.
  const [animation] = useState(() =>
    animate ? (severity === "full" ? "animate-crt-full" : "animate-crt-light") : null,
  );
  const [running, setRunning] = useState(animation !== null);

  return (
    <div className={cn("relative h-full", className)}>
      <div
        className={cn("h-full", animation)}
        style={
          running
            ? {
                animationDelay: `${delayMs}ms`,
                willChange: "transform, filter",
                transformOrigin: "center",
              }
            : undefined
        }
        onAnimationEnd={() => setRunning(false)}
      >
        {children}
      </div>
      {animation === "animate-crt-full" && running ? (
        <div
          aria-hidden
          className="animate-crt-noise pointer-events-none absolute inset-0 hidden md:block"
          style={{
            animationDelay: `${delayMs}ms`,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(102,255,153,0.25) 0px, rgba(102,255,153,0.25) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(51,204,102,0.12) 0px, rgba(51,204,102,0.12) 2px, transparent 2px, transparent 5px)",
          }}
        />
      ) : null}
    </div>
  );
}
