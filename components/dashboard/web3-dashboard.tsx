"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  type LucideIcon
} from "lucide-react";

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

const cashflowRangeOptions = [3, 6, 12] as const;
type CashflowRange = (typeof cashflowRangeOptions)[number];
type ExpenseCategoryRow = {
  category: string;
  amount: number;
  percentage: number;
  color: string;
};

const expenseCategoryColors = ["#B040FF", "#7B00D4", "#BA319F", "#B36BFF"] as const;
const otherCategoryColor = "#5B4381";

export function Web3Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>(getEmptyDashboardSummary);
  const [cashflowRange, setCashflowRange] = useState<CashflowRange>(6);
  const [isCashflowRangeOpen, setIsCashflowRangeOpen] = useState(false);
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
  const isCashflowNegative = summary.monthBalance < 0;

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
                <p
                  className={cn(
                    captionText,
                    "mt-4 truncate",
                    isCashflowNegative ? "text-[#F472B6]/82" : "text-emerald-200/78"
                  )}
                >
                  {isCashflowNegative ? "Cashflow negatif" : "Cashflow positif"}
                </p>
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
  const expenseIncomeRatio =
    summary.monthIncome > 0 ? Math.round((summary.monthExpense / summary.monthIncome) * 100) : null;
  const kpis: Array<{
    icon: LucideIcon;
    label: string;
    sparklineValues?: number[];
    value: number;
    tone: AccentTone;
    caption: string;
    captionTone?: "positive" | "negative";
  }> = [
    {
      icon: ArrowUpRight,
      label: "Income this month",
      sparklineValues: summary.monthSeries.map((item) => item.income),
      value: summary.monthIncome,
      tone: "cyan",
      caption: "Total pemasukan bulan ini"
    },
    {
      icon: ArrowDownRight,
      label: "Expenses this month",
      sparklineValues: summary.monthSeries.map((item) => item.expense),
      value: summary.monthExpense,
      tone: "magenta",
      caption:
        expenseIncomeRatio === null ? "Total pengeluaran bulan ini" : `${expenseIncomeRatio}% dari pemasukan`,
      captionTone: expenseIncomeRatio === null ? undefined : expenseIncomeRatio > 100 ? "negative" : "positive"
    },
    {
      icon: CalendarDays,
      label: "Expenses today",
      value: summary.todayExpense,
      tone: "violet",
      caption: "Tercatat hari ini"
    },
    {
      icon: CircleDollarSign,
      label: "Expenses this week",
      value: summary.weekExpense,
      tone: "cyan",
      caption: "Minggu berjalan"
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
  caption,
  captionTone,
  icon: Icon,
  label,
  sparklineValues,
  value,
  tone
}: {
  caption: string;
  captionTone?: "positive" | "negative";
  icon: LucideIcon;
  label: string;
  sparklineValues?: number[];
  value: number;
  tone: AccentTone;
}) {
  const badgeClass: Record<AccentTone, string> = {
    cyan: "border-cyan-200/30 bg-cyan-300/14 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.16)]",
    violet: "border-[#B36BFF]/34 bg-[#7B00D4]/18 text-[#D8B4FE] shadow-[0_0_18px_rgba(176,64,255,0.18)]",
    magenta: "border-[#F472B6]/34 bg-[#BA319F]/18 text-[#F9A8D4] shadow-[0_0_18px_rgba(236,72,153,0.16)]"
  };

  return (
    <WireframeCard className={cn(kpiSurfaceToneClass[tone], "flex h-[13rem] flex-col p-4 xl:h-full")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border", badgeClass[tone])}>
          <Icon className="h-4 w-4" strokeWidth={2.35} />
        </div>
      </div>
      <h3 className={cn(cardTitle, "mt-3 line-clamp-1 text-xs font-semibold text-[#C7B8E8]/86")}>{label}</h3>
      <p className={cn(metricValuePlaceholder, "mt-2 max-w-full truncate whitespace-nowrap text-xl")}>
        {formatCurrencyIDR(value)}
      </p>
      <p
        className={cn(
          captionText,
          "mt-2 h-4 truncate",
          captionTone === "negative"
            ? "text-[#F472B6]/78"
            : captionTone === "positive"
              ? "text-emerald-200/74"
              : "text-[#9B89B8]/86"
        )}
      >
        {caption}
      </p>
      <WireframeSparkline className="mt-auto" tone={tone} values={sparklineValues} />
    </WireframeCard>
  );
}

function WireframeCategory({ summary }: { summary: DashboardSummary }) {
  const categoryRows = getExpenseCategoryRows(summary);
  const hasExpenses = summary.monthExpense > 0 && categoryRows.length > 0;

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[14rem] p-4")}>
      <div className="min-w-0">
        <h3 className={cn(rightRailTitle, "truncate")}>Expense by Category</h3>
        <p className={cn(captionText, "mt-1 truncate")}>Kategori pengeluaran bulan ini</p>
      </div>
      <div className="mt-3 grid min-w-0 grid-cols-[5.85rem_minmax(0,1fr)] items-center gap-3">
        <ExpenseCategoryDonut rows={categoryRows} totalExpense={summary.monthExpense} />
        <div className="min-w-0 space-y-1">
          {hasExpenses ? (
            categoryRows.map((item) => (
              <div
                key={item.category}
                className="grid min-h-4 min-w-0 grid-cols-[0.45rem_minmax(0,1fr)_minmax(3.25rem,4.2rem)_2rem] items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate text-[0.625rem] font-semibold leading-none tracking-[-0.005em] text-[#F8F4FF]/88">
                  {item.category}
                </span>
                <span
                  className="truncate whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#C7B8E8]/84 tabular-nums"
                >
                  {formatCurrencyIDR(item.amount)}
                </span>
                <span className="whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#D8B4FE]/74 tabular-nums">
                  {item.percentage}%
                </span>
              </div>
            ))
          ) : (
            <div className="min-w-0 space-y-1">
              <div className="grid min-h-4 min-w-0 grid-cols-[0.45rem_minmax(0,1fr)_minmax(3.25rem,4.2rem)_2rem] items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B4381]/70" />
                <span className="truncate text-[0.625rem] font-semibold leading-none tracking-[-0.005em] text-[#F8F4FF]/84">
                  Belum ada pengeluaran
                </span>
                <span
                  className="truncate whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#9B89B8]/82 tabular-nums"
                >
                  Rp0
                </span>
                <span className="whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#6F5F86]/82 tabular-nums">
                  0%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2.5 flex h-7 items-center justify-center rounded-md border border-[rgba(179,107,255,0.28)] bg-[rgba(44,31,64,0.64)]">
        <span className={cn(navLabel, "text-[#D8B4FE]/82")}>Lihat semua kategori</span>
      </div>
    </WireframeCard>
  );
}

function getExpenseCategoryRows(summary: DashboardSummary): ExpenseCategoryRow[] {
  const categories = summary.expenseCategoryBreakdown.filter((item) => item.amount > 0);
  const totalExpense = summary.monthExpense;

  if (totalExpense <= 0 || categories.length === 0) {
    return [];
  }

  const topCategories = categories.slice(0, 4);
  const otherAmount = categories.slice(4).reduce((total, item) => total + item.amount, 0);
  const rows = topCategories.map((item, index) => ({
    category: item.category,
    amount: item.amount,
    percentage: formatCategoryPercent(item.amount, totalExpense),
    color: expenseCategoryColors[index]
  }));

  if (otherAmount > 0) {
    rows.push({
      category: "Lainnya",
      amount: otherAmount,
      percentage: formatCategoryPercent(otherAmount, totalExpense),
      color: otherCategoryColor
    });
  }

  return rows;
}

function formatCategoryPercent(amount: number, totalExpense: number) {
  if (totalExpense <= 0 || amount <= 0) {
    return 0;
  }

  return Math.round((amount / totalExpense) * 100);
}

function ExpenseCategoryDonut({ rows, totalExpense }: { rows: ExpenseCategoryRow[]; totalExpense: number }) {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  let segmentOffset = 0;
  const hasExpenses = totalExpense > 0 && rows.length > 0;

  return (
    <svg className="h-[5.85rem] w-[5.85rem] shrink-0" viewBox="0 0 88 88" aria-hidden="true">
      <circle
        cx="44"
        cy="44"
        fill="none"
        r={radius}
        stroke="rgba(91,67,129,0.28)"
        strokeWidth="10"
      />
      {hasExpenses
        ? rows.map((item) => {
            const segmentLength = (item.amount / totalExpense) * circumference;
            const dashOffset = -segmentOffset;
            segmentOffset += segmentLength;

            return (
              <circle
                key={item.category}
                cx="44"
                cy="44"
                fill="none"
                r={radius}
                stroke={item.color}
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
                strokeWidth="10"
                transform="rotate(-90 44 44)"
              />
            );
          })
        : null}
      <circle cx="44" cy="44" fill="rgba(16,7,37,0.74)" r="20" />
    </svg>
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
  const transactions = summary.recentTransactions.slice(0, 4);

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
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[12.5rem] overflow-hidden p-4")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={cn(rightRailTitle, "truncate")}>Recent Transactions</h3>
          <p className={cn(captionText, "mt-1 truncate")}>Aktivitas terakhir yang tercatat</p>
        </div>
        <span className={cn(captionText, "shrink-0 truncate text-[#D8B4FE]/78")}>Lihat semua</span>
      </div>
      {transactions.length > 0 ? (
        <div className="mt-3 space-y-2">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <div key={transaction.id} className="grid min-w-0 grid-cols-[1rem_minmax(0,1fr)_4.35rem] items-center gap-2.5">
                <span
                  className={cn(
                    "h-4 w-4 rounded border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    isIncome
                      ? "border-cyan-200/38 bg-cyan-300/14 shadow-[0_0_14px_rgba(34,211,238,0.14)]"
                      : "border-[#F472B6]/38 bg-[#BA319F]/18 shadow-[0_0_14px_rgba(236,72,153,0.14)]"
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-[0.6875rem] font-semibold leading-none tracking-[-0.005em] text-[#F8F4FF]/88">
                    {transaction.name}
                  </p>
                  <p className={cn(captionText, "mt-1 truncate text-[0.625rem] leading-none")}>
                    {transaction.category} · {formatTransactionDate(transaction.transaction_date)}
                  </p>
                </div>
                <span
                  className={cn(
                    captionText,
                    "truncate whitespace-nowrap text-right text-[0.625rem] font-semibold leading-none tabular-nums",
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

function WireframeCashflowTrend({
  cashflowRange,
  isCashflowRangeOpen,
  onCashflowRangeMenuClose,
  onCashflowRangeMenuToggle,
  onCashflowRangeChange,
  summary
}: {
  cashflowRange: CashflowRange;
  isCashflowRangeOpen: boolean;
  onCashflowRangeMenuClose: () => void;
  onCashflowRangeMenuToggle: () => void;
  onCashflowRangeChange: (range: CashflowRange) => void;
  summary: DashboardSummary;
}) {
  const series = summary.monthSeries.slice(-cashflowRange);
  const rawMaxValue = Math.max(...series.flatMap((item) => [item.income, item.expense]), 0);
  const scaleMaxValue = calculateNiceMax(rawMaxValue);
  const axisLabels = [
    scaleMaxValue,
    scaleMaxValue * 0.75,
    scaleMaxValue * 0.5,
    scaleMaxValue * 0.25,
    0
  ];
  const hasCashflowData = series.some((item) => item.income > 0 || item.expense > 0);

  function calculateNiceMax(value: number) {
    if (value <= 0) {
      return 1;
    }

    const magnitude = 10 ** Math.floor(Math.log10(value));
    const normalizedValue = value / magnitude;
    const niceSteps = [1, 1.2, 1.5, 2, 3, 4, 5, 6, 8, 10];
    const niceNormalizedValue = niceSteps.find((step) => normalizedValue <= step) ?? 10;

    return niceNormalizedValue * magnitude;
  }

  function getBarHeightPercent(value: number) {
    if (value <= 0) {
      return 0;
    }

    return (value / scaleMaxValue) * 100;
  }

  function formatCompactIDR(value: number) {
    if (value >= 1_000_000) {
      return `Rp${Math.round(value / 1_000_000)}M`;
    }

    if (value >= 1_000) {
      return `Rp${Math.round(value / 1_000)}K`;
    }

    return formatCurrencyIDR(value);
  }

  function renderCashflowBar(value: number, tone: "income" | "expense") {
    const heightPercent = getBarHeightPercent(value);
    const barClass =
      tone === "income"
        ? "border-cyan-200/42 bg-[linear-gradient(180deg,rgba(34,211,238,0.82),rgba(56,189,248,0.28))] shadow-[0_0_12px_rgba(34,211,238,0.11)]"
        : "border-[#F472B6]/44 bg-[linear-gradient(180deg,rgba(236,72,153,0.82),rgba(217,70,239,0.28))] shadow-[0_0_12px_rgba(236,72,153,0.1)]";
    const labelClass = tone === "income" ? "text-cyan-100/78" : "text-[#FBCFE8]/78";

    return (
      <div className="group relative flex h-full w-full max-w-4 items-end justify-center">
        {value > 0 ? (
          <span
            className={cn(
              chartLabel,
              "pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-sm border border-[#B36BFF]/22 bg-[rgba(16,7,37,0.92)] px-1.5 py-0.5 text-[0.58rem] leading-none opacity-0 shadow-[0_8px_18px_rgba(10,10,10,0.24)] transition-opacity duration-150 group-hover:opacity-100",
              labelClass
            )}
            style={{ bottom: `calc(${heightPercent}% + 0.35rem)` }}
          >
            {formatCompactIDR(value)}
          </span>
        ) : null}
        <div
          className={cn("w-full rounded-sm border", barClass)}
          style={{ height: `${heightPercent}%` }}
          title={value > 0 ? formatCurrencyIDR(value) : "Rp0"}
        />
      </div>
    );
  }

  return (
    <WireframeCard className={cn(cashflowSurfaceClass, "h-[19rem] p-5 xl:[grid-area:cashflow]")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={cn(rightRailTitle, "truncate")}>Cashflow Trend</h3>
          <p className={cn(cardSubtitle, "mt-2 truncate")}>Pemasukan vs pengeluaran {cashflowRange} bulan terakhir</p>
        </div>
        <div className="hidden shrink-0 items-center gap-6 md:flex">
          <span className={cn(chartLabel, "text-xs font-bold text-[#9DECF6]/92")}>Pemasukan</span>
          <span className={cn(chartLabel, "text-xs font-bold text-[#F9A8D4]/92")}>Pengeluaran</span>
          <div className="relative">
            <button
              type="button"
              className={cn(
                navLabel,
                "grid h-10 w-32 grid-cols-[1rem_minmax(0,1fr)_1rem] items-center rounded-[0.9rem] border border-[rgba(91,67,129,0.58)] bg-[linear-gradient(180deg,rgba(44,31,64,0.88),rgba(29,21,41,0.8))] px-3.5 text-[#F8F4FF] shadow-[0_12px_28px_rgba(10,10,10,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none transition duration-150 hover:-translate-y-px hover:border-[#B36BFF]/46 hover:bg-[linear-gradient(180deg,rgba(50,36,74,0.96),rgba(29,21,41,0.88))] hover:shadow-[0_15px_30px_rgba(10,10,10,0.28),0_0_18px_rgba(106,44,255,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] focus-visible:border-[#D8B4FE]/58 focus-visible:shadow-[0_0_0_2px_rgba(179,107,255,0.24),0_12px_28px_rgba(10,10,10,0.22)]"
              )}
              aria-expanded={isCashflowRangeOpen}
              aria-haspopup="listbox"
              onClick={onCashflowRangeMenuToggle}
            >
              <span />
              <span className="truncate text-center">{cashflowRange} Bulan</span>
              <span
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 justify-self-end text-[0.55rem] leading-none text-[#8B5CF6] transition-colors duration-150",
                  isCashflowRangeOpen ? "text-[#B36BFF]" : "text-[#8B5CF6]"
                )}
                aria-hidden="true"
              >
                <span>▲</span>
                <span>▼</span>
              </span>
            </button>
            <div
              className={cn(
                "absolute right-0 top-12 z-20 w-32 overflow-hidden rounded-[0.95rem] border border-[#B36BFF]/22 bg-[rgba(5,5,10,0.96)] p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.42),0_0_22px_rgba(106,44,255,0.16)] backdrop-blur transition duration-150",
                isCashflowRangeOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
              )}
              role="listbox"
            >
              {cashflowRangeOptions.map((range) => {
                const isActive = cashflowRange === range;

                return (
                  <button
                    key={range}
                    type="button"
                    className={cn(
                      navLabel,
                      "flex h-10 w-full items-center justify-between rounded-[0.78rem] px-3.5 text-left text-[0.78rem] transition-colors focus-visible:bg-[rgba(179,107,255,0.16)] focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_rgba(216,180,254,0.28)]",
                      isActive
                        ? "bg-[linear-gradient(180deg,rgba(44,31,64,0.72),rgba(29,21,41,0.68))] text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] hover:bg-[linear-gradient(180deg,rgba(50,36,74,0.76),rgba(29,21,41,0.72))]"
                        : "text-[#9B89B8] hover:bg-[linear-gradient(180deg,rgba(44,31,64,0.5),rgba(29,21,41,0.36))] hover:text-[#E0B3FF]"
                    )}
                    aria-selected={isActive}
                    role="option"
                    onClick={() => {
                      onCashflowRangeChange(range);
                      onCashflowRangeMenuClose();
                    }}
                  >
                    <span>{range} Bulan</span>
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D8B4FE] shadow-[0_0_10px_rgba(216,180,254,0.5)]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 h-[12.75rem] min-w-0 pb-4">
        <div className="grid h-full min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
          <div className="flex h-full flex-col justify-between pb-9 pt-4">
            {axisLabels.map((value) => (
              <span key={value} className={cn(chartLabel, "truncate text-right text-[#9B89B8]/74")}>
                {formatCompactIDR(value)}
              </span>
            ))}
          </div>
          <div className="relative flex h-full min-w-0 items-end gap-4 rounded-sm border-b border-l border-[#B36BFF]/18 bg-[linear-gradient(rgba(224,179,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(44,31,64,0.18),rgba(10,10,10,0.04))] bg-[size:100%_25%,auto] pb-6 pl-4 pt-4">
            {series.length > 0 ? (
              series.map((item) => (
                <div key={item.key} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                  <div className="flex h-full min-w-0 items-end justify-center gap-1.5">
                    {renderCashflowBar(item.income, "income")}
                    {renderCashflowBar(item.expense, "expense")}
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
