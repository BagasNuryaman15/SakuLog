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
    <div className={shellClass} data-dashboard-data-hook={dataHookIsPreserved ? "preserved" : "idle"}>
      <WireframeTopBar monthLabel={dashboardMonthLabel} />

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
    </div>
  );
}
