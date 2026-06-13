import { describe, expect, it } from "vitest";
import type { Transaction } from "@/features/transactions/types";
import {
  calculateTotalIncome,
  calculateTotalExpense,
  calculateBalance,
  calculateRangeExpense,
  calculateTopExpenseCategory,
  calculateExpenseCategoryBreakdown,
  calculatePaymentMethodBreakdown,
  calculateTopPaymentLeak,
  getRecentDashboardTransactions,
  calculateDashboardAggregates
} from "../aggregations";

function makeTransaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: crypto.randomUUID(),
    user_id: "user-1",
    type: "expense",
    name: "Test",
    amount: 10000,
    category: "Makanan",
    payment_method: "Cash",
    source: null,
    transaction_date: "2025-06-10",
    note: null,
    created_at: "2025-06-10T00:00:00Z",
    updated_at: "2025-06-10T00:00:00Z",
    ...overrides
  };
}

describe("calculateTotalIncome", () => {
  it("returns 0 for empty array", () => {
    expect(calculateTotalIncome([])).toBe(0);
  });

  it("sums only income transactions", () => {
    const txns = [
      makeTransaction({ type: "income", amount: 5000 }),
      makeTransaction({ type: "expense", amount: 3000 }),
      makeTransaction({ type: "income", amount: 2000 })
    ];
    expect(calculateTotalIncome(txns)).toBe(7000);
  });
});

describe("calculateTotalExpense", () => {
  it("returns 0 for empty array", () => {
    expect(calculateTotalExpense([])).toBe(0);
  });

  it("sums only expense transactions", () => {
    const txns = [
      makeTransaction({ type: "expense", amount: 5000 }),
      makeTransaction({ type: "income", amount: 3000 }),
      makeTransaction({ type: "expense", amount: 2000 })
    ];
    expect(calculateTotalExpense(txns)).toBe(7000);
  });
});

describe("calculateBalance", () => {
  it("returns income minus expense", () => {
    expect(calculateBalance(10000, 3000)).toBe(7000);
    expect(calculateBalance(3000, 10000)).toBe(-7000);
    expect(calculateBalance(5000, 5000)).toBe(0);
  });
});

describe("calculateRangeExpense", () => {
  it("only counts expenses within the date range", () => {
    const txns = [
      makeTransaction({ type: "expense", amount: 1000, transaction_date: "2025-06-01" }),
      makeTransaction({ type: "expense", amount: 2000, transaction_date: "2025-06-10" }),
      makeTransaction({ type: "expense", amount: 3000, transaction_date: "2025-06-20" }),
      makeTransaction({ type: "income", amount: 9000, transaction_date: "2025-06-10" })
    ];
    const range = { startDate: "2025-06-05", endDate: "2025-06-15" };
    expect(calculateRangeExpense(txns, range)).toBe(2000);
  });
});

describe("calculateTopExpenseCategory", () => {
  it("returns null for empty array", () => {
    expect(calculateTopExpenseCategory([])).toBeNull();
  });

  it("returns null for income-only", () => {
    const txns = [makeTransaction({ type: "income", amount: 5000 })];
    expect(calculateTopExpenseCategory(txns)).toBeNull();
  });

  it("picks the highest expense category", () => {
    const txns = [
      makeTransaction({ type: "expense", amount: 3000, category: "Transport" }),
      makeTransaction({ type: "expense", amount: 7000, category: "Makanan" }),
      makeTransaction({ type: "expense", amount: 2000, category: "Transport" })
    ];
    const result = calculateTopExpenseCategory(txns);
    expect(result).not.toBeNull();
    expect(result!.category).toBe("Makanan");
    expect(result!.amount).toBe(7000);
    expect(result!.percentage).toBe(58); // 7000/12000 * 100 ≈ 58
  });
});

describe("calculateExpenseCategoryBreakdown", () => {
  it("returns empty array for no expenses", () => {
    expect(calculateExpenseCategoryBreakdown([])).toEqual([]);
  });

  it("returns sorted categories with percentages", () => {
    const txns = [
      makeTransaction({ type: "expense", amount: 6000, category: "Makanan" }),
      makeTransaction({ type: "expense", amount: 4000, category: "Transport" })
    ];
    const result = calculateExpenseCategoryBreakdown(txns);
    expect(result).toHaveLength(2);
    expect(result[0].category).toBe("Makanan");
    expect(result[0].percentage).toBe(60);
    expect(result[1].category).toBe("Transport");
    expect(result[1].percentage).toBe(40);
  });
});

describe("calculatePaymentMethodBreakdown", () => {
  it("returns empty array for empty transactions", () => {
    expect(calculatePaymentMethodBreakdown([])).toEqual([]);
  });

  it("returns empty array for income-only transactions", () => {
    const txns = [
      makeTransaction({ type: "income", amount: 5000, payment_method: "Cash" }),
      makeTransaction({ type: "income", amount: 7000, payment_method: "QRIS / M-Banking" })
    ];

    expect(calculatePaymentMethodBreakdown(txns)).toEqual([]);
  });

  it("ignores income transactions in mixed transaction sets", () => {
    const txns = [
      makeTransaction({ type: "income", amount: 9000, payment_method: "Cash" }),
      makeTransaction({ type: "expense", amount: 3000, payment_method: "Cash" }),
      makeTransaction({ type: "expense", amount: 7000, payment_method: "E-wallet" })
    ];

    expect(calculatePaymentMethodBreakdown(txns)).toEqual([
      { paymentMethod: "E-wallet", total: 7000, count: 1, percentage: 70 },
      { paymentMethod: "Cash", total: 3000, count: 1, percentage: 30 }
    ]);
  });

  it("groups multiple expense transactions with the same payment method", () => {
    const txns = [
      makeTransaction({ amount: 3000, payment_method: "Cash" }),
      makeTransaction({ amount: 2000, payment_method: " Cash " }),
      makeTransaction({ amount: 5000, payment_method: "QRIS / M-Banking" })
    ];

    expect(calculatePaymentMethodBreakdown(txns)).toEqual([
      { paymentMethod: "Cash", total: 5000, count: 2, percentage: 50 },
      { paymentMethod: "QRIS / M-Banking", total: 5000, count: 1, percentage: 50 }
    ]);
  });

  it("groups different payment methods separately", () => {
    const txns = [
      makeTransaction({ amount: 1000, payment_method: "Cash" }),
      makeTransaction({ amount: 2000, payment_method: "QRIS / M-Banking" }),
      makeTransaction({ amount: 3000, payment_method: "E-wallet" })
    ];

    expect(calculatePaymentMethodBreakdown(txns).map((item) => item.paymentMethod)).toEqual([
      "E-wallet",
      "QRIS / M-Banking",
      "Cash"
    ]);
  });

  it("falls back to Lainnya for null payment method", () => {
    const txns = [makeTransaction({ amount: 1000, payment_method: null })];

    expect(calculatePaymentMethodBreakdown(txns)).toEqual([
      { paymentMethod: "Lainnya", total: 1000, count: 1, percentage: 100 }
    ]);
  });

  it("falls back to Lainnya for undefined payment method", () => {
    const txns = [makeTransaction({ amount: 1000, payment_method: undefined })];

    expect(calculatePaymentMethodBreakdown(txns)).toEqual([
      { paymentMethod: "Lainnya", total: 1000, count: 1, percentage: 100 }
    ]);
  });

  it("falls back to Lainnya for empty or whitespace payment methods", () => {
    const txns = [
      makeTransaction({ amount: 1000, payment_method: "" }),
      makeTransaction({ amount: 2000, payment_method: "   " })
    ];

    expect(calculatePaymentMethodBreakdown(txns)).toEqual([
      { paymentMethod: "Lainnya", total: 3000, count: 2, percentage: 100 }
    ]);
  });

  it("sorts by total descending with deterministic tie ordering", () => {
    const txns = [
      makeTransaction({ amount: 5000, payment_method: "QRIS / M-Banking" }),
      makeTransaction({ amount: 9000, payment_method: "E-wallet" }),
      makeTransaction({ amount: 5000, payment_method: "Cash" })
    ];

    expect(calculatePaymentMethodBreakdown(txns).map((item) => item.paymentMethod)).toEqual([
      "E-wallet",
      "Cash",
      "QRIS / M-Banking"
    ]);
  });

  it("calculates percentages from total expenses", () => {
    const txns = [
      makeTransaction({ amount: 2500, payment_method: "Cash" }),
      makeTransaction({ amount: 7500, payment_method: "E-wallet" })
    ];

    expect(calculatePaymentMethodBreakdown(txns)).toEqual([
      { paymentMethod: "E-wallet", total: 7500, count: 1, percentage: 75 },
      { paymentMethod: "Cash", total: 2500, count: 1, percentage: 25 }
    ]);
  });

  it("uses 0 percentage when total expense is 0", () => {
    const txns = [
      makeTransaction({ amount: 0, payment_method: "Cash" }),
      makeTransaction({ amount: 0, payment_method: "E-wallet" })
    ];

    const result = calculatePaymentMethodBreakdown(txns);

    expect(result).toEqual([
      { paymentMethod: "Cash", total: 0, count: 1, percentage: 0 },
      { paymentMethod: "E-wallet", total: 0, count: 1, percentage: 0 }
    ]);
    expect(result.every((item) => Number.isFinite(item.percentage))).toBe(true);
  });

  it("does not mutate input transactions", () => {
    const txns = [
      makeTransaction({ amount: 1000, payment_method: " Cash " }),
      makeTransaction({ amount: 2000, payment_method: null })
    ];
    const before = JSON.stringify(txns);

    calculatePaymentMethodBreakdown(txns);

    expect(JSON.stringify(txns)).toBe(before);
  });
});

describe("calculateTopPaymentLeak", () => {
  it("returns the payment method with the highest total expense", () => {
    const txns = [
      makeTransaction({ amount: 4000, payment_method: "Cash" }),
      makeTransaction({ amount: 9000, payment_method: "E-wallet" }),
      makeTransaction({ amount: 1000, payment_method: "Cash" })
    ];

    expect(calculateTopPaymentLeak(txns)).toEqual({
      paymentMethod: "E-wallet",
      total: 9000,
      count: 1,
      percentage: 64
    });
  });

  it("returns null when there are no expenses", () => {
    const txns = [makeTransaction({ type: "income", amount: 5000 })];

    expect(calculateTopPaymentLeak([])).toBeNull();
    expect(calculateTopPaymentLeak(txns)).toBeNull();
  });
});

describe("getRecentDashboardTransactions", () => {
  it("returns up to limit transactions", () => {
    const txns = Array.from({ length: 10 }, (_, i) =>
      makeTransaction({ name: `Txn ${i}` })
    );
    expect(getRecentDashboardTransactions(txns, 3)).toHaveLength(3);
    expect(getRecentDashboardTransactions(txns)).toHaveLength(5); // default
  });
});

describe("calculateDashboardAggregates", () => {
  it("computes all fields for a mixed transaction set", () => {
    const txns = [
      makeTransaction({ type: "income", amount: 5000000, transaction_date: "2025-06-05", category: "Orang Tua" }),
      makeTransaction({ type: "expense", amount: 100000, transaction_date: "2025-06-05", category: "Makanan" }),
      makeTransaction({ type: "expense", amount: 50000, transaction_date: "2025-06-10", category: "Transport" })
    ];

    const result = calculateDashboardAggregates({
      transactions: txns,
      monthRange: { startDate: "2025-06-01", endDate: "2025-06-15" },
      todayRange: { startDate: "2025-06-10", endDate: "2025-06-10" },
      weekRange: { startDate: "2025-06-09", endDate: "2025-06-15" }
    });

    expect(result.monthIncome).toBe(5000000);
    expect(result.monthExpense).toBe(150000);
    expect(result.monthBalance).toBe(4850000);
    expect(result.todayExpense).toBe(50000);
    expect(result.weekExpense).toBe(50000);
    expect(result.topExpenseCategory?.category).toBe("Makanan");
    expect(result.expenseCategoryBreakdown).toHaveLength(2);
    expect(result.recentTransactions).toHaveLength(3);
  });
});
