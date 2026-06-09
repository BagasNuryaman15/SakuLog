import {
  calculateTotalIncome,
  calculateTotalExpense,
  calculateBalance,
  calculateTopExpenseCategory,
  calculateExpenseCategoryBreakdown,
  type ExpenseCategoryBreakdownItem
} from "@/lib/reports/aggregations";
import {
  getTodayRange,
  getCurrentWeekRange,
  getCurrentMonthRange,
  getCurrentYearRange
} from "@/lib/reports/date-ranges";
import { createClient } from "@/lib/supabase/server";
import type { Transaction } from "@/types/transaction";

export type PeriodSummary = {
  label: string;
  description: string;
  income: number;
  expense: number;
  balance: number;
  topCategory: string | null;
  categoryBreakdown: ExpenseCategoryBreakdownItem[];
};

export type ReportSummaries = {
  today: PeriodSummary;
  week: PeriodSummary;
  month: PeriodSummary;
  year: PeriodSummary;
};

function filterByRange(transactions: Transaction[], range: { startDate: string; endDate: string }) {
  return transactions.filter(
    (t) => t.transaction_date >= range.startDate && t.transaction_date <= range.endDate
  );
}

function buildPeriodSummary(
  label: string,
  description: string,
  transactions: Transaction[]
): PeriodSummary {
  const income = calculateTotalIncome(transactions);
  const expense = calculateTotalExpense(transactions);
  const top = calculateTopExpenseCategory(transactions);

  return {
    label,
    description,
    income,
    expense,
    balance: calculateBalance(income, expense),
    topCategory: top?.category ?? null,
    categoryBreakdown: calculateExpenseCategoryBreakdown(transactions)
  };
}

export async function getReportSummaries(): Promise<ReportSummaries> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return getEmptyReportSummaries();
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

  const transactions = (data ?? []) as Transaction[];
  const todayRange = getTodayRange();
  const weekRange = getCurrentWeekRange();
  const monthRange = getCurrentMonthRange();
  const yearRange = getCurrentYearRange();

  return {
    today: buildPeriodSummary("Daily", "Pulse transaksi hari ini", filterByRange(transactions, todayRange)),
    week: buildPeriodSummary("Weekly", "Pola keluar masuk 7 hari", filterByRange(transactions, weekRange)),
    month: buildPeriodSummary("Monthly", "Kategori dan cashflow bulan ini", filterByRange(transactions, monthRange)),
    year: buildPeriodSummary("Yearly", "Trend besar sepanjang tahun", filterByRange(transactions, yearRange))
  };
}

function emptyPeriod(label: string, description: string): PeriodSummary {
  return {
    label,
    description,
    income: 0,
    expense: 0,
    balance: 0,
    topCategory: null,
    categoryBreakdown: []
  };
}

export function getEmptyReportSummaries(): ReportSummaries {
  return {
    today: emptyPeriod("Daily", "Pulse transaksi hari ini"),
    week: emptyPeriod("Weekly", "Pola keluar masuk 7 hari"),
    month: emptyPeriod("Monthly", "Kategori dan cashflow bulan ini"),
    year: emptyPeriod("Yearly", "Trend besar sepanjang tahun")
  };
}
