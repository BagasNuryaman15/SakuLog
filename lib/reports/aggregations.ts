import type { DateRange } from "@/lib/reports/date-ranges";
import type { Transaction } from "@/types/transaction";

export type TopExpenseCategory = {
  category: string;
  amount: number;
  percentage: number;
};

export type DashboardAggregates = {
  monthIncome: number;
  monthExpense: number;
  monthBalance: number;
  todayExpense: number;
  weekExpense: number;
  topExpenseCategory: TopExpenseCategory | null;
  recentTransactions: Transaction[];
};

function toAmount(transaction: Transaction) {
  return Number(transaction.amount) || 0;
}

function isInRange(transaction: Transaction, range: DateRange) {
  return (
    transaction.transaction_date >= range.startDate &&
    transaction.transaction_date <= range.endDate
  );
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

export function calculateRangeExpense(transactions: Transaction[], range: DateRange) {
  return calculateTotalExpense(transactions.filter((transaction) => isInRange(transaction, range)));
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

export function getRecentDashboardTransactions(transactions: Transaction[], limit = 5) {
  return transactions.slice(0, limit);
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
  const monthIncome = calculateTotalIncome(monthTransactions);
  const monthExpense = calculateTotalExpense(monthTransactions);

  return {
    monthIncome,
    monthExpense,
    monthBalance: calculateBalance(monthIncome, monthExpense),
    todayExpense: calculateRangeExpense(transactions, todayRange),
    weekExpense: calculateRangeExpense(transactions, weekRange),
    topExpenseCategory: calculateTopExpenseCategory(monthTransactions),
    recentTransactions: getRecentDashboardTransactions(transactions)
  };
}
