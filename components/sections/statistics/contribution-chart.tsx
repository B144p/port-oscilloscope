"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EmptyState } from "@/components/states";
import { formatDayLabel, formatHours, MONTHS } from "@/lib/format";
import type { Contribution, Statistic } from "@/lib/types";
import { cn } from "@/lib/utils";

const WEEKS = 53;
/** Sun..Sat — sparse GitHub-style weekday labels. */
const WEEKDAY_LABELS = ["", "M", "", "W", "", "F", ""];
/** index = level (0-4); null = no fill (empty cell). */
const LEVEL_FILL_VARS: Array<string | null> = [
  null,
  "--green-dim",
  "--green-mid",
  "--green-bright",
  "--green-bright",
];

interface DayCell {
  key: string;
  date: Date;
  totalSeconds: number;
  level: 0 | 1 | 2 | 3 | 4;
  isFuture: boolean;
}

function truncateToUTCDate(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function addUTCDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

/** Safe since `d` is always UTC-midnight. */
function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function resolveAnchor(contributions: Contribution[]): Date {
  const today = truncateToUTCDate(new Date());
  if (!contributions.length) return today;
  const latest = truncateToUTCDate(
    new Date(contributions[contributions.length - 1].date * 1000),
  );
  return latest.getTime() > today.getTime() ? latest : today;
}

/** Builds a full 53×7 grid, filling backend gaps with 0 seconds. */
function buildCells(contributions: Contribution[]): DayCell[] {
  const anchor = resolveAnchor(contributions);
  const byDay = new Map<string, number>();
  for (const c of contributions) {
    byDay.set(dateKey(truncateToUTCDate(new Date(c.date * 1000))), c.totalSeconds);
  }

  const endOfWeek = addUTCDays(anchor, 6 - anchor.getUTCDay());
  const lastSunday = addUTCDays(endOfWeek, -6);
  const gridStart = addUTCDays(lastSunday, -7 * (WEEKS - 1));

  const cells: DayCell[] = [];
  for (let i = 0; i < WEEKS * 7; i++) {
    const date = addUTCDays(gridStart, i);
    const key = dateKey(date);
    cells.push({
      key,
      date,
      totalSeconds: byDay.get(key) ?? 0,
      level: 0,
      isFuture: date.getTime() > anchor.getTime(),
    });
  }
  return cells;
}

function quantile(sortedAsc: number[], q: number): number {
  if (sortedAsc.length === 1) return sortedAsc[0];
  const pos = (sortedAsc.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  const next = sortedAsc[base + 1];
  return next === undefined
    ? sortedAsc[base]
    : sortedAsc[base] + rest * (next - sortedAsc[base]);
}

/** Levels are quartiles of active days, not fixed hour thresholds — adapts to the actual data. */
function computeLevelFn(cells: DayCell[]): (totalSeconds: number) => 0 | 1 | 2 | 3 | 4 {
  const nonZero = cells
    .filter((c) => c.totalSeconds > 0)
    .map((c) => c.totalSeconds)
    .sort((a, b) => a - b);

  if (nonZero.length === 0) return () => 0;

  const q25 = quantile(nonZero, 0.25);
  const q50 = quantile(nonZero, 0.5);
  const q75 = quantile(nonZero, 0.75);

  return (totalSeconds) => {
    if (totalSeconds <= 0) return 0;
    if (totalSeconds <= q25) return 1;
    if (totalSeconds <= q50) return 2;
    if (totalSeconds <= q75) return 3;
    return 4;
  };
}

function buildGrid(contributions: Contribution[]) {
  const raw = buildCells(contributions);
  const levelFor = computeLevelFn(raw);
  const cells = raw.map((c) => ({ ...c, level: levelFor(c.totalSeconds) }));

  const weeks: DayCell[][] = [];
  for (let w = 0; w < WEEKS; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));

  let prevMonth = -1;
  const monthLabels = weeks.map((week) => {
    const month = week[0].date.getUTCMonth();
    if (month === prevMonth) return "";
    prevMonth = month;
    return MONTHS[month];
  });

  return { weeks, monthLabels };
}

function unixSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

function Cell({
  cell,
  isHovered,
  onHover,
  onLeave,
}: {
  cell: DayCell;
  isHovered: boolean;
  onHover: (cell: DayCell) => void;
  onLeave: () => void;
}) {
  if (cell.isFuture) return <span aria-hidden className="size-[11px]" />;

  const fillVar = LEVEL_FILL_VARS[cell.level];
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(cell)}
      onFocus={() => onHover(cell)}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      aria-label={`${formatDayLabel(unixSeconds(cell.date))} — ${formatHours(cell.totalSeconds)}`}
      className={cn(
        "size-[11px] rounded-[2px]",
        cell.level === 0 && "border border-green-dim/20 bg-bg-raised",
        isHovered && "ring-1 ring-green-bright",
      )}
      style={
        fillVar
          ? {
              background: `var(${fillVar})`,
              boxShadow: cell.level === 4 ? "0 0 4px 0 var(--green-glow)" : undefined,
            }
          : undefined
      }
    />
  );
}

export function ContributionChart({ statistic }: { statistic: Statistic }) {
  const [hovered, setHovered] = useState<DayCell | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { weeks, monthLabels } = useMemo(
    () => buildGrid(statistic.contributions),
    [statistic.contributions],
  );
  const totalSecondsInView = useMemo(
    () => statistic.contributions.reduce((sum, c) => sum + c.totalSeconds, 0),
    [statistic.contributions],
  );

  // Grid reads oldest → newest left-to-right; open scrolled to the current week.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  if (!statistic.contributions.length) return <EmptyState />;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium text-green-bright">CONTRIBUTIONS</h2>
      <p className="text-[13px] uppercase tracking-[0.05em] text-text-muted">
        {formatHours(totalSecondsInView)} logged in the last year
      </p>

      <div ref={scrollRef} className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          <div className="ml-4 grid grid-cols-[repeat(53,11px)] gap-[2px]">
            {monthLabels.map((label, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-[0.05em] text-text-muted"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="grid grid-rows-7 gap-[2px] pr-1 text-[10px] uppercase tracking-[0.05em] text-text-muted">
              {WEEKDAY_LABELS.map((l, i) => (
                <span key={i} className="h-[11px] leading-[11px]">
                  {l}
                </span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[2px]">
              {weeks.flatMap((week) =>
                week.map((cell) => (
                  <Cell
                    key={cell.key}
                    cell={cell}
                    isHovered={hovered?.key === cell.key}
                    onHover={setHovered}
                    onLeave={() => setHovered(null)}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] uppercase tracking-[0.05em]">
        {hovered ? (
          <>
            <span className="text-green-bright">
              {formatDayLabel(unixSeconds(hovered.date))}
            </span>
            <span className="ml-2 text-green-mid">
              {formatHours(hovered.totalSeconds)}
            </span>
          </>
        ) : (
          <span className="text-text-muted">HOVER OR FOCUS A CELL FOR DETAIL</span>
        )}
      </p>

      <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.05em] text-text-muted">
        <span>LESS</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span
            key={level}
            aria-hidden
            className={cn(
              "size-[11px] rounded-[2px]",
              level === 0 && "border border-green-dim/20 bg-bg-raised",
            )}
            style={
              LEVEL_FILL_VARS[level]
                ? {
                    background: `var(${LEVEL_FILL_VARS[level]})`,
                    boxShadow: level === 4 ? "0 0 4px 0 var(--green-glow)" : undefined,
                  }
                : undefined
            }
          />
        ))}
        <span>MORE</span>
      </div>
    </div>
  );
}
