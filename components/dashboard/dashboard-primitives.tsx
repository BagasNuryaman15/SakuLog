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

export function WireframeSparkline({ className, tone = "cyan" }: { className?: string; tone?: AccentTone }) {
  const toneClass: Record<AccentTone, string> = {
    cyan: "border-cyan-100/26 bg-cyan-950/[0.08]",
    violet: "border-[#B36BFF]/30 bg-[#2B0F6B]/[0.14]",
    magenta: "border-fuchsia-100/26 bg-[#BA319F]/[0.1]"
  };
  const strokeClass: Record<AccentTone, string> = {
    cyan: "border-t-[rgba(34,211,238,0.78)] shadow-[0_0_14px_rgba(34,211,238,0.18)]",
    violet: "border-t-[rgba(176,64,255,0.82)] shadow-[0_0_16px_rgba(176,64,255,0.2)]",
    magenta: "border-t-[rgba(236,72,153,0.76)] shadow-[0_0_14px_rgba(236,72,153,0.18)]"
  };

  return (
    <div className={cn("flex h-11 items-end gap-1 rounded-sm border-b pb-2", toneClass[tone], className)}>
      {[25, 18, 36, 28, 54, 34, 48, 30].map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={cn(
            "block w-full border-t",
            index % 3 === 1 ? "border-t-slate-300/34" : strokeClass[tone]
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
