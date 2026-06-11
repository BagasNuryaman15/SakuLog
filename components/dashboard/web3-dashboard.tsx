"use client";

import { useEffect, useState } from "react";

import {
  getDashboardMonthLabel,
  getDashboardSummary,
  getEmptyDashboardSummary,
  type DashboardSummary
} from "@/lib/reports/dashboard";
import { type CashflowRange } from "./dashboard-helpers";
import { shellClass } from "@/shared/design/tokens";
import { WireframeTopBar } from "./wireframe-top-bar";
import { WireframeHero } from "./wireframe-hero";
import { WireframeKpis } from "./wireframe-kpis";
import { WireframeCategory } from "./wireframe-category";
import { WireframeMoneySignals } from "./wireframe-money-signals";
import { WireframeMiniInsight } from "./wireframe-mini-insight";
import { WireframeRecentTransactions } from "./wireframe-recent-transactions";
import { WireframeCashflowTrend } from "./wireframe-cashflow-trend";
import { cn } from "@/lib/utils";

export function Web3Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>(getEmptyDashboardSummary);
  const [cashflowRange, setCashflowRange] = useState<CashflowRange>(6);
  const [isCashflowRangeOpen, setIsCashflowRangeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dashboardMonthLabel = getDashboardMonthLabel();

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
    <div
      className={cn(shellClass, "relative")}
      data-dashboard-data-hook={dataHookIsPreserved ? "preserved" : "idle"}
    >
      <WireframeTopBar error={error} isLoading={isLoading} monthLabel={dashboardMonthLabel} />

      <section className="mt-4 grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(25.5rem,1.35fr)_minmax(22rem,0.95fr)_minmax(20rem,21.25rem)] xl:grid-rows-[auto_auto] xl:[grid-template-areas:'hero_kpis_right'_'cashflow_cashflow_right']">
        <WireframeHero summary={summary} />
        <WireframeKpis summary={summary} />

        <aside className="grid min-w-0 gap-4 xl:[grid-area:right] xl:grid-rows-[auto_auto_auto_minmax(0,1fr)]">
          <WireframeCategory summary={summary} />
          <WireframeMoneySignals summary={summary} />
          <WireframeMiniInsight summary={summary} />
          <WireframeRecentTransactions summary={summary} />
        </aside>

        <WireframeCashflowTrend
          cashflowRange={cashflowRange}
          isCashflowRangeOpen={isCashflowRangeOpen}
          onCashflowRangeMenuToggle={() => setIsCashflowRangeOpen((isOpen) => !isOpen)}
          onCashflowRangeChange={setCashflowRange}
          onCashflowRangeMenuClose={() => setIsCashflowRangeOpen(false)}
          summary={summary}
        />
      </section>
      <DashboardLoadingOverlay show={isLoading} />
    </div>
  );
}

function DashboardLoadingOverlay({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center rounded-[inherit] bg-[radial-gradient(circle_at_50%_46%,rgba(123,0,212,0.16),transparent_28rem),rgba(2,2,4,0.46)] px-4 backdrop-blur-[4px]"
      role="status"
      aria-live="polite"
      aria-label="Membaca data dashboard"
    >
      <div className="relative flex min-w-[13rem] flex-col items-center justify-center rounded-[1.15rem] border border-[#B36BFF]/12 bg-[linear-gradient(180deg,rgba(18,9,43,0.72),rgba(6,4,12,0.68))] px-8 py-7 text-center shadow-[0_28px_90px_rgba(0,0,0,0.5),0_0_42px_rgba(176,64,255,0.12),inset_0_1px_0_rgba(255,255,255,0.045)]">
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,78,255,0.5),transparent)]" />
        <div className="sakulog-loading-bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="mt-6 text-[0.72rem] font-black uppercase tracking-[0.42em] text-[#C7B8E8]/84">
          Loading
        </p>
      </div>
    </div>
  );
}
