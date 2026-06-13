import type { DateRange } from "@/lib/reports/date-ranges";
import type { Transaction } from "@/features/transactions/types";

export type TopExpenseCategory = {
  category: string;
  amount: number;
  percentage: number;
};

export type ExpenseCategoryBreakdownItem = {
  category: string;
  amount: number;
  percentage: number;
};

export type PaymentMethodBreakdownItem = {
  paymentMethod: string;
  total: number;
  count: number;
  percentage: number;
};

export type FinancialStatus = "aman" | "waspada" | "minus";

export type DashboardMoneyStatus = {
  monthIncome: number;
  monthExpense: number;
  monthBalance: number;
  status: FinancialStatus;
};

export type DashboardKpis = {
  monthIncome: number;
  monthExpense: number;
  dailyAverageExpense: number;
  topExpenseCategory: TopExpenseCategory | null;
};

export type DashboardTodayWeekSnapshot = {
  todayExpense: number;
  weekExpense: number;
  weekExpenseTransactionCount: number;
  weekTopExpenseCategory: TopExpenseCategory | null;
};

export type DashboardV15Data = {
  moneyStatus: DashboardMoneyStatus;
  kpis: DashboardKpis;
  paymentLeak: PaymentMethodBreakdownItem | null;
  todayWeekSnapshot: DashboardTodayWeekSnapshot;
  recentTransactions: Transaction[];
};

export type DashboardAggregates = {
  monthIncome: number;
  monthExpense: number;
  monthBalance: number;
  dailyAverageExpense: number;
  weeklyAverageExpense: number;
  todayExpense: number;
  weekExpense: number;
  topExpenseCategory: TopExpenseCategory | null;
  expenseCategoryBreakdown: ExpenseCategoryBreakdownItem[];
  recentTransactions: Transaction[];
  v15: DashboardV15Data;
};

function toAmount(transaction: Transaction) {
  const amount = Number(transaction.amount);

  return Number.isFinite(amount) ? amount : 0;
}

function toExpenseAmount(transaction: Transaction) {
  const amount = toAmount(transaction);

  return Number.isFinite(amount) ? Math.max(amount, 0) : 0;
}

function normalizePaymentMethod(paymentMethod: Transaction["payment_method"] | undefined) {
  const normalized = paymentMethod?.trim();

  return normalized || "Lainnya";
}

function isInRange(transaction: Transaction, range: DateRange) {
  return (
    transaction.transaction_date >= range.startDate &&
    transaction.transaction_date <= range.endDate
  );
}

function getElapsedDays(range: DateRange) {
  const startDate = new Date(`${range.startDate}T00:00:00`);
  const endDate = new Date(`${range.endDate}T00:00:00`);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const elapsedDays = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay) + 1;

  return Math.max(elapsedDays, 1);
}

function getExpenses(transactions: Transaction[]) {
  return transactions.filter((transaction) => transaction.type === "expense");
}

function getIncome(transactions: Transaction[]) {
  return transactions.filter((transaction) => transaction.type === "income");
}

export function calculateTotalIncome(transactions: Transaction[]) {
  return getIncome(transactions).reduce((total, transaction) => total + toAmount(transaction), 0);
}

export function calculateTotalExpense(transactions: Transaction[]) {
  return getExpenses(transactions).reduce((total, transaction) => total + toAmount(transaction), 0);
}

export function calculateBalance(income: number, expense: number) {
  return income - expense;
}

export function calculateFinancialStatus({
  income,
  expense
}: {
  income: number;
  expense: number;
}): FinancialStatus {
  if (expense > income) {
    return "minus";
  }

  // Dashboard V1.5 keeps the status simple: 80% of income is the warning line.
  if (income > 0 && expense >= income * 0.8) {
    return "waspada";
  }

  return "aman";
}

export function calculateRangeExpense(transactions: Transaction[], range: DateRange) {
  return calculateTotalExpense(transactions.filter((transaction) => isInRange(transaction, range)));
}

export function calculateRangeExpenseTransactionCount(transactions: Transaction[], range: DateRange) {
  return getExpenses(transactions.filter((transaction) => isInRange(transaction, range))).length;
}

export function calculateTopExpenseCategory(transactions: Transaction[]): TopExpenseCategory | null {
  const categoryTotals = getExpenses(transactions).reduce<Record<string, number>>((result, transaction) => {
    result[transaction.category] = (result[transaction.category] ?? 0) + toAmount(transaction);
    return result;
  }, {});
  const totalExpense = Object.values(categoryTotals).reduce((total, amount) => total + amount, 0);
  const [category, amount] =
    Object.entries(categoryTotals).sort((current, next) => next[1] - current[1])[0] ?? [];

  if (!category || !amount || totalExpense === 0) {
    return null;
  }

  return {
    category,
    amount,
    percentage: Math.round((amount / totalExpense) * 100)
  };
}

export function calculateExpenseCategoryBreakdown(transactions: Transaction[]): ExpenseCategoryBreakdownItem[] {
  const categoryTotals = getExpenses(transactions).reduce<Record<string, number>>((result, transaction) => {
    result[transaction.category] = (result[transaction.category] ?? 0) + toAmount(transaction);
    return result;
  }, {});
  const totalExpense = Object.values(categoryTotals).reduce((total, amount) => total + amount, 0);

  if (totalExpense === 0) {
    return [];
  }

  return Object.entries(categoryTotals)
    .filter(([, amount]) => amount > 0)
    .sort((current, next) => next[1] - current[1])
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: Math.round((amount / totalExpense) * 100)
    }));
}

export function calculatePaymentMethodBreakdown(transactions: Transaction[]): PaymentMethodBreakdownItem[] {
  const methodTotals = getExpenses(transactions).reduce<Record<string, { total: number; count: number }>>(
    (result, transaction) => {
      const paymentMethod = normalizePaymentMethod(transaction.payment_method);
      const current = result[paymentMethod] ?? { total: 0, count: 0 };

      result[paymentMethod] = {
        total: current.total + toExpenseAmount(transaction),
        count: current.count + 1
      };

      return result;
    },
    {}
  );
  const totalExpense = Object.values(methodTotals).reduce((total, item) => total + item.total, 0);

  return Object.entries(methodTotals)
    .map(([paymentMethod, item]) => ({
      paymentMethod,
      total: item.total,
      count: item.count,
      percentage: totalExpense > 0 ? Math.round((item.total / totalExpense) * 100) : 0
    }))
    .sort((current, next) => {
      if (next.total !== current.total) {
        return next.total - current.total;
      }

      return current.paymentMethod.localeCompare(next.paymentMethod);
    });
}

export function calculateTopPaymentLeak(transactions: Transaction[]): PaymentMethodBreakdownItem | null {
  return calculatePaymentMethodBreakdown(transactions)[0] ?? null;
}

export function getRecentDashboardTransactions(transactions: Transaction[], limit = 5) {
  return [...transactions]
    .sort((current, next) => {
      if (next.transaction_date !== current.transaction_date) {
        return next.transaction_date.localeCompare(current.transaction_date);
      }

      return next.created_at.localeCompare(current.created_at);
    })
    .slice(0, limit);
}

export function calculateDashboardAggregates({
  transactions,
  monthRange,
  todayRange,
  weekRange
}: {
  transactions: Transaction[];
  monthRange: DateRange;
  todayRange: DateRange;
  weekRange: DateRange;
}): DashboardAggregates {
  const monthTransactions = transactions.filter((transaction) => isInRange(transaction, monthRange));
  const weekTransactions = transactions.filter((transaction) => isInRange(transaction, weekRange));
  const monthIncome = calculateTotalIncome(monthTransactions);
  const monthExpense = calculateTotalExpense(monthTransactions);
  const monthBalance = calculateBalance(monthIncome, monthExpense);
  const elapsedMonthDays = getElapsedDays(monthRange);
  const elapsedMonthWeeks = Math.max(Math.ceil(elapsedMonthDays / 7), 1);
  const dailyAverageExpense = monthExpense / elapsedMonthDays;
  const weeklyAverageExpense = monthExpense / elapsedMonthWeeks;
  const todayExpense = calculateRangeExpense(transactions, todayRange);
  const weekExpense = calculateRangeExpense(transactions, weekRange);
  const topExpenseCategory = calculateTopExpenseCategory(monthTransactions);
  const recentTransactions = getRecentDashboardTransactions(transactions);

  return {
    monthIncome,
    monthExpense,
    monthBalance,
    dailyAverageExpense,
    weeklyAverageExpense,
    todayExpense,
    weekExpense,
    topExpenseCategory,
    expenseCategoryBreakdown: calculateExpenseCategoryBreakdown(monthTransactions),
    recentTransactions,
    v15: {
      moneyStatus: {
        monthIncome,
        monthExpense,
        monthBalance,
        status: calculateFinancialStatus({ income: monthIncome, expense: monthExpense })
      },
      kpis: {
        monthIncome,
        monthExpense,
        dailyAverageExpense,
        topExpenseCategory
      },
      paymentLeak: calculateTopPaymentLeak(monthTransactions),
      todayWeekSnapshot: {
        todayExpense,
        weekExpense,
        weekExpenseTransactionCount: calculateRangeExpenseTransactionCount(transactions, weekRange),
        weekTopExpenseCategory: calculateTopExpenseCategory(weekTransactions)
      },
      recentTransactions
    }
  };
}
