import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  blockToneClass,
  cardClass,
  lineClass,
  lineToneClass,
  type AccentTone,
  type BlockTone,
  type LineTone
} from "./dashboard-style-tokens";

export function ZoneLabel({ children }: { children: string }) {
  return <p className="text-xs font-semibold uppercase tracking-normal text-slate-300/88">{children}</p>;
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
    <div className={cn("relative rounded-md border border-violet-200/22 bg-violet-300/[0.04]", className)}>
      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-violet-200/28" />
      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-cyan-200/24" />
    </div>
  );
}

export function WireframeDonut() {
  return (
    <div className="relative h-24 w-24 rounded-full border border-violet-200/32 bg-[conic-gradient(from_120deg,rgba(34,211,238,0.58)_0_18%,rgba(139,92,246,0.54)_18%_48%,rgba(217,70,239,0.52)_48%_72%,rgba(26,38,64,0.36)_72%_100%)] p-[1px] shadow-[0_0_26px_rgba(139,92,246,0.12),0_0_18px_rgba(34,211,238,0.06)]">
      <div className="relative h-full w-full rounded-full bg-[rgba(5,13,28,0.86)]">
        <div className="absolute inset-5 rounded-full border border-cyan-200/24 bg-[rgba(3,7,18,0.7)]" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-violet-200/24" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-cyan-200/22" />
        <span className="absolute bottom-0 left-1/2 h-1/2 w-px origin-top -rotate-45 bg-fuchsia-200/22" />
      </div>
    </div>
  );
}

export function WireframeSparkline({ className, tone = "cyan" }: { className?: string; tone?: AccentTone }) {
  const toneClass: Record<AccentTone, string> = {
    cyan: "border-cyan-100/24 bg-cyan-950/[0.08]",
    violet: "border-violet-100/24 bg-violet-950/[0.08]",
    magenta: "border-fuchsia-100/24 bg-fuchsia-950/[0.08]"
  };
  const strokeClass: Record<AccentTone, string> = {
    cyan: "border-t-[rgba(34,211,238,0.72)] shadow-[0_0_14px_rgba(34,211,238,0.18)]",
    violet: "border-t-[rgba(139,92,246,0.7)] shadow-[0_0_14px_rgba(139,92,246,0.18)]",
    magenta: "border-t-[rgba(217,70,239,0.7)] shadow-[0_0_14px_rgba(217,70,239,0.18)]"
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
