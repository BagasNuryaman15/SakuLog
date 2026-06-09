"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  ChevronDown,
  Search,
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
  topbarCommandKeyClass,
  topbarControlClass,
  topbarCtaClass,
  topbarIconButtonClass,
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

const expenseCategoryColors = ["#9A35FF", "#22D3EE", "#E14DAA", "#C7A6FF"] as const;
const otherCategoryColor = "#6F5F86";

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
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[0.62rem] font-bold uppercase leading-none tracking-[0.18em] text-[#67E8F9]/62">
            Finance command center
          </p>
          <h1 className={cn(dashboardPageTitle, "truncate")}>Dashboard</h1>
          <p className={cn(dashboardPageSubtitle, "mt-1 truncate text-[#B9A9D8]/84")}>
            Ringkasan keuanganmu secara real-time
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
          <button
            type="button"
            className={cn(
              navLabel,
              topbarControlClass,
              "group flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md px-3 text-left text-[#9B89B8] hover:text-[#C7B8E8] lg:w-72 lg:flex-none"
            )}
            aria-label="Cari transaksi, kategori, atau insight"
          >
            <Search className="h-4 w-4 shrink-0 text-[#67E8F9]/68 transition group-hover:text-[#67E8F9]/88" />
            <span className="truncate">Cari transaksi, kategori, atau insight...</span>
            <span
              className={cn(
                topbarCommandKeyClass,
                "ml-auto hidden shrink-0 rounded-sm border px-1.5 py-1 text-[0.56rem] font-bold uppercase tracking-[0.12em] xl:inline"
              )}
            >
              Cmd K
            </span>
          </button>
          <button
            type="button"
            className={cn(
              navLabel,
              topbarControlClass,
              "group flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md px-3 text-[#C7B8E8] lg:w-40"
            )}
            aria-label="Periode aktif Juni 2026"
          >
            <SakuCalendarGlyph className="h-4 w-4 shrink-0 text-[#BFA7FF]/82" />
            <span className="truncate">Juni 2026</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#9B89B8]/72 transition group-hover:text-[#D8B4FE]" />
          </button>
          <button
            type="button"
            className={cn(
              topbarIconButtonClass,
              "group relative flex h-10 w-11 shrink-0 items-center justify-center rounded-md border"
            )}
            aria-label="Status insight dashboard"
          >
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#67E8F9] shadow-[0_0_10px_rgba(103,232,249,0.55)]" />
            <SignalCoreGlyph className="h-[1.125rem] w-[1.125rem] text-[#D8B4FE]/78 transition group-hover:text-[#F8F4FF]" />
          </button>
          <button
            type="button"
            className={cn(
              navLabel,
              topbarCtaClass,
              "group h-10 w-full shrink-0 rounded-md border px-4 lg:w-44"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              <TransactionNodeGlyph className="h-4 w-4 text-[#F8F4FF]/90 transition group-hover:text-white" />
              Tambah Transaksi
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function SakuCalendarGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.5v3M17 4.5v3M5.5 9h13M7.25 5.75h9.5c1.25 0 2 .75 2 2v9.5c0 1.25-.75 2-2 2h-9.5c-1.25 0-2-.75-2-2v-9.5c0-1.25.75-2 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
      <path
        d="M8.5 12.25h1.25M11.35 12.25h1.3M14.25 12.25h1.25M8.5 15.25h1.25M11.35 15.25h1.3M14.25 15.25h1.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.15"
      />
    </svg>
  );
}

function SignalCoreGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 14.75 12 9l5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
      <path
        d="M7 14.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM17 10.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
    </svg>
  );
}

function TransactionNodeGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.75 7.75h11.5c1.25 0 2 .75 2 2v6.5c0 1.25-.75 2-2 2H5.75c-1.25 0-2-.75-2-2v-6.5c0-1.25.75-2 2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
      <path
        d="M7.5 7.75V6.5c0-1.05.7-1.75 1.75-1.75h5.5c1.05 0 1.75.7 1.75 1.75v1.25M12 10.75v4.5M9.75 13h4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
    </svg>
  );
}

function WireframeHero({ summary }: { summary: DashboardSummary }) {
  const isCashflowNegative = summary.monthBalance < 0;

  return (
    <WireframeCard className={cn(heroSurfaceClass, "relative h-[26rem] overflow-hidden p-5 xl:[grid-area:hero]")}>
      <div className="pointer-events-none absolute -right-20 -top-12 h-[24rem] w-[26.75rem] opacity-90 [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.28)_10%,black_24%,black_100%)]">
        <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(146,82,255,0.13),rgba(34,211,238,0.055)_39%,transparent_70%)] blur-3xl" />
        <div className="absolute left-20 top-[13.4rem] h-px w-72 rotate-[-11deg] bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.18),rgba(179,107,255,0.14),transparent)] blur-[1px]" />
        <div className="absolute left-24 top-[15.4rem] h-px w-64 rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(179,107,255,0.16),rgba(34,211,238,0.12),transparent)] blur-[1px]" />
        <span className="absolute right-[5.5rem] top-[5.75rem] h-1.5 w-1.5 rounded-full bg-[#E0B3FF]/80 shadow-[0_0_18px_rgba(224,179,255,0.8)]" />
        <span className="absolute right-[8.5rem] top-[18.5rem] h-1 w-1 rounded-full bg-[#67E8F9]/70 shadow-[0_0_16px_rgba(103,232,249,0.7)]" />
        <span className="absolute right-[19rem] top-[15.5rem] h-1 w-1 rounded-full bg-[#B36BFF]/65 shadow-[0_0_14px_rgba(179,107,255,0.65)]" />
        <Image
          src="/assets/illustrations/sakulog-hero-core.png"
          alt=""
          fill
          sizes="24rem"
          className="object-contain opacity-92 mix-blend-screen drop-shadow-[0_0_22px_rgba(154,53,255,0.22)]"
          priority
        />
      </div>
      <div className="pointer-events-none absolute right-8 top-40 h-px w-56 rotate-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.34),rgba(176,64,255,0.24),transparent)] blur-[1px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,5,0.96)_0%,rgba(3,3,5,0.82)_43%,rgba(3,3,5,0.24)_72%,rgba(3,3,5,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(5,4,8,0.86))]" />

      <div className="relative z-10 flex h-full min-w-0 flex-col">
        <p className={cn(brandTitle, "truncate")}>SakuLog Console</p>
        <div className="mt-6 flex min-h-0 flex-1 min-w-0 flex-col">
          <h2 className={cn(heroHeadline, "mt-7 max-w-md")}>Know where your money moves.</h2>
          <p className={cn(heroBody, "mt-5 max-w-md pr-16")}>
            Pantau saldo bulan ini, baca arah cashflow, dan lihat uangmu bergerak tanpa noise.
          </p>

          <div className={cn(cardClass, nestedSurfaceClass, "mt-auto p-5")}>
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    metricLabel,
                    "truncate text-xs font-bold text-[#67E8F9] drop-shadow-[0_0_16px_rgba(34,211,238,0.38)]"
                  )}
                >
                  Sisa uang bulan ini
                </p>
                <p className={cn(metricValuePlaceholder, "mt-4 max-w-full truncate whitespace-nowrap")}>
                  {formatCurrencyIDR(summary.monthBalance)}
                </p>
                <p
                  className={cn(
                    captionText,
                    "mt-4 truncate text-xs font-bold",
                    isCashflowNegative
                      ? "text-[#FF4FD8] drop-shadow-[0_0_16px_rgba(255,79,216,0.34)]"
                      : "text-[#6EE7B7] drop-shadow-[0_0_16px_rgba(110,231,183,0.3)]"
                  )}
                >
                  {isCashflowNegative ? "Cashflow negatif" : "Cashflow positif"}
                </p>
              </div>
              <WireframeBlock className="h-12 w-12 shrink-0" tone="primary" />
            </div>
          </div>
        </div>
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
      label: "Daily average",
      value: summary.dailyAverageExpense,
      tone: "violet",
      caption: "Rata-rata per hari"
    },
    {
      icon: CircleDollarSign,
      label: "Weekly average",
      value: summary.weeklyAverageExpense,
      tone: "blueViolet",
      caption: "Rata-rata per minggu"
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
    cyan: "border-teal-200/24 bg-teal-300/10 text-teal-100 shadow-[0_0_12px_rgba(45,212,191,0.08)]",
    violet: "border-[#B36BFF]/26 bg-[#7B00D4]/10 text-[#E0B3FF] shadow-[0_0_12px_rgba(176,64,255,0.09)]",
    magenta: "border-[#F9A8D4]/24 bg-[#BA319F]/10 text-[#FBCFE8] shadow-[0_0_12px_rgba(244,114,182,0.08)]",
    blueViolet: "border-indigo-200/24 bg-indigo-400/10 text-indigo-100 shadow-[0_0_12px_rgba(129,140,248,0.08)]"
  };

  return (
    <WireframeCard className={cn(kpiSurfaceToneClass[tone], "flex h-[13rem] flex-col p-4 xl:h-full")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border", badgeClass[tone])}>
          <Icon className="h-4 w-4" strokeWidth={2.35} />
        </div>
      </div>
      <h3 className={cn(cardTitle, "mt-3 line-clamp-1 text-sm font-bold text-[#F8F4FF]/92")}>{label}</h3>
      <p className={cn(metricValuePlaceholder, "mt-2 max-w-full truncate whitespace-nowrap text-xl")}>
        {formatCurrencyIDR(value)}
      </p>
      <p
        className={cn(
          captionText,
          "mt-2 h-4 truncate",
          captionTone === "negative"
            ? "text-[#F9A8D4]/86"
            : captionTone === "positive"
              ? "text-emerald-200/82"
              : "text-[#B9A9D8]/86"
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
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}66` }}
                />
                <span className="truncate text-[0.625rem] font-semibold leading-none tracking-[-0.005em] text-[#F8F4FF]/88">
                  {item.category}
                </span>
                <span
                  className="truncate whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#C7B8E8]/84 tabular-nums"
                >
                  {formatCurrencyIDR(item.amount)}
                </span>
                <span
                  className="whitespace-nowrap text-right text-[0.625rem] font-semibold leading-none tracking-normal tabular-nums"
                  style={{ color: item.color }}
                >
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
      <div className="mt-2.5 flex h-7 items-center justify-center rounded-md border border-[rgba(199,166,255,0.16)] bg-[rgba(18,15,28,0.64)]">
        <span className={cn(navLabel, "text-[#C7B8E8]/82")}>Lihat semua kategori</span>
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
  const rows: ExpenseCategoryRow[] = topCategories.map((item, index) => ({
    category: item.category,
    amount: item.amount,
    percentage: formatCategoryPercent(item.amount, totalExpense),
    color: expenseCategoryColors[index] ?? otherCategoryColor
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
  const segmentGap = rows.length > 1 ? 2.8 : 0;
  let segmentOffset = 0;
  const hasExpenses = totalExpense > 0 && rows.length > 0;

  return (
    <svg
      className="h-[5.85rem] w-[5.85rem] shrink-0 drop-shadow-[0_0_18px_rgba(154,53,255,0.16)]"
      viewBox="0 0 88 88"
      aria-hidden="true"
    >
      <circle
        cx="44"
        cy="44"
        fill="none"
        r={radius}
        stroke="rgba(199,166,255,0.12)"
        strokeWidth="9"
      />
      {hasExpenses
        ? rows.map((item) => {
            const segmentLength = (item.amount / totalExpense) * circumference;
            const visibleSegmentLength = Math.max(segmentLength - segmentGap, 0);
            const dashOffset = -(segmentOffset + segmentGap / 2);
            segmentOffset += segmentLength;

            return (
              <circle
                key={item.category}
                cx="44"
                cy="44"
                fill="none"
                r={radius}
                stroke={item.color}
                strokeDasharray={`${visibleSegmentLength} ${circumference - visibleSegmentLength}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
                strokeWidth="9"
                transform="rotate(-90 44 44)"
              />
            );
          })
        : null}
      <circle cx="44" cy="44" fill="rgba(5,5,10,0.88)" r="20" />
      <circle cx="44" cy="44" fill="none" r="19.5" stroke="rgba(199,166,255,0.1)" strokeWidth="1" />
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
        <span className={cn(captionText, "shrink-0 truncate text-[#C7B8E8]/76")}>Lihat semua</span>
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
        <MiniInsightBlackhole />
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

function MiniInsightBlackhole() {
  return (
    <div
      className="relative h-12 overflow-hidden rounded-md border border-[#B36BFF]/16 bg-[radial-gradient(circle_at_50%_50%,rgba(103,232,249,0.055),rgba(10,9,16,0.92)_56%,rgba(5,5,10,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_14px_rgba(123,0,212,0.045)]"
      aria-hidden="true"
    >
      <span className="absolute left-3 top-2 h-1 w-1 rounded-full bg-[#D8B4FE]/50 shadow-[0_0_9px_rgba(216,180,254,0.32)]" />
      <span className="absolute right-4 top-3 h-0.5 w-0.5 rounded-full bg-cyan-200/55 shadow-[0_0_8px_rgba(103,232,249,0.32)]" />
      <span className="absolute bottom-2 left-5 h-0.5 w-0.5 rounded-full bg-[#B36BFF]/45 shadow-[0_0_8px_rgba(179,107,255,0.28)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 76 48" fill="none">
        <path
          d="M9 28C20 18 34 16 47 19C58 21 66 25 70 27C60 25 52 26 43 29C31 33 19 34 9 28Z"
          fill="url(#mini-insight-disk)"
          opacity="0.62"
        />
        <path
          d="M8 28C18 33 31 33 43 29C52 26 61 25 70 27"
          stroke="url(#mini-insight-cyan)"
          strokeLinecap="round"
          strokeWidth="1.25"
          opacity="0.46"
        />
        <path
          d="M14 23C26 12 46 12 57 22"
          stroke="url(#mini-insight-violet)"
          strokeLinecap="round"
          strokeWidth="1.4"
          opacity="0.58"
        />
        <path
          d="M20 18C30 9 47 12 55 23"
          stroke="#B36BFF"
          strokeLinecap="round"
          strokeWidth="0.9"
          opacity="0.42"
        />
        <circle cx="38" cy="25" r="10" fill="url(#mini-insight-core)" />
        <circle cx="38" cy="25" r="10.5" stroke="#D8B4FE" strokeOpacity="0.18" />
        <defs>
          <linearGradient id="mini-insight-disk" x1="9" y1="24" x2="70" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67E8F9" stopOpacity="0" />
            <stop offset="0.36" stopColor="#B36BFF" stopOpacity="0.62" />
            <stop offset="0.68" stopColor="#7C3AED" stopOpacity="0.44" />
            <stop offset="1" stopColor="#F472B6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mini-insight-cyan" x1="8" y1="30" x2="70" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67E8F9" stopOpacity="0" />
            <stop offset="0.5" stopColor="#67E8F9" />
            <stop offset="1" stopColor="#B36BFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mini-insight-violet" x1="14" y1="19" x2="57" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B36BFF" stopOpacity="0" />
            <stop offset="0.52" stopColor="#D8B4FE" />
            <stop offset="1" stopColor="#B36BFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="mini-insight-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 25) rotate(90) scale(10)">
            <stop offset="0.46" stopColor="#050408" />
            <stop offset="0.78" stopColor="#0B0618" />
            <stop offset="1" stopColor="#2A104A" />
          </radialGradient>
        </defs>
      </svg>
    </div>
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
        <span className={cn(captionText, "shrink-0 truncate text-[#C7B8E8]/76")}>Lihat semua</span>
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
        <div className="mt-4 rounded-md border border-[rgba(91,67,129,0.34)] bg-[rgba(14,12,22,0.56)] p-3">
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
        ? "border-cyan-100/55 bg-[linear-gradient(180deg,rgba(151,245,255,0.98),rgba(34,211,238,0.72)_48%,rgba(8,145,178,0.38))] shadow-[0_0_24px_rgba(34,211,238,0.28),0_0_46px_rgba(34,211,238,0.11),inset_0_1px_0_rgba(255,255,255,0.26)]"
        : "border-[#FBCFE8]/48 bg-[linear-gradient(180deg,rgba(253,186,233,0.98),rgba(225,77,170,0.72)_48%,rgba(190,24,93,0.38))] shadow-[0_0_24px_rgba(236,72,153,0.26),0_0_46px_rgba(217,70,239,0.1),inset_0_1px_0_rgba(255,255,255,0.22)]";
    const labelClass = tone === "income" ? "text-cyan-100/78" : "text-[#FBCFE8]/78";

    return (
      <div className="group relative flex h-full w-full max-w-5 items-end justify-center">
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
          className={cn("relative w-full overflow-hidden rounded-sm border", barClass)}
          style={{ height: `${heightPercent}%` }}
          title={value > 0 ? formatCurrencyIDR(value) : "Rp0"}
        >
          <span className="absolute inset-x-[2px] top-1 h-1/3 rounded-full bg-white/24 blur-[2px]" />
        </div>
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
          <span className={cn(chartLabel, "inline-flex items-center gap-2 text-xs font-bold text-[#9DECF6]/92")}>
            <CashflowLegendDot tone="income" />
            Pemasukan
          </span>
          <span className={cn(chartLabel, "inline-flex items-center gap-2 text-xs font-bold text-[#F9A8D4]/92")}>
            <CashflowLegendDot tone="expense" />
            Pengeluaran
          </span>
          <div className="relative">
            <button
              type="button"
              className={cn(
                navLabel,
                "grid h-10 w-32 grid-cols-[1rem_minmax(0,1fr)_1rem] items-center rounded-[0.9rem] border border-[rgba(91,67,129,0.42)] bg-[linear-gradient(180deg,rgba(22,18,34,0.9),rgba(11,10,18,0.86))] px-3.5 text-[#F8F4FF] shadow-[0_12px_28px_rgba(10,10,10,0.24),inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition duration-150 hover:-translate-y-px hover:border-[#B36BFF]/34 hover:bg-[linear-gradient(180deg,rgba(28,22,43,0.94),rgba(12,10,20,0.9))] hover:shadow-[0_15px_30px_rgba(10,10,10,0.3),0_0_14px_rgba(106,44,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:border-[#D8B4FE]/48 focus-visible:shadow-[0_0_0_2px_rgba(179,107,255,0.2),0_12px_28px_rgba(10,10,10,0.22)]"
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
                "absolute right-0 top-12 z-20 w-32 overflow-hidden rounded-[0.95rem] border border-[#B36BFF]/16 bg-[rgba(5,5,10,0.97)] p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.46),0_0_16px_rgba(106,44,255,0.09)] backdrop-blur transition duration-150",
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
                        ? "bg-[linear-gradient(180deg,rgba(28,22,43,0.72),rgba(12,10,20,0.7))] text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[linear-gradient(180deg,rgba(34,26,52,0.74),rgba(14,12,22,0.72))]"
                        : "text-[#9B89B8] hover:bg-[linear-gradient(180deg,rgba(24,19,36,0.5),rgba(12,10,20,0.38))] hover:text-[#E0B3FF]"
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
          <div className="relative flex h-full min-w-0 items-end gap-4 overflow-hidden rounded-sm border border-[#B36BFF]/12 bg-[linear-gradient(rgba(199,166,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(199,166,255,0.018)_1px,transparent_1px),linear-gradient(180deg,rgba(18,15,28,0.22),rgba(5,5,10,0.08))] bg-[size:100%_25%,16.666%_100%,auto] pb-6 pl-4 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),inset_0_-28px_60px_rgba(123,0,212,0.026)]">
            <span className="pointer-events-none absolute inset-x-4 bottom-9 h-px bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.24),rgba(199,166,255,0.18),transparent)]" />
            <span className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(199,166,255,0.08),transparent)]" />
            {series.length > 0 ? (
              series.map((item) => {
                const hasMonthData = item.income > 0 || item.expense > 0;

                return (
                  <div key={item.key} className="relative flex h-full min-w-0 flex-1 flex-col justify-end">
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(199,166,255,0.16),transparent)]",
                        hasMonthData ? "opacity-45" : "opacity-20"
                      )}
                    />
                    <div className="relative flex h-full min-w-0 items-end justify-center gap-1.5">
                      {renderCashflowBar(item.income, "income")}
                      {renderCashflowBar(item.expense, "expense")}
                    </div>
                    <span className={cn(chartLabel, "relative mx-auto mt-3 max-w-10 truncate text-center text-[#9B89B8]/78")}>
                      {item.label}
                    </span>
                  </div>
                );
              })
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
              <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-md border border-[rgba(91,67,129,0.32)] bg-[rgba(8,7,13,0.76)] px-3 py-2 text-center">
                <p className={cn(captionText, "text-[#C7B8E8]/82")}>Belum ada arus kas pada 6 bulan terakhir.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </WireframeCard>
  );
}

function CashflowLegendDot({ tone }: { tone: "income" | "expense" }) {
  return (
    <span
      className={cn(
        "h-2 w-2 rounded-full",
        tone === "income"
          ? "bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.42)]"
          : "bg-[#F472B6] shadow-[0_0_12px_rgba(236,72,153,0.42)]"
      )}
    />
  );
}
