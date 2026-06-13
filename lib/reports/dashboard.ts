import {
  calculateDashboardAggregates,
  type DashboardAggregates
} from "@/lib/reports/aggregations";
import {
  getCurrentMonthRange,
  getCurrentWeekRange,
  getCurrentYearRange,
  getTodayRange
} from "@/lib/reports/date-ranges";
import { generateDashboardInsights } from "@/lib/reports/insights";
import { createClient } from "@/lib/supabase/client";
import type { Transaction } from "@/features/transactions/types";

export type DashboardSummary = DashboardAggregates & {
  insights: string[];
  monthSeries: Array<{
    key: string;
    label: string;
    income: number;
    expense: number;
  }>;
};

function normalizeTransaction(transaction: Record<string, unknown>): Transaction {
  return transaction as Transaction;
}

export function getEmptyDashboardSummary(): DashboardSummary {
  const emptyAggregates = calculateDashboardAggregates({
    transactions: [],
    monthRange: getCurrentMonthRange(),
    todayRange: getTodayRange(),
    weekRange: getCurrentWeekRange()
  });

  return {
    ...emptyAggregates,
    insights: ["Mulai catat transaksi pertama kamu agar SakuLog bisa membaca pola uangmu."],
    monthSeries: getDashboardMonthSeries([])
  };
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return getEmptyDashboardSummary();
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const transactions = (data ?? []).map((transaction) => normalizeTransaction(transaction));
  const aggregates = calculateDashboardAggregates({
    transactions,
    monthRange: getCurrentMonthRange(),
    todayRange: getTodayRange(),
    weekRange: getCurrentWeekRange()
  });

  return {
    ...aggregates,
    insights: generateDashboardInsights({
      transactionCount: transactions.length,
      monthIncome: aggregates.monthIncome,
      monthExpense: aggregates.monthExpense,
      weekExpense: aggregates.weekExpense,
      topExpenseCategory: aggregates.topExpenseCategory
    }),
    monthSeries: getDashboardMonthSeries(transactions)
  };
}

export function getDashboardMonthLabel() {
  const monthRange = getCurrentMonthRange();
  const date = new Date(`${monthRange.startDate}T00:00:00`);

  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric"
  }).format(date);
}

export function getDashboardMonthSeries(transactions: Transaction[], rangeMonths = 12) {
  const yearRange = getCurrentYearRange();
  const monthFormatter = new Intl.DateTimeFormat("id-ID", { month: "short" });
  const now = new Date(`${yearRange.endDate}T00:00:00`);
  const months = Array.from({ length: rangeMonths }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (rangeMonths - 1 - index), 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    return {
      key,
      label: monthFormatter.format(date),
      income: 0,
      expense: 0
    };
  });

  transactions.forEach((transaction) => {
    const date = new Date(`${transaction.transaction_date}T00:00:00`);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const month = months.find((item) => item.key === key);

    if (!month) {
      return;
    }

    if (transaction.type === "income") {
      month.income += Number(transaction.amount) || 0;
    } else {
      month.expense += Number(transaction.amount) || 0;
    }
  });

  return months;
}
