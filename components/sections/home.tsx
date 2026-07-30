"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorState, LoadingState } from "@/components/states";
import { useIdentity } from "@/hooks/use-identity";
import { aboutMeQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function HomeSection() {
  const { data, isPending, isError, refetch } = useQuery(aboutMeQuery);
  const { handle, role, isPending: identityPending } = useIdentity();
  // §5.4 — typewriter reveal on first load only. sessionStorage is
  // read after mount; SSR and replays render the handle statically.
  const [typewriter, setTypewriter] = useState(false);

  useEffect(() => {
    // Wait for about-me to settle so the step count matches the final handle.
    if (identityPending) return;
    if (sessionStorage.getItem("pc-typed")) return;
    sessionStorage.setItem("pc-typed", "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot sessionStorage gate, runs once identity settles
    setTypewriter(true);
  }, [identityPending]);

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <h1
        className={cn(
          "overflow-hidden whitespace-nowrap text-3xl font-medium tracking-tight text-green-bright sm:text-4xl md:text-5xl xl:text-6xl",
          typewriter && "animate-typewriter",
        )}
        style={
          typewriter
            ? ({
                "--typewriter-width": `${handle.length}ch`,
                animation: `typewriter 1.2s steps(${handle.length}) both`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {handle}
      </h1>
      {isPending ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <p className="max-w-[70ch] text-base leading-[1.6] text-green-mid">
          {role}
        </p>
      )}
      <p className="text-[11px] uppercase tracking-[0.05em] text-text-muted">
        {data ? "SIG: NOMINAL // ALL MODULES RESPONDING" : null}
      </p>
    </div>
  );
}
