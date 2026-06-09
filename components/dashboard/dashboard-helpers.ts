import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";

export const cashflowRangeOptions = [3, 6, 12] as const;
export type CashflowRange = (typeof cashflowRangeOptions)[number];

export type ExpenseCategoryRow = {
  category: string;
  amount: number;
  percentage: number;
  color: string;
};

export const expenseCategoryColors = ["#9A35FF", "#22D3EE", "#E14DAA", "#C7A6FF"] as const;
export const otherCategoryColor = "#6F5F86";

export function getCashflowStatus(balance: number) {
  if (balance > 0) {
    return {
      label: "Cashflow positif",
      className: "text-[#6EE7B7] drop-shadow-[0_0_16px_rgba(110,231,183,0.3)]"
    };
  }

  if (balance < 0) {
    return {
      label: "Cashflow negatif",
      className: "text-[#FF4FD8] drop-shadow-[0_0_16px_rgba(255,79,216,0.34)]"
    };
  }

  return {
    label: "Cashflow seimbang",
    className: "text-[#C7B8E8]/86 drop-shadow-[0_0_14px_rgba(199,184,232,0.16)]"
  };
}

export function getAverageExpenseMetrics(summary: DashboardSummary) {
  const elapsedDays = Math.max(new Date().getDate(), 1);
  const elapsedWeeks = Math.max(Math.ceil(elapsedDays / 7), 1);

  return {
    dailyAverageExpense: resolveAverageExpense(summary.dailyAverageExpense, summary.monthExpense, elapsedDays),
    weeklyAverageExpense: resolveAverageExpense(summary.weeklyAverageExpense, summary.monthExpense, elapsedWeeks)
  };
}

export function resolveAverageExpense(value: number, monthExpense: number, divisor: number) {
  if (Number.isFinite(value) && (value > 0 || monthExpense === 0)) {
    return value;
  }

  return monthExpense / divisor;
}

export function getExpenseCategoryRows(summary: DashboardSummary): ExpenseCategoryRow[] {
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

export function formatCategoryPercent(amount: number, totalExpense: number) {
  if (totalExpense <= 0 || amount <= 0) {
    return 0;
  }

  return Math.round((amount / totalExpense) * 100);
}

export function calculateNiceMax(value: number) {
  if (value <= 0) {
    return 1;
  }

  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalizedValue = value / magnitude;
  const niceSteps = [1, 1.2, 1.5, 2, 3, 4, 5, 6, 8, 10];
  const niceNormalizedValue = niceSteps.find((step) => normalizedValue <= step) ?? 10;

  return niceNormalizedValue * magnitude;
}

export function getBarHeightPercent(value: number, scaleMaxValue: number) {
  if (value <= 0) {
    return 0;
  }

  return (value / scaleMaxValue) * 100;
}

export function formatCompactIDR(value: number) {
  if (value >= 1_000_000) {
    return `Rp${Math.round(value / 1_000_000)}M`;
  }

  if (value >= 1_000) {
    return `Rp${Math.round(value / 1_000)}K`;
  }

  return formatCurrencyIDR(value);
}
