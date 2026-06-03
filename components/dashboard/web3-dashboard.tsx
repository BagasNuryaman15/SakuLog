"use client";

import { useEffect, useState, type ReactNode } from "react";

import {
  getDashboardSummary,
  getEmptyDashboardSummary,
  type DashboardSummary
} from "@/lib/reports/dashboard";
import { cn } from "@/lib/utils";

const shellClass = "w-full min-w-0 rounded-[1.5rem] bg-[#07111b] p-0 text-slate-300";
const cardClass = "min-w-0 rounded-[1.5rem] border border-slate-600/60 bg-[#0a1723]";
const lineClass = "h-2 rounded-sm bg-slate-500/50";

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
    <header className={cn(cardClass, "flex min-h-[4.75rem] flex-col justify-center px-5 py-3")}>
      <ZoneLabel>2. TOP BAR</ZoneLabel>
      <div className="mt-3 flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
        <WireframeBlock className="h-10 min-w-0 flex-1 lg:max-w-[30rem]" />
        <WireframeBlock className="h-10 w-full shrink-0 lg:w-40" />
        <WireframeBlock className="h-10 w-11 shrink-0" />
        <WireframeBlock className="h-10 w-full shrink-0 lg:w-44" />
      </div>
    </header>
  );
}

function WireframeHero() {
  return (
    <WireframeCard className="h-[24.25rem] p-5 xl:[grid-area:hero]">
      <ZoneLabel>3. HERO</ZoneLabel>
      <div className="mt-6 grid h-[calc(100%-1.875rem)] min-w-0 grid-cols-[minmax(0,1fr)_7.75rem] gap-5">
        <div className="flex min-w-0 flex-col">
          <WireframeLine className="h-7 w-36" />
          <WireframeLines className="mt-6" widths={["72%", "64%"]} />
          <WireframeLines className="mt-7" widths={["62%", "54%", "46%"]} thin />

          <div className={cn(cardClass, "mt-auto p-4")}>
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <WireframeLine className="w-36" />
                <WireframeLine className="mt-4 h-3 w-[70%]" />
                <WireframeLine className="mt-4 h-2 w-[84%]" />
              </div>
              <WireframeBlock className="h-12 w-12 shrink-0" />
            </div>
          </div>
        </div>

        <WireframeImageBox className="mt-12 hidden h-36 lg:block" />
      </div>
    </WireframeCard>
  );
}

function WireframeKpis() {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:h-[24.25rem] xl:grid-rows-2 xl:[grid-area:kpis]">
      <WireframeKpi label="4. KPI 1" />
      <WireframeKpi label="5. KPI 2" />
      <WireframeKpi label="6. KPI 3" />
      <WireframeKpi label="7. KPI 4" />
    </div>
  );
}

function WireframeKpi({ label }: { label: string }) {
  return (
    <WireframeCard className="h-[11.625rem] p-4 xl:h-full">
      <ZoneLabel>{label}</ZoneLabel>
      <WireframeBlock className="mt-4 h-9 w-9" />
      <WireframeLines className="mt-4" widths={["58%", "74%", "28%"]} />
      <WireframeSparkline className="mt-4" />
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
              <WireframeBlock className="h-2.5 w-2.5" />
              <WireframeLine className="w-full" />
              <WireframeLine className="w-full" />
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
      <div className="mt-3 divide-y divide-slate-500/35">
        {[0, 1, 2].map((item) => (
          <div key={item} className="grid min-h-[1.75rem] min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_3.25rem_0.5rem] items-center gap-2.5 py-1">
            <WireframeBlock className="h-5 w-5" />
            <WireframeLine className="w-[58%]" />
            <WireframeLine className="w-full" />
            <span className="h-2 w-2 rounded-full bg-slate-500/55" />
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
              <WireframeLine key={item} className="w-7" />
            ))}
          </div>
          <div className="flex h-full min-w-0 items-end gap-5 border-b border-l border-slate-500/50 pb-6 pl-4">
            {[62, 45, 66, 50, 72, 56, 74, 58, 78, 63, 82, 52].map((height, index) => (
              <div key={`${height}-${index}`} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                <div
                  className="mx-auto w-full max-w-8 border border-slate-500/60 bg-transparent"
                  style={{ height: `${height}%` }}
                />
                {index % 2 === 0 ? <WireframeLine className="mx-auto mt-3 w-10" /> : <span className="mt-3 h-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </WireframeCard>
  );
}

function ZoneLabel({ children }: { children: string }) {
  return <p className="text-xs font-semibold uppercase tracking-normal text-slate-300">{children}</p>;
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

function WireframeBlock({ className }: { className?: string }) {
  return <div className={cn("rounded-md border border-slate-500/55 bg-transparent", className)} />;
}

function WireframeLine({ className, width }: { className?: string; width?: string }) {
  return <span className={cn("block", lineClass, className)} style={width ? { width } : undefined} />;
}

function WireframeLines({
  widths,
  className,
  thin = false
}: {
  widths: string[];
  className?: string;
  thin?: boolean;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {widths.map((width, index) => (
        <WireframeLine key={`${width}-${index}`} className={cn(thin && "h-1.5")} width={width} />
      ))}
    </div>
  );
}

function WireframeImageBox({ className }: { className?: string }) {
  return (
    <div className={cn("relative rounded-md border border-slate-500/55", className)}>
      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-slate-500/55" />
      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-slate-500/55" />
    </div>
  );
}

function WireframeDonut() {
  return (
    <div className="relative h-24 w-24 rounded-full border border-slate-500/60">
      <div className="absolute inset-5 rounded-full border border-slate-500/60" />
      <span className="absolute left-1/2 top-0 h-full w-px bg-slate-500/45" />
      <span className="absolute left-0 top-1/2 h-px w-full bg-slate-500/45" />
      <span className="absolute bottom-0 left-1/2 h-1/2 w-px origin-top -rotate-45 bg-slate-500/45" />
    </div>
  );
}

function WireframeSparkline({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-5 items-end gap-1", className)}>
      {[25, 18, 36, 28, 54, 34, 48, 30].map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="block w-full border-t border-slate-500/55"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
