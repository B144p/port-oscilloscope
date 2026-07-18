"use client";

import { Cell, Pie, PieChart, Sector } from "recharts";
import type { PieSectorShapeProps } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { formatHours, formatPercent } from "@/lib/format";
import type { OsStat } from "@/lib/types";

/** §5.4v2 — ring/bar fills reserve amber/red for status meaning elsewhere. */
export const OS_FILL_VARS = ["--green-bright", "--green-mid", "--green-dim"];

const chartConfig = { percent: { label: "Share" } };

const RADIAN = Math.PI / 180;

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
) {
  return {
    x: cx + radius * Math.cos(-RADIAN * angleDeg),
    y: cy + radius * Math.sin(-RADIAN * angleDeg),
  };
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const sweepFlag = startAngle > endAngle ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

/**
 * Two concentric rim arcs plus the two radial edges closing each segment —
 * an outlined bracket, unfilled. recharts' default Sector shape would trace
 * this same boundary, but only as a single filled/stroked wedge; building it
 * from primitives lets each edge stay a plain 1px stroke with no fill.
 */
function RingSegment(props: PieSectorShapeProps) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    isActive,
  } = props;
  if (
    cx === undefined ||
    cy === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    startAngle === undefined ||
    endAngle === undefined
  ) {
    return <g />;
  }
  const strokeWidth = isActive ? 2 : 1;
  return (
    <g>
      {/* invisible full-wedge hit area so hover/tooltip isn't limited to the 1px rims */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="transparent"
        stroke="none"
      />
      <path
        d={describeArc(cx, cy, outerRadius, startAngle, endAngle)}
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth}
      />
      <path
        d={describeArc(cx, cy, innerRadius, startAngle, endAngle)}
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth}
      />
      {[startAngle, endAngle].map((angle) => {
        const inner = polarToCartesian(cx, cy, innerRadius, angle);
        const outer = polarToCartesian(cx, cy, outerRadius, angle);
        return (
          <line
            key={angle}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke={fill}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
}

/** §5.4v2 — tooltip rebuilt in the monitor language; stock styling is banned. */
function OsDonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: { os: string; totalSeconds: number; percent: number };
  }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-green-dim bg-bg-raised px-2 py-1 text-[11px] uppercase tracking-[0.05em]">
      <span className="text-green-bright">{point.os}</span>
      <span className="ml-2 text-green-mid">
        {formatHours(point.totalSeconds)} · {formatPercent(point.percent)}
      </span>
    </div>
  );
}

export function OsDonut({ operatingSystems }: { operatingSystems: OsStat[] }) {
  const data = operatingSystems.map((os) => ({
    os: os.os.toUpperCase(),
    percent: os.percent,
    totalSeconds: os.totalSeconds,
  }));

  return (
    <div className="relative mx-auto aspect-square max-h-72 w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<OsDonutTooltip />}
            isAnimationActive={false}
          />
          <Pie
            data={data}
            dataKey="percent"
            nameKey="os"
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={450}
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={8}
            minAngle={2}
            shape={RingSegment}
            isAnimationActive={false}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.os}
                fill={`var(${OS_FILL_VARS[i % OS_FILL_VARS.length]})`}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[2em] uppercase tracking-[0.05em] text-green-mid">
        OS
      </span>
    </div>
  );
}
