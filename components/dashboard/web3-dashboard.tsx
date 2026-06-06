"use client";

import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getEmptyDashboardSummary,
  type DashboardSummary
} from "@/lib/reports/dashboard";
import { cn } from "@/lib/utils";
import {
  WireframeBlock,
  WireframeCard,
  WireframeDonut,
  WireframeImageBox,
  WireframeLine,
  WireframeLines,
  WireframeSparkline,
  ZoneLabel
} from "./dashboard-primitives";
import {
  cardClass,
  cashflowSurfaceClass,
  heroSurfaceClass,
  kpiSurfaceToneClass,
  nestedSurfaceClass,
  rightRailSurfaceClass,
  shellClass,
  topbarClass,
  type AccentTone
} from "./dashboard-style-tokens";

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
    <WireframeCard className={cn(heroSurfaceClass, "h-[26rem] overflow-hidden p-5 xl:[grid-area:hero]")}>
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
    <WireframeCard className={cn(kpiSurfaceToneClass[tone], "flex h-[13rem] flex-col p-4 xl:h-full")}>
      <ZoneLabel>{label}</ZoneLabel>
      <WireframeBlock className="mt-4 h-9 w-9" tone={tone} />
      <WireframeLines className="mt-4" widths={["58%", "74%", "28%"]} tone="primary" />
      <WireframeSparkline className="mt-auto" tone={tone} />
    </WireframeCard>
  );
}

function WireframeCategory() {
  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[14rem] p-4")}>
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
              <WireframeLine
                className="w-full"
                tone={item === 0 ? "cyan" : item === 1 ? "violet" : item === 2 ? "magenta" : "default"}
              />
              <WireframeLine className="w-full" tone="muted" />
            </div>
          ))}
        </div>
      </div>
      <WireframeBlock className="mt-5 h-9 w-full" tone="primary" />
    </WireframeCard>
  );
}

function WireframeMoneySignals() {
  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[10rem] p-4")}>
      <ZoneLabel>9. MONEY SIGNALS</ZoneLabel>
      <div className="mt-3 divide-y divide-cyan-100/10">
        {[0, 1, 2].map((item) => (
          <div key={item} className="grid min-h-[1.75rem] min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_3.25rem_0.5rem] items-center gap-2.5 py-1">
            <WireframeBlock className="h-5 w-5" tone={item === 2 ? "violet" : item === 1 ? "magenta" : "cyan"} />
            <WireframeLine className="w-[58%]" tone="primary" />
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
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[6.75rem] p-4")}>
      <ZoneLabel>10. MINI INSIGHT</ZoneLabel>
      <div className="mt-3 grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] gap-3">
        <WireframeImageBox className="h-12" />
        <div className="min-w-0 pt-1">
          <WireframeLines widths={["84%", "66%", "28%"]} tone="primary" />
        </div>
      </div>
    </WireframeCard>
  );
}

function WireframeRecentTransactions() {
  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "min-h-[10rem] p-4")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <ZoneLabel>11. RECENT TRANSACTIONS</ZoneLabel>
        <WireframeBlock className="h-6 w-16 shrink-0" tone="primary" />
      </div>
      <div className="mt-4 space-y-3">
        {[0, 1, 2, 3, 4].map((item) => (
          <div key={item} className="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_3.75rem_3.25rem] items-center gap-3">
            <WireframeBlock className="h-5 w-5" tone={item % 3 === 0 ? "cyan" : item % 3 === 1 ? "magenta" : "violet"} />
            <WireframeLine className="w-[62%]" tone="primary" />
            <WireframeLine className="w-full" />
            <WireframeLine className="w-full" tone="muted" />
          </div>
        ))}
      </div>
    </WireframeCard>
  );
}

function WireframeCashflowTrend() {
  return (
    <WireframeCard className={cn(cashflowSurfaceClass, "h-[19rem] p-5 xl:[grid-area:cashflow]")}>
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
          <div className="flex h-full min-w-0 items-end gap-5 rounded-sm border-b border-l border-cyan-100/24 bg-[linear-gradient(rgba(125,163,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(125,163,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.24),rgba(3,7,18,0.06))] bg-[size:100%_25%,64px_64px,auto] pb-6 pl-4">
            {[62, 45, 66, 50, 72, 56, 74, 58, 78, 63, 82, 52].map((height, index) => (
              <div key={`${height}-${index}`} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                <div
                  className={cn(
                    "mx-auto w-full max-w-8 rounded-sm border shadow-[0_0_18px_rgba(34,211,238,0.09)]",
                    index % 2 === 0
                      ? "border-cyan-200/36 bg-[linear-gradient(180deg,rgba(45,212,191,0.78),rgba(34,211,238,0.26))]"
                      : "border-fuchsia-300/36 bg-[linear-gradient(180deg,rgba(236,72,153,0.78),rgba(217,70,239,0.26))]"
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
