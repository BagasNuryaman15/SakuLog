"use client";

import { useEffect, useState, type ReactNode } from "react";

import {
  getDashboardSummary,
  getEmptyDashboardSummary,
  type DashboardSummary
} from "@/lib/reports/dashboard";
import { cn } from "@/lib/utils";

const shellClass =
  "w-full min-w-0 rounded-[1.5rem] border border-[rgba(125,163,255,0.18)] bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(135deg,rgba(5,13,28,0.82),rgba(6,17,31,0.68)_48%,rgba(9,11,31,0.72))] bg-[size:64px_64px,64px_64px,auto] p-0 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_22px_56px_rgba(0,0,0,0.18)]";
const cardClass =
  "min-w-0 rounded-[1.5rem] border border-[rgba(125,163,255,0.22)] bg-[linear-gradient(145deg,rgba(15,23,42,0.86),rgba(7,16,32,0.76))] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_18px_48px_rgba(0,0,0,0.22),0_0_32px_rgba(34,211,238,0.045)] backdrop-blur-[18px]";
const topbarClass =
  "border-[rgba(125,163,255,0.24)] bg-[linear-gradient(135deg,rgba(10,21,40,0.9),rgba(8,13,30,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_32px_rgba(0,0,0,0.2),0_0_30px_rgba(34,211,238,0.05)]";
const heroSurfaceClass =
  "border-[rgba(167,139,250,0.28)] bg-[radial-gradient(circle_at_72%_28%,rgba(99,102,241,0.24),transparent_34%),radial-gradient(circle_at_18%_12%,rgba(124,58,237,0.22),transparent_30%),linear-gradient(145deg,rgba(30,27,75,0.76),rgba(8,18,36,0.84))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_22px_56px_rgba(0,0,0,0.26),0_0_42px_rgba(139,92,246,0.09)]";
const nestedSurfaceClass =
  "border-[rgba(103,232,249,0.2)] bg-[linear-gradient(135deg,rgba(15,23,42,0.7),rgba(8,18,36,0.58))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_14px_32px_rgba(0,0,0,0.18)]";
const lineClass =
  "h-2 rounded-sm bg-[linear-gradient(90deg,rgba(203,213,225,0.42),rgba(148,163,184,0.28))] shadow-[0_0_18px_rgba(34,211,238,0.045)]";

type AccentTone = "cyan" | "violet" | "magenta";
type BlockTone = "default" | "primary" | "cta" | AccentTone;
type LineTone = "default" | "primary" | "muted" | AccentTone;

const blockToneClass: Record<BlockTone, string> = {
  default: "border-[rgba(148,163,184,0.2)] bg-[rgba(15,23,42,0.5)]",
  primary: "border-[rgba(203,213,225,0.24)] bg-[rgba(15,23,42,0.62)]",
  cta: "border-white/15 bg-[linear-gradient(135deg,#6366f1_0%,#8b5cf6_48%,#d946ef_100%)] shadow-[0_14px_32px_rgba(139,92,246,0.22),inset_0_1px_0_rgba(255,255,255,0.14)]",
  cyan: "border-[rgba(34,211,238,0.38)] bg-[rgba(34,211,238,0.1)] shadow-[0_0_18px_rgba(34,211,238,0.1)]",
  violet: "border-[rgba(139,92,246,0.36)] bg-[rgba(139,92,246,0.11)] shadow-[0_0_18px_rgba(139,92,246,0.1)]",
  magenta: "border-[rgba(217,70,239,0.34)] bg-[rgba(217,70,239,0.1)] shadow-[0_0_18px_rgba(217,70,239,0.1)]"
};

const lineToneClass: Record<LineTone, string> = {
  default: "bg-[linear-gradient(90deg,rgba(203,213,225,0.42),rgba(148,163,184,0.28))]",
  primary: "bg-[linear-gradient(90deg,rgba(226,232,240,0.52),rgba(148,163,184,0.32))]",
  muted: "bg-[linear-gradient(90deg,rgba(100,116,139,0.24),rgba(71,85,105,0.18))]",
  cyan: "bg-[linear-gradient(90deg,rgba(34,211,238,0.62),rgba(34,211,238,0.24))] shadow-[0_0_18px_rgba(34,211,238,0.16)]",
  violet: "bg-[linear-gradient(90deg,rgba(139,92,246,0.6),rgba(139,92,246,0.24))] shadow-[0_0_18px_rgba(139,92,246,0.14)]",
  magenta: "bg-[linear-gradient(90deg,rgba(217,70,239,0.58),rgba(217,70,239,0.22))] shadow-[0_0_18px_rgba(217,70,239,0.14)]"
};

export function Web3Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>(getEmptyDashboardSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadSummary() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getDashboardSummary();

        if (isActive) {
          setSummary(data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Gagal membaca ringkasan dashboard.");
          setSummary(getEmptyDashboardSummary());
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadSummary();

    return () => {
      isActive = false;
    };
  }, []);

  const dataHookIsPreserved = Boolean(summary) || isLoading || Boolean(error);

  return (
    <div className={shellClass} data-dashboard-data-hook={dataHookIsPreserved ? "preserved" : "idle"}>
      <WireframeTopBar />

      <section className="mt-4 grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(25.5rem,1.35fr)_minmax(22rem,0.95fr)_minmax(20rem,21.25rem)] xl:grid-rows-[auto_auto] xl:[grid-template-areas:'hero_kpis_right'_'cashflow_cashflow_right']">
        <WireframeHero />
        <WireframeKpis />

        <aside className="grid min-w-0 gap-4 xl:[grid-area:right] xl:grid-rows-[auto_auto_auto_minmax(0,1fr)]">
          <WireframeCategory />
          <WireframeMoneySignals />
          <WireframeMiniInsight />
          <WireframeRecentTransactions />
        </aside>

        <WireframeCashflowTrend />
      </section>
    </div>
  );
}

function WireframeTopBar() {
  return (
    <header className={cn(cardClass, topbarClass, "flex min-h-[4.75rem] flex-col justify-center px-5 py-3")}>
      <ZoneLabel>2. TOP BAR</ZoneLabel>
      <div className="mt-3 flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
        <WireframeBlock className="h-10 min-w-0 flex-1 lg:max-w-[30rem]" tone="primary" />
        <WireframeBlock className="h-10 w-full shrink-0 lg:w-40" tone="default" />
        <WireframeBlock className="h-10 w-11 shrink-0" tone="violet" />
        <WireframeBlock className="h-10 w-full shrink-0 lg:w-44" tone="cta" />
      </div>
    </header>
  );
}

function WireframeHero() {
  return (
    <WireframeCard className={cn(heroSurfaceClass, "h-[26rem] p-5 xl:[grid-area:hero]")}>
      <ZoneLabel>3. HERO</ZoneLabel>
      <div className="mt-6 grid h-[calc(100%-1.875rem)] min-w-0 grid-cols-[minmax(0,1fr)_7.75rem] gap-5">
        <div className="flex min-w-0 flex-col">
          <WireframeLine className="h-7 w-36" tone="primary" />
          <WireframeLines className="mt-7" widths={["72%", "64%"]} tone="primary" />
          <WireframeLines className="mt-8" widths={["62%", "54%", "46%"]} thin />

          <div className={cn(cardClass, nestedSurfaceClass, "mt-auto p-5")}>
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <WireframeLine className="w-36" tone="cyan" />
                <WireframeLine className="mt-4 h-3 w-[70%]" tone="primary" />
                <WireframeLine className="mt-4 h-2 w-[84%]" tone="muted" />
              </div>
              <WireframeBlock className="h-12 w-12 shrink-0" tone="violet" />
            </div>
          </div>
        </div>

        <WireframeImageBox className="mt-14 hidden h-44 lg:block" />
      </div>
    </WireframeCard>
  );
}

function WireframeKpis() {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:h-[26rem] xl:grid-rows-2 xl:[grid-area:kpis]">
      <WireframeKpi label="4. KPI 1" tone="cyan" />
      <WireframeKpi label="5. KPI 2" tone="magenta" />
      <WireframeKpi label="6. KPI 3" tone="violet" />
      <WireframeKpi label="7. KPI 4" tone="cyan" />
    </div>
  );
}

function WireframeKpi({ label, tone }: { label: string; tone: AccentTone }) {
  return (
    <WireframeCard className="flex h-[13rem] flex-col p-4 xl:h-full">
      <ZoneLabel>{label}</ZoneLabel>
      <WireframeBlock className="mt-4 h-9 w-9" tone={tone} />
      <WireframeLines className="mt-4" widths={["58%", "74%", "28%"]} tone="default" />
      <WireframeSparkline className="mt-auto" tone={tone} />
    </WireframeCard>
  );
}

function WireframeCategory() {
  return (
    <WireframeCard className="h-[14rem] p-4">
      <ZoneLabel>8. EXPENSE BY CATEGORY</ZoneLabel>
      <div className="mt-4 grid min-w-0 grid-cols-[6.75rem_minmax(0,1fr)] items-center gap-4">
        <WireframeDonut />
        <div className="min-w-0 space-y-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="grid min-w-0 grid-cols-[0.6rem_minmax(0,1fr)_2.2rem] items-center gap-3">
              <WireframeBlock
                className="h-2.5 w-2.5"
                tone={item === 0 ? "cyan" : item === 1 ? "violet" : item === 2 ? "magenta" : "default"}
              />
              <WireframeLine className="w-full" />
              <WireframeLine className="w-full" tone="muted" />
            </div>
          ))}
        </div>
      </div>
      <WireframeBlock className="mt-5 h-9 w-full" />
    </WireframeCard>
  );
}

function WireframeMoneySignals() {
  return (
    <WireframeCard className="h-[10rem] p-4">
      <ZoneLabel>9. MONEY SIGNALS</ZoneLabel>
      <div className="mt-3 divide-y divide-cyan-100/10">
        {[0, 1, 2].map((item) => (
          <div key={item} className="grid min-h-[1.75rem] min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_3.25rem_0.5rem] items-center gap-2.5 py-1">
            <WireframeBlock className="h-5 w-5" tone={item === 2 ? "violet" : "default"} />
            <WireframeLine className="w-[58%]" />
            <WireframeLine className="w-full" tone={item === 1 ? "magenta" : "cyan"} />
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                item === 1
                  ? "bg-fuchsia-400/70 shadow-[0_0_14px_rgba(217,70,239,0.24)]"
                  : "bg-cyan-300/70 shadow-[0_0_14px_rgba(34,211,238,0.24)]"
              )}
            />
          </div>
        ))}
      </div>
    </WireframeCard>
  );
}

function WireframeMiniInsight() {
  return (
    <WireframeCard className="h-[6.75rem] p-4">
      <ZoneLabel>10. MINI INSIGHT</ZoneLabel>
      <div className="mt-3 grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] gap-3">
        <WireframeImageBox className="h-12" />
        <div className="min-w-0 pt-1">
          <WireframeLines widths={["84%", "66%", "28%"]} />
        </div>
      </div>
    </WireframeCard>
  );
}

function WireframeRecentTransactions() {
  return (
    <WireframeCard className="min-h-[10rem] p-4">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <ZoneLabel>11. RECENT TRANSACTIONS</ZoneLabel>
        <WireframeBlock className="h-6 w-16 shrink-0" />
      </div>
      <div className="mt-4 space-y-3">
        {[0, 1, 2, 3, 4].map((item) => (
          <div key={item} className="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_3.75rem_3.25rem] items-center gap-3">
            <WireframeBlock className="h-5 w-5" />
            <WireframeLine className="w-[62%]" />
            <WireframeLine className="w-full" />
            <WireframeLine className="w-full" />
          </div>
        ))}
      </div>
    </WireframeCard>
  );
}

function WireframeCashflowTrend() {
  return (
    <WireframeCard className="h-[19rem] p-5 xl:[grid-area:cashflow]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <ZoneLabel>12. CASHFLOW TREND</ZoneLabel>
          <WireframeLine className="mt-4 w-[34%]" />
        </div>
        <div className="hidden shrink-0 items-center gap-8 md:flex">
          <WireframeLine className="w-16" />
          <WireframeLine className="w-16" />
          <WireframeBlock className="h-9 w-24" />
        </div>
      </div>

      <div className="mt-4 h-[12.75rem] min-w-0 pb-4">
        <div className="grid h-full min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
          <div className="flex h-full flex-col justify-between pb-9 pt-4">
            {[0, 1, 2, 3, 4].map((item) => (
              <WireframeLine key={item} className="w-7" tone="muted" />
            ))}
          </div>
          <div className="flex h-full min-w-0 items-end gap-5 border-b border-l border-cyan-100/18 pb-6 pl-4">
            {[62, 45, 66, 50, 72, 56, 74, 58, 78, 63, 82, 52].map((height, index) => (
              <div key={`${height}-${index}`} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                <div
                  className={cn(
                    "mx-auto w-full max-w-8 rounded-sm border shadow-[0_0_18px_rgba(34,211,238,0.06)]",
                    index % 2 === 0
                      ? "border-cyan-200/28 bg-[linear-gradient(180deg,rgba(45,212,191,0.72),rgba(34,211,238,0.22))]"
                      : "border-fuchsia-300/28 bg-[linear-gradient(180deg,rgba(236,72,153,0.72),rgba(217,70,239,0.22))]"
                  )}
                  style={{ height: `${height}%` }}
                />
                {index % 2 === 0 ? <WireframeLine className="mx-auto mt-3 w-10" tone="muted" /> : <span className="mt-3 h-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </WireframeCard>
  );
}

function ZoneLabel({ children }: { children: string }) {
  return <p className="text-xs font-semibold uppercase tracking-normal text-slate-300/88">{children}</p>;
}

function WireframeCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(cardClass, className)}>{children}</div>;
}

function WireframeBlock({ className, tone = "default" }: { className?: string; tone?: BlockTone }) {
  return (
    <div
      className={cn(
        "rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]",
        blockToneClass[tone],
        className
      )}
    />
  );
}

function WireframeLine({
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

function WireframeLines({
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

function WireframeImageBox({ className }: { className?: string }) {
  return (
    <div className={cn("relative rounded-md border border-violet-200/16 bg-violet-300/[0.025]", className)}>
      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-violet-200/22" />
      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-cyan-200/18" />
    </div>
  );
}

function WireframeDonut() {
  return (
    <div className="relative h-24 w-24 rounded-full border border-violet-200/24 bg-[conic-gradient(from_120deg,rgba(34,211,238,0.46)_0_18%,rgba(139,92,246,0.42)_18%_48%,rgba(217,70,239,0.4)_48%_72%,rgba(15,23,42,0.28)_72%_100%)] p-[1px] shadow-[0_0_24px_rgba(139,92,246,0.08)]">
      <div className="relative h-full w-full rounded-full bg-[rgba(5,13,28,0.88)]">
        <div className="absolute inset-5 rounded-full border border-cyan-200/18 bg-[rgba(3,7,18,0.72)]" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-violet-200/18" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-cyan-200/16" />
        <span className="absolute bottom-0 left-1/2 h-1/2 w-px origin-top -rotate-45 bg-fuchsia-200/16" />
      </div>
    </div>
  );
}

function WireframeSparkline({ className, tone = "cyan" }: { className?: string; tone?: AccentTone }) {
  const toneClass: Record<AccentTone, string> = {
    cyan: "border-cyan-100/18",
    violet: "border-violet-100/18",
    magenta: "border-fuchsia-100/18"
  };
  const strokeClass: Record<AccentTone, string> = {
    cyan: "border-t-[rgba(34,211,238,0.62)] shadow-[0_0_14px_rgba(34,211,238,0.14)]",
    violet: "border-t-[rgba(139,92,246,0.62)] shadow-[0_0_14px_rgba(139,92,246,0.14)]",
    magenta: "border-t-[rgba(217,70,239,0.62)] shadow-[0_0_14px_rgba(217,70,239,0.14)]"
  };

  return (
    <div className={cn("flex h-11 items-end gap-1 border-b pb-2", toneClass[tone], className)}>
      {[25, 18, 36, 28, 54, 34, 48, 30].map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={cn(
            "block w-full border-t",
            index % 3 === 1 ? "border-t-slate-300/30" : strokeClass[tone]
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
