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
      area: "rgba(45,212,191,0.1)",
      glow: "rgba(45,212,191,0.22)",
      line: "#5EEAD4",
      surface: "bg-transparent"
    },
    violet: {
      area: "rgba(176,64,255,0.1)",
      glow: "rgba(176,64,255,0.22)",
      line: "#B36BFF",
      surface: "bg-transparent"
    },
    magenta: {
      area: "rgba(244,114,182,0.085)",
      glow: "rgba(244,114,182,0.2)",
      line: "#F9A8D4",
      surface: "bg-transparent"
    },
    blueViolet: {
      area: "rgba(129,140,248,0.09)",
      glow: "rgba(129,140,248,0.2)",
      line: "#A5B4FC",
      surface: "bg-transparent"
    }
  };
  const colors = toneClass[tone];
  const hasRealSeries = Boolean(values?.length);
  const linePath = hasRealSeries
    ? buildSparklinePath(values)
    : "M0 30 C32 29.5 45 30.5 62 30 C86 29.5 102 30.4 126 30 C148 29.6 164 30.3 180 30";
  const areaOpacity = hasRealSeries ? 1 : 0.2;
  const glowOpacity = hasRealSeries ? 1 : 0.34;
  const lineOpacity = hasRealSeries ? 1 : 0.52;

  return (
    <div className={cn("h-11 overflow-hidden", colors.surface, className)} aria-hidden="true">
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
