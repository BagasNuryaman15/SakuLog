import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  type LucideIcon
} from "lucide-react";

import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { WireframeCard, WireframeSparkline } from "./dashboard-primitives";
import { getAverageExpenseMetrics } from "./dashboard-helpers";
import {
  captionText,
  cardTitle,
  kpiSurfaceToneClass,
  metricValuePlaceholder,
  type AccentTone
} from "./dashboard-style-tokens";

export function WireframeKpis({ summary }: { summary: DashboardSummary }) {
  const expenseIncomeRatio =
    summary.monthIncome > 0 ? Math.round((summary.monthExpense / summary.monthIncome) * 100) : null;
  const { dailyAverageExpense, weeklyAverageExpense } = getAverageExpenseMetrics(summary);
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
      value: dailyAverageExpense,
      tone: "violet",
      caption: "Rata-rata per hari"
    },
    {
      icon: CircleDollarSign,
      label: "Weekly average",
      value: weeklyAverageExpense,
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
