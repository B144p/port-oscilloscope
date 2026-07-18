"use client";

import { useQuery } from "@tanstack/react-query";
import { ErrorState, LoadingState } from "@/components/states";
import { aboutMeQuery } from "@/lib/queries";
import { SITE_CONFIG } from "@/lib/site-config";

export function HomeSection() {
  const { data, isPending, isError, refetch } = useQuery(aboutMeQuery);

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <h1 className="text-5xl font-medium tracking-tight text-green-bright xl:text-6xl">
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
