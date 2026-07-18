"use client";

/** §6.2 — every section renders one of these three states or content. */

export function LoadingState() {
  return (
    <div className="flex flex-col gap-1 text-[13px] text-text-muted">
      <p>FETCHING DATA VAULT...</p>
      <p className="animate-pulse">AWAITING RESPONSE ▮</p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-[13px] uppercase tracking-[0.05em] text-red-alert">
        LINK FAILURE // RETRY
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="border border-red-alert px-3 py-1 text-[11px] uppercase tracking-[0.05em] text-red-alert hover:bg-red-alert/10"
      >
        [ RETRY ]
      </button>
    </div>
  );
}

export function EmptyState({ label = "NO DATA // MODULE OFFLINE" }: { label?: string }) {
  return (
    <div className="flex h-full min-h-32 items-center justify-center rounded-lg border border-green-dim">
      <p className="text-[13px] uppercase tracking-[0.05em] text-text-muted">
        {label} <span className="animate-pulse">▮</span>
      </p>
    </div>
  );
}
