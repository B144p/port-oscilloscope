import { cn } from "@/lib/utils";

/**
 * §1.1 — the shared chassis used by header, left nav, body, and right
 * sidebar. The log strip is the bus, not a monitor: it never uses this.
 */
export function Monitor({
  title,
  className,
  contentClassName,
  allowOverflow = false,
  children,
}: {
  title?: string;
  className?: string;
  contentClassName?: string;
  /** The tablet rail's hover tooltips must escape the bezel (§8.1). */
  allowOverflow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "monitor-chassis monitor-ticks relative flex min-h-0 flex-col rounded-lg border border-green-dim",
        allowOverflow ? "overflow-visible" : "overflow-hidden",
        className,
      )}
    >
      <span aria-hidden className="monitor-ticks-b absolute inset-0 pointer-events-none" />
      {title ? (
        <div className="flex h-6 shrink-0 items-center border-b border-green-dim px-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-green-mid">
            {title}
          </span>
        </div>
      ) : null}
      <div className={cn("min-h-0 flex-1 p-3 xl:p-4", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
