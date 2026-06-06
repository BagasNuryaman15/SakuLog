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

        <WireframeCashflowTrend summary={summary} />
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
              "flex h-10 min-w-0 flex-1 items-center rounded-md border border-[rgba(179,107,255,0.24)] bg-[rgba(44,31,64,0.52)] px-3 text-[#9B89B8] lg:w-72 lg:flex-none"
            )}
          >
            <span className="truncate">Cari transaksi, kategori, atau insight...</span>
          </div>
          <div
            className={cn(
              navLabel,
              "flex h-10 w-full shrink-0 items-center justify-center rounded-md border border-[rgba(91,67,129,0.55)] bg-[rgba(29,21,41,0.56)] px-3 text-[#C7B8E8] lg:w-40"
            )}
          >
            <span className="truncate">Juni 2026</span>
          </div>
          <WireframeBlock className="h-10 w-11 shrink-0" tone="violet" />
          <button
            type="button"
            className={cn(
              navLabel,
              "h-10 w-full shrink-0 rounded-md border border-[#E0B3FF]/22 bg-[linear-gradient(135deg,#6A2CFF_0%,#B040FF_56%,#D946EF_100%)] px-4 text-[#F8F4FF] shadow-[0_14px_34px_rgba(106,44,255,0.28),0_0_22px_rgba(176,64,255,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] lg:w-44"
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
                <p className={cn(metricLabel, "truncate text-[#9DECF6]/86")}>Sisa uang bulan ini</p>
                <p className={cn(metricValuePlaceholder, "mt-4 max-w-full truncate whitespace-nowrap")}>
                  {formatCurrencyIDR(summary.monthBalance)}
                </p>
                <p className={cn(captionText, "mt-4 truncate text-emerald-200/78")}>Cashflow positif</p>
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
            <span className={cn(metricLabel, "truncate text-[#F8F4FF]/88")}>{categoryName}</span>
            <span className={cn(captionText, "truncate whitespace-nowrap text-right tabular-nums text-[#C7B8E8]/86")}>
              {formatCurrencyIDR(categoryAmount)}
            </span>
            <span className={cn(captionText, "whitespace-nowrap text-right tabular-nums text-cyan-200/72")}>
              {categoryPercentage}%
            </span>
          </div>
          <div className="grid min-w-0 grid-cols-[0.6rem_minmax(0,1fr)_4.25rem_2rem] items-center gap-2">
            <WireframeBlock className="h-2.5 w-2.5" tone="default" />
            <span className={cn(metricLabel, "truncate text-[#9B89B8]/78")}>Kategori lain</span>
            <span className={cn(captionText, "truncate whitespace-nowrap text-right tabular-nums text-[#9B89B8]/78")}>
              {formatCurrencyIDR(otherAmount)}
            </span>
            <span className={cn(captionText, "whitespace-nowrap text-right tabular-nums text-[#6F5F86]/82")}>
              {otherPercentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex h-9 items-center justify-center rounded-md border border-[rgba(179,107,255,0.28)] bg-[rgba(44,31,64,0.64)]">
        <span className={cn(navLabel, "text-[#D8B4FE]/82")}>Lihat semua kategori</span>
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
        <span className={cn(captionText, "shrink-0 truncate text-[#D8B4FE]/78")}>Lihat semua</span>
      </div>
      <div className="mt-3 divide-y divide-[#B36BFF]/12">
        {signals.map((signal, item) => (
          <div key={signal.label} className="grid min-h-[1.75rem] min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_minmax(3.25rem,4.25rem)_0.5rem] items-center gap-2.5 py-1">
            <WireframeBlock className="h-5 w-5" tone={signal.tone} />
            <span className={cn(metricLabel, "truncate")}>{signal.label}</span>
            <span className={cn(captionText, "truncate whitespace-nowrap text-right tabular-nums text-[#C7B8E8]/90")}>
              {signal.value}
            </span>
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                item === 1
                  ? "bg-[#EC4899]/78 shadow-[0_0_14px_rgba(236,72,153,0.22)]"
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
          <p className={cn(metricLabel, "line-clamp-2 text-[#C7B8E8]/90")}>
            {insight}
          </p>
          <p className={cn(captionText, "mt-1 truncate text-[#D8B4FE]/68")}>{tip}</p>
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
        <span className={cn(captionText, "shrink-0 truncate text-[#D8B4FE]/78")}>Lihat semua</span>
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
                      ? "border-cyan-200/38 bg-cyan-300/14 shadow-[0_0_14px_rgba(34,211,238,0.14)]"
                      : "border-[#F472B6]/38 bg-[#BA319F]/18 shadow-[0_0_14px_rgba(236,72,153,0.14)]"
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className={cn(metricLabel, "truncate text-[#F8F4FF]/88")}>{transaction.name}</p>
                  <p className={cn(captionText, "mt-0.5 truncate")}>
                    {transaction.category} · {formatTransactionDate(transaction.transaction_date)}
                  </p>
                </div>
                <span
                  className={cn(
                    captionText,
                    "truncate whitespace-nowrap text-right font-semibold tabular-nums",
                    isIncome ? "text-cyan-200/90" : "text-[#F472B6]/90"
                  )}
                >
                  {formatTransactionAmount(transaction)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-[rgba(91,67,129,0.45)] bg-[rgba(29,21,41,0.42)] p-3">
          <p className={cn(metricLabel, "truncate text-[#F8F4FF]/86")}>Belum ada transaksi</p>
          <p className={cn(captionText, "mt-1 line-clamp-2")}>
            Catat transaksi pertamamu untuk mulai melihat aktivitas.
          </p>
        </div>
      )}
    </WireframeCard>
  );
}

function WireframeCashflowTrend({ summary }: { summary: DashboardSummary }) {
  const series = summary.monthSeries;
  const maxValue = Math.max(...series.flatMap((item) => [item.income, item.expense]), 1);
  const axisLabels = [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0];
  const hasCashflowData = series.some((item) => item.income > 0 || item.expense > 0);

  function getBarHeight(value: number) {
    if (value <= 0) {
      return "0%";
    }

    return `${Math.max((value / maxValue) * 100, 8)}%`;
  }

  function formatAxisValue(value: number) {
    if (value >= 1_000_000) {
      return `Rp${Math.round(value / 1_000_000)}M`;
    }

    if (value >= 1_000) {
      return `Rp${Math.round(value / 1_000)}K`;
    }

    return formatCurrencyIDR(value);
  }

  return (
    <WireframeCard className={cn(cashflowSurfaceClass, "h-[19rem] p-5 xl:[grid-area:cashflow]")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={cn(rightRailTitle, "truncate")}>Cashflow Trend</h3>
          <p className={cn(cardSubtitle, "mt-2 truncate")}>Income vs expense 6 bulan terakhir</p>
        </div>
        <div className="hidden shrink-0 items-center gap-8 md:flex">
          <span className={cn(chartLabel, "text-cyan-200/76")}>Pemasukan</span>
          <span className={cn(chartLabel, "text-[#F472B6]/76")}>Pengeluaran</span>
          <span
            className={cn(
              navLabel,
              "flex h-9 w-24 items-center justify-center rounded-md border border-[rgba(91,67,129,0.55)] bg-[rgba(44,31,64,0.52)] text-[#C7B8E8]"
            )}
          >
            6 Bulan
          </span>
        </div>
      </div>

      <div className="mt-4 h-[12.75rem] min-w-0 pb-4">
        <div className="grid h-full min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
          <div className="flex h-full flex-col justify-between pb-9 pt-4">
            {axisLabels.map((value) => (
              <span key={value} className={cn(chartLabel, "truncate text-right text-[#9B89B8]/74")}>
                {formatAxisValue(value)}
              </span>
            ))}
          </div>
          <div className="relative flex h-full min-w-0 items-end gap-4 rounded-sm border-b border-l border-[#B36BFF]/24 bg-[linear-gradient(rgba(224,179,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(224,179,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(44,31,64,0.28),rgba(10,10,10,0.08))] bg-[size:100%_25%,64px_64px,auto] pb-6 pl-4">
            {series.length > 0 ? (
              series.map((item) => (
                <div key={item.key} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                  <div className="flex h-full min-w-0 items-end justify-center gap-1.5">
                    <div
                      className="w-full max-w-4 rounded-sm border border-cyan-200/42 bg-[linear-gradient(180deg,rgba(34,211,238,0.82),rgba(56,189,248,0.3))] shadow-[0_0_18px_rgba(34,211,238,0.14)]"
                      style={{ height: getBarHeight(item.income) }}
                    />
                    <div
                      className="w-full max-w-4 rounded-sm border border-[#F472B6]/44 bg-[linear-gradient(180deg,rgba(236,72,153,0.82),rgba(217,70,239,0.3))] shadow-[0_0_18px_rgba(236,72,153,0.13)]"
                      style={{ height: getBarHeight(item.expense) }}
                    />
                  </div>
                  <span className={cn(chartLabel, "mx-auto mt-3 max-w-10 truncate text-center text-[#9B89B8]/78")}>
                    {item.label}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex h-full min-w-0 flex-1 items-center justify-center px-4 text-center">
                <div className="min-w-0">
                  <p className={cn(metricLabel, "text-[#F8F4FF]/86")}>Belum ada data cashflow</p>
                  <p className={cn(captionText, "mt-1 line-clamp-2")}>
                    Catat pemasukan dan pengeluaran untuk melihat tren.
                  </p>
                </div>
              </div>
            )}
            {!hasCashflowData && series.length > 0 ? (
              <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-md border border-[rgba(91,67,129,0.4)] bg-[rgba(16,7,37,0.72)] px-3 py-2 text-center">
                <p className={cn(captionText, "text-[#C7B8E8]/82")}>Belum ada arus kas pada 6 bulan terakhir.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </WireframeCard>
  );
}
