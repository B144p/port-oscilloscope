import { cn } from "@/lib/utils";

export interface ReadoutField {
  label: string;
  value: React.ReactNode;
}

/**
 * §7 — "labeled field list + description", shared by projects, education,
 * and experience. The fixed-width label column is what makes it read as an
 * instrument readout instead of a card.
 */
export function DataReadout({
  title,
  fields,
  children,
  className,
}: {
  title?: string;
  fields: ReadoutField[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {title ? (
        <h2 className="text-2xl font-medium text-green-bright">{title}</h2>
      ) : null}
      <dl className="grid grid-cols-[12ch_1fr] gap-x-4 gap-y-2">
        {fields.map((field) => (
          <div key={field.label} className="contents">
            <dt className="text-[11px] uppercase tracking-[0.05em] leading-6 text-text-muted">
              {field.label}
            </dt>
            <dd className="text-[13px] leading-6 text-green-mid">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
      {children ? (
        <div className="max-w-[70ch] text-[13px] leading-[1.6] text-green-mid">
          {children}
        </div>
      ) : null}
    </div>
  );
}
