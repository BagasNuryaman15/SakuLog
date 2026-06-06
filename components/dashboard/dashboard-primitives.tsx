import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  blockToneClass,
  cardClass,
  lineClass,
  lineToneClass,
  sectionLabel,
  type AccentTone,
  type BlockTone,
  type LineTone
} from "./dashboard-style-tokens";

export function ZoneLabel({ children, className }: { children: string; className?: string }) {
  return <p className={cn(sectionLabel, className)}>{children}</p>;
}

export function WireframeCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(cardClass, className)}>{children}</div>;
}

export function WireframeBlock({ className, tone = "default" }: { className?: string; tone?: BlockTone }) {
  return (
    <div
      className={cn(
        "rounded-md border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        blockToneClass[tone],
        className
      )}
    />
  );
}

export function WireframeLine({
  className,
  width,
  tone = "default"
}: {
  className?: string;
  width?: string;
  tone?: LineTone;
}) {
  return <span className={cn("block", lineClass, lineToneClass[tone], className)} style={width ? { width } : undefined} />;
}

export function WireframeLines({
  widths,
  className,
  thin = false,
  tone = "default"
}: {
  widths: string[];
  className?: string;
  thin?: boolean;
  tone?: LineTone;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {widths.map((width, index) => (
        <WireframeLine key={`${width}-${index}`} className={cn(thin && "h-1.5")} tone={tone} width={width} />
      ))}
    </div>
  );
}

export function WireframeImageBox({ className }: { className?: string }) {
  return (
    <div className={cn("relative rounded-md border border-[#B36BFF]/30 bg-[#7B00D4]/[0.08]", className)}>
      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-[#D8B4FE]/36" />
      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-cyan-200/24" />
    </div>
  );
}

export function WireframeDonut() {
  return (
    <div className="relative h-24 w-24 rounded-full border border-[#B36BFF]/38 bg-[conic-gradient(from_120deg,rgba(176,64,255,0.76)_0_24%,rgba(236,72,153,0.6)_24%_50%,rgba(34,211,238,0.55)_50%_70%,rgba(59,41,90,0.52)_70%_100%)] p-[1px] shadow-[0_0_28px_rgba(176,64,255,0.18),0_0_18px_rgba(34,211,238,0.06)]">
      <div className="relative h-full w-full rounded-full bg-[rgba(16,7,37,0.9)]">
        <div className="absolute inset-5 rounded-full border border-[#B36BFF]/24 bg-[rgba(10,10,10,0.7)]" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-[#D8B4FE]/26" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-cyan-200/22" />
        <span className="absolute bottom-0 left-1/2 h-1/2 w-px origin-top -rotate-45 bg-fuchsia-200/26" />
      </div>
    </div>
  );
}

export function WireframeSparkline({
  className,
  tone = "cyan",
  values
}: {
  className?: string;
  tone?: AccentTone;
  values?: number[];
}) {
  const toneClass: Record<AccentTone, { area: string; glow: string; line: string; surface: string }> = {
    cyan: {
      area: "rgba(34,211,238,0.13)",
      glow: "rgba(34,211,238,0.28)",
      line: "#67E8F9",
      surface: "border-cyan-100/22 bg-cyan-950/[0.08]"
    },
    violet: {
      area: "rgba(176,64,255,0.14)",
      glow: "rgba(176,64,255,0.3)",
      line: "#B36BFF",
      surface: "border-[#B36BFF]/26 bg-[#2B0F6B]/[0.13]"
    },
    magenta: {
      area: "rgba(236,72,153,0.13)",
      glow: "rgba(236,72,153,0.28)",
      line: "#F472B6",
      surface: "border-fuchsia-100/22 bg-[#BA319F]/[0.1]"
    }
  };
  const colors = toneClass[tone];
  const hasRealSeries = Boolean(values?.length);
  const linePath = hasRealSeries
    ? buildSparklinePath(values)
    : "M0 30 C26 29 30 31 48 29 C72 27 84 31 108 29 C132 27 146 30 180 28";
  const areaOpacity = hasRealSeries ? 1 : 0.38;
  const glowOpacity = hasRealSeries ? 1 : 0.34;
  const lineOpacity = hasRealSeries ? 1 : 0.46;

  return (
    <div className={cn("h-11 overflow-hidden rounded-sm border-b", colors.surface, className)} aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 180 44" preserveAspectRatio="none">
        <path d={`${linePath} L180 44 L0 44 Z`} fill={colors.area} opacity={areaOpacity} />
        <path d={linePath} fill="none" opacity={glowOpacity} stroke={colors.glow} strokeLinecap="round" strokeWidth="5" />
        <path d={linePath} fill="none" opacity={lineOpacity} stroke={colors.line} strokeLinecap="round" strokeWidth="2.4" />
      </svg>
    </div>
  );
}

function buildSparklinePath(values: number[] | undefined) {
  const series = values?.length ? values : [0];
  const maxValue = Math.max(...series, 0);
  const minValue = Math.min(...series, 0);
  const range = Math.max(maxValue - minValue, 1);
  const width = 180;
  const minY = 10;
  const maxY = 34;
  const points = series.map((value, index) => {
    const x = series.length === 1 ? width : (index / (series.length - 1)) * width;
    const y = maxY - ((value - minValue) / range) * (maxY - minY);

    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });

  return `M${points.join(" L")}`;
}
