"use client";

import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getEmptyDashboardSummary,
  type DashboardSummary
} from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import {
  WireframeBlock,
  WireframeCard,
  WireframeDonut,
  WireframeImageBox,
  WireframeLine,
  WireframeSparkline
} from "./dashboard-primitives";
import {
  brandTitle,
  captionText,
  cardClass,
  cardSubtitle,
  cardTitle,
  cashflowSurfaceClass,
  chartLabel,
  dashboardPageSubtitle,
  dashboardPageTitle,
  heroBody,
  heroHeadline,
  heroSurfaceClass,
  kpiSurfaceToneClass,
  metricLabel,
  metricValuePlaceholder,
  navLabel,
  nestedSurfaceClass,
  rightRailSurfaceClass,
  rightRailTitle,
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
        <WireframeHero summary={summary} />
        <WireframeKpis summary={summary} />

        <aside className="grid min-w-0 gap-4 xl:[grid-area:right] xl:grid-rows-[auto_auto_auto_minmax(0,1fr)]">
          <WireframeCategory summary={summary} />
          <WireframeMoneySignals summary={summary} />
          <WireframeMiniInsight summary={summary} />
          <WireframeRecentTransactions summary={summary} />
        </aside>

        <WireframeCashflowTrend />
      </section>
    </div>
  );
}

function WireframeTopBar() {
  return (
    <header className={cn(cardClass, topbarClass, "flex min-h-[4.75rem] flex-col justify-center px-5 py-3")}>
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className={cn(dashboardPageTitle, "truncate")}>Dashboard</h1>
          <p className={cn(dashboardPageSubtitle, "mt-1 truncate")}>Ringkasan keuanganmu secara real-time</p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
          <div
            className={cn(
              navLabel,
              "flex h-10 min-w-0 flex-1 items-center rounded-md border border-[rgba(203,213,225,0.28)] bg-[rgba(24,39,68,0.66)] px-3 text-slate-400/72 lg:w-72 lg:flex-none"
            )}
          >
            <span className="truncate">Cari transaksi, kategori, atau insight...</span>
          </div>
          <div
            className={cn(
              navLabel,
              "flex h-10 w-full shrink-0 items-center justify-center rounded-md border border-[rgba(148,163,184,0.24)] bg-[rgba(22,36,62,0.56)] px-3 text-slate-300/84 lg:w-40"
            )}
          >
            <span className="truncate">Juni 2026</span>
          </div>
          <WireframeBlock className="h-10 w-11 shrink-0" tone="violet" />
          <button
            type="button"
            className={cn(
              navLabel,
              "h-10 w-full shrink-0 rounded-md border border-violet-200/20 bg-[linear-gradient(135deg,#6366f1_0%,#7c5df2_52%,#b45cf0_100%)] px-4 text-white shadow-[0_14px_30px_rgba(124,92,242,0.2),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_0_1px_rgba(255,255,255,0.035)] lg:w-44"
            )}
          >
            Tambah Transaksi
          </button>
        </div>
      </div>
    </header>
  );
}

function WireframeHero({ summary }: { summary: DashboardSummary }) {
  return (
    <WireframeCard className={cn(heroSurfaceClass, "h-[26rem] overflow-hidden p-5 xl:[grid-area:hero]")}>
      <p className={cn(brandTitle, "truncate")}>SakuLog Console</p>
      <div className="mt-6 grid h-[calc(100%-1.875rem)] min-w-0 grid-cols-[minmax(0,1fr)_7.75rem] gap-5">
        <div className="flex min-w-0 flex-col">
          <h2 className={cn(heroHeadline, "mt-7 max-w-md")}>Know where your money moves.</h2>
          <p className={cn(heroBody, "mt-5 max-w-lg")}>
            Ringkasan Juni 2026 untuk memahami sisa uang, cashflow, dan kategori yang paling banyak menguras saldo.
          </p>

          <div className={cn(cardClass, nestedSurfaceClass, "mt-auto p-5")}>
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className={cn(metricLabel, "truncate text-cyan-200/84")}>Sisa uang bulan ini</p>
                <p className={cn(metricValuePlaceholder, "mt-4 max-w-full truncate whitespace-nowrap")}>
                  {formatCurrencyIDR(summary.monthBalance)}
                </p>
                <p className={cn(captionText, "mt-4 truncate text-slate-400/78")}>Cashflow positif</p>
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

function WireframeKpis({ summary }: { summary: DashboardSummary }) {
  const kpis: Array<{
    label: string;
    value: number;
    tone: AccentTone;
  }> = [
    {
      label: "Income this month",
      value: summary.monthIncome,
      tone: "cyan"
    },
    {
      label: "Expenses this month",
      value: summary.monthExpense,
      tone: "magenta"
    },
    {
      label: "Expenses today",
      value: summary.todayExpense,
      tone: "violet"
    },
    {
      label: "Expenses this week",
      value: summary.weekExpense,
      tone: "cyan"
    }
  ];

  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:h-[26rem] xl:grid-rows-2 xl:[grid-area:kpis]">
      {kpis.map((kpi) => (
        <WireframeKpi key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}

function WireframeKpi({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone: AccentTone;
}) {
  return (
    <WireframeCard className={cn(kpiSurfaceToneClass[tone], "flex h-[13rem] flex-col p-4 xl:h-full")}>
      <h3 className={cn(cardTitle, "line-clamp-2 text-sm")}>{label}</h3>
      <div className="mt-4 flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className={cn(metricLabel, "truncate")}>Juni 2026</p>
          <p className={cn(metricValuePlaceholder, "mt-3 max-w-full truncate whitespace-nowrap text-xl")}>
            {formatCurrencyIDR(value)}
          </p>
        </div>
        <WireframeBlock className="h-9 w-9 shrink-0" tone={tone} />
      </div>
      <div className="mt-3 h-4" aria-hidden="true" />
      <WireframeSparkline className="mt-auto" tone={tone} />
    </WireframeCard>
  );
}

function WireframeCategory({ summary }: { summary: DashboardSummary }) {
  const topCategory = summary.topExpenseCategory;
  const categoryName = topCategory?.category ?? "Belum ada kategori";
  const categoryAmount = topCategory?.amount ?? 0;
  const categoryPercentage = topCategory?.percentage ?? 0;
  const otherAmount = Math.max(summary.monthExpense - categoryAmount, 0);
  const otherPercentage = topCategory ? Math.max(100 - categoryPercentage, 0) : 0;

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[14rem] p-4")}>
      <div className="min-w-0">
        <h3 className={cn(rightRailTitle, "truncate")}>Expense by Category</h3>
        <p className={cn(captionText, "mt-1 truncate")}>Kategori pengeluaran bulan ini</p>
      </div>
      <div className="mt-4 grid min-w-0 grid-cols-[6.75rem_minmax(0,1fr)] items-center gap-4">
        <WireframeDonut />
        <div className="min-w-0 space-y-3">
          <div className="grid min-w-0 grid-cols-[0.6rem_minmax(0,1fr)_4.25rem_2rem] items-center gap-2">
            <WireframeBlock className="h-2.5 w-2.5" tone={topCategory ? "cyan" : "default"} />
            <span className={cn(metricLabel, "truncate text-slate-300/88")}>{categoryName}</span>
            <span className={cn(captionText, "truncate whitespace-nowrap text-right tabular-nums text-slate-300/86")}>
              {formatCurrencyIDR(categoryAmount)}
            </span>
            <span className={cn(captionText, "whitespace-nowrap text-right tabular-nums text-cyan-200/72")}>
              {categoryPercentage}%
            </span>
          </div>
          <div className="grid min-w-0 grid-cols-[0.6rem_minmax(0,1fr)_4.25rem_2rem] items-center gap-2">
            <WireframeBlock className="h-2.5 w-2.5" tone="default" />
            <span className={cn(metricLabel, "truncate text-slate-400/72")}>Kategori lain</span>
            <span className={cn(captionText, "truncate whitespace-nowrap text-right tabular-nums text-slate-400/72")}>
              {formatCurrencyIDR(otherAmount)}
            </span>
            <span className={cn(captionText, "whitespace-nowrap text-right tabular-nums text-slate-500/72")}>
              {otherPercentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex h-9 items-center justify-center rounded-md border border-[rgba(203,213,225,0.28)] bg-[rgba(24,39,68,0.66)]">
        <span className={cn(navLabel, "text-cyan-200/72")}>Lihat semua kategori</span>
      </div>
    </WireframeCard>
  );
}

function WireframeMoneySignals({ summary }: { summary: DashboardSummary }) {
  const signals: Array<{
    label: string;
    value: string;
    tone: AccentTone;
  }> = [
    {
      label: "Pengeluaran hari ini",
      value: formatCurrencyIDR(summary.todayExpense),
      tone: "cyan"
    },
    {
      label: "Pengeluaran minggu ini",
      value: formatCurrencyIDR(summary.weekExpense),
      tone: "magenta"
    },
    {
      label: "Kategori terboros",
      value: summary.topExpenseCategory?.category ?? "Belum ada",
      tone: "violet"
    }
  ];

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[10rem] p-4")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={cn(rightRailTitle, "truncate")}>Money Signals</h3>
          <p className={cn(captionText, "mt-1 truncate")}>Yang perlu kamu lihat cepat</p>
        </div>
        <span className={cn(captionText, "shrink-0 truncate text-cyan-200/72")}>Lihat semua</span>
      </div>
      <div className="mt-3 divide-y divide-cyan-100/10">
        {signals.map((signal, item) => (
          <div key={signal.label} className="grid min-h-[1.75rem] min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_minmax(3.25rem,4.25rem)_0.5rem] items-center gap-2.5 py-1">
            <WireframeBlock className="h-5 w-5" tone={signal.tone} />
            <span className={cn(metricLabel, "truncate")}>{signal.label}</span>
            <span className={cn(captionText, "truncate whitespace-nowrap text-right tabular-nums text-slate-300/86")}>
              {signal.value}
            </span>
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

function WireframeMiniInsight({ summary }: { summary: DashboardSummary }) {
  const topCategory = summary.topExpenseCategory;
  const insight = topCategory
    ? `Bulan ini pengeluaran terbesar ada di kategori ${topCategory.category}.`
    : "Belum ada pola pengeluaran yang bisa dibaca.";
  const tip = topCategory
    ? "Pantau kategori ini agar cashflow tetap aman."
    : "Catat transaksi untuk mulai melihat insight.";

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[6.75rem] p-4")}>
      <h3 className={cn(rightRailTitle, "truncate")}>Mini Insight</h3>
      <div className="mt-3 grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] gap-3">
        <WireframeImageBox className="h-12" />
        <div className="min-w-0">
          <p className={cn(metricLabel, "line-clamp-2 text-slate-300/84")}>
            {insight}
          </p>
          <p className={cn(captionText, "mt-1 truncate text-cyan-200/62")}>{tip}</p>
        </div>
      </div>
    </WireframeCard>
  );
}

function WireframeRecentTransactions({ summary }: { summary: DashboardSummary }) {
  const transactions = summary.recentTransactions.slice(0, 5);

  function formatTransactionAmount(transaction: DashboardSummary["recentTransactions"][number]) {
    const prefix = transaction.type === "income" ? "+" : "-";

    return `${prefix}${formatCurrencyIDR(transaction.amount)}`;
  }

  function formatTransactionDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short"
    }).format(new Date(`${date}T00:00:00`));
  }

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "min-h-[10rem] p-4")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={cn(rightRailTitle, "truncate")}>Recent Transactions</h3>
          <p className={cn(captionText, "mt-1 truncate")}>Aktivitas terakhir yang tercatat</p>
        </div>
        <span className={cn(captionText, "shrink-0 truncate text-cyan-200/72")}>Lihat semua</span>
      </div>
      {transactions.length > 0 ? (
        <div className="mt-4 space-y-3">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <div key={transaction.id} className="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_4.5rem] items-center gap-3">
                <span
                  className={cn(
                    "h-5 w-5 rounded-md border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    isIncome
                      ? "border-emerald-200/34 bg-emerald-300/12 shadow-[0_0_14px_rgba(16,185,129,0.12)]"
                      : "border-fuchsia-200/34 bg-fuchsia-300/12 shadow-[0_0_14px_rgba(217,70,239,0.12)]"
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className={cn(metricLabel, "truncate text-slate-300/88")}>{transaction.name}</p>
                  <p className={cn(captionText, "mt-0.5 truncate")}>
                    {transaction.category} · {formatTransactionDate(transaction.transaction_date)}
                  </p>
                </div>
                <span
                  className={cn(
                    captionText,
                    "truncate whitespace-nowrap text-right font-semibold tabular-nums",
                    isIncome ? "text-emerald-200/86" : "text-fuchsia-200/86"
                  )}
                >
                  {formatTransactionAmount(transaction)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-[rgba(148,163,184,0.18)] bg-[rgba(15,23,42,0.34)] p-3">
          <p className={cn(metricLabel, "truncate text-slate-300/86")}>Belum ada transaksi</p>
          <p className={cn(captionText, "mt-1 line-clamp-2")}>
            Catat transaksi pertamamu untuk mulai melihat aktivitas.
          </p>
        </div>
      )}
    </WireframeCard>
  );
}

function WireframeCashflowTrend() {
  return (
    <WireframeCard className={cn(cashflowSurfaceClass, "h-[19rem] p-5 xl:[grid-area:cashflow]")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={cn(rightRailTitle, "truncate")}>Cashflow Trend</h3>
          <p className={cn(cardSubtitle, "mt-2 truncate")}>Income vs expense 6 bulan terakhir</p>
        </div>
        <div className="hidden shrink-0 items-center gap-8 md:flex">
          <span className={cn(chartLabel, "text-cyan-200/70")}>Pemasukan</span>
          <span className={cn(chartLabel, "text-fuchsia-200/70")}>Pengeluaran</span>
          <span
            className={cn(
              navLabel,
              "flex h-9 w-24 items-center justify-center rounded-md border border-[rgba(148,163,184,0.24)] bg-[rgba(22,36,62,0.56)] text-slate-300/78"
            )}
          >
            6 Bulan
          </span>
        </div>
      </div>

      <div className="mt-4 h-[12.75rem] min-w-0 pb-4">
        <div className="grid h-full min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
          <div className="flex h-full flex-col justify-between pb-9 pt-4">
            {[0, 1, 2, 3, 4].map((item) => (
              <WireframeLine key={item} className={cn(chartLabel, "h-1.5 w-7")} tone="muted" />
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
                {index % 2 === 0 ? (
                  <WireframeLine className={cn(chartLabel, "mx-auto mt-3 h-1.5 w-10")} tone="muted" />
                ) : (
                  <span className="mt-3 h-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </WireframeCard>
  );
}
