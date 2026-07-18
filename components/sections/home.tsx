"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorState, LoadingState } from "@/components/states";
import { aboutMeQuery } from "@/lib/queries";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function HomeSection() {
  const { data, isPending, isError, refetch } = useQuery(aboutMeQuery);
  // §5.4 — typewriter reveal on first load only. sessionStorage is
  // read after mount; SSR and replays render the handle statically.
  const [typewriter, setTypewriter] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("pc-typed")) {
      sessionStorage.setItem("pc-typed", "1");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only sessionStorage gate, runs once
      setTypewriter(true);
    }
  }, []);

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <h1
        className={cn(
          "overflow-hidden whitespace-nowrap text-5xl font-medium tracking-tight text-green-bright xl:text-6xl",
          typewriter && "animate-typewriter",
        )}
        style={
          typewriter
            ? ({
                "--typewriter-width": `${SITE_CONFIG.handle.length}ch`,
                animation: `typewriter 1.2s steps(${SITE_CONFIG.handle.length}) both`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {SITE_CONFIG.handle}
      </h1>
      {isPending ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <p className="max-w-[70ch] text-base leading-[1.6] text-green-mid">
          {SITE_CONFIG.role}
        </p>
      )}
      <p className="text-[11px] uppercase tracking-[0.05em] text-text-muted">
        {data ? "SIG: NOMINAL // ALL MODULES RESPONDING" : null}
      </p>
    </div>
  );
}
