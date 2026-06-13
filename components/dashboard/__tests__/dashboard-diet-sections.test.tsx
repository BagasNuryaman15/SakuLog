import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { DashboardDietSections } from "../dashboard-diet-sections";
import type { DashboardSummary } from "@/lib/reports/dashboard";
import type { Transaction } from "@/features/transactions/types";

function makeTransaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: crypto.randomUUID(),
    user_id: "user-1",
    type: "expense",
    name: "Test transaction",
    amount: 10000,
    category: "Makanan",
    payment_method: "Cash",
    source: null,
    transaction_date: "2026-06-10",
    note: null,
    created_at: "2026-06-10T10:00:00Z",
    updated_at: "2026-06-10T10:00:00Z",
    ...overrides
  };
}

function makeSummary(overrides: Partial<DashboardSummary> = {}): DashboardSummary {
  const recentTransactions = [
    makeTransaction({ id: "txn-1", name: "Bakso Pak Darto", payment_method: "QRIS / M-Banking" }),
    makeTransaction({ id: "txn-2", name: "Indomaret", category: "Belanja", payment_method: "Kartu Debit / ATM" }),
    makeTransaction({ id: "txn-3", name: "Kopi Kenangan", category: "Jajan", payment_method: "E-wallet" }),
    makeTransaction({ id: "txn-4", name: "Salary June", type: "income", amount: 620000, category: "Gaji", source: "Bank Transfer" }),
    makeTransaction({ id: "txn-5", name: "Grab Bike", category: "Transport", payment_method: "E-wallet" }),
    makeTransaction({ id: "txn-6", name: "Hidden sixth transaction", category: "Jajan", payment_method: "Cash" })
  ];

  return {
    monthIncome: 1,
    monthExpense: 1,
    monthBalance: 1,
    dailyAverageExpense: 1,
    weeklyAverageExpense: 1,
    todayExpense: 1,
    weekExpense: 1,
    topExpenseCategory: null,
    expenseCategoryBreakdown: [],
    recentTransactions: [],
    v15: {
      moneyStatus: {
        monthIncome: 620000,
        monthExpense: 205000,
        monthBalance: 415000,
        status: "aman"
      },
      kpis: {
        monthIncome: 620000,
        monthExpense: 205000,
        dailyAverageExpense: 29286,
        topExpenseCategory: {
          category: "Jajan",
          amount: 68000,
          percentage: 33
        }
      },
      paymentLeak: {
        paymentMethod: "QRIS / M-Banking",
        total: 185000,
        count: 7,
        percentage: 43
      },
      todayWeekSnapshot: {
        todayExpense: 63500,
        weekExpense: 186000,
        weekExpenseTransactionCount: 12,
        weekTopExpenseCategory: {
          category: "Jajan",
          amount: 68000,
          percentage: 37
        }
      },
      recentTransactions
    },
    insights: [],
    monthSeries: [],
    ...overrides
  };
}

describe("DashboardDietSections", () => {
  it("renders Dashboard V1.5 data from summary.v15", () => {
    const html = renderToStaticMarkup(<DashboardDietSections summary={makeSummary()} />);

    expect(html).toContain("Money Status");
    expect(html).toContain("Rp415.000");
    expect(html).toContain("Rp620.000");
    expect(html).toContain("Rp205.000");
    expect(html).toContain("Aman");
    expect(html).toContain("Paling bocor via QRIS / M-Banking");
    expect(html).toContain("Rp185.000");
    expect(html).toContain("43%");
    expect(html).toContain("Daily average");
    expect(html).toContain("Jajan");
    expect(html).toContain("Belanja · Kartu Debit / ATM · 10 Jun");
    expect(html).toContain("Gaji · Bank Transfer · 10 Jun");
    expect(html).toContain("Rp63.500");
    expect(html).toContain("Rp186.000");
  });

  it("renders empty states without implying safe finances", () => {
    const summary = makeSummary({
      v15: {
        moneyStatus: {
          monthIncome: 0,
          monthExpense: 0,
          monthBalance: 0,
          status: "aman"
        },
        kpis: {
          monthIncome: 0,
          monthExpense: 0,
          dailyAverageExpense: 0,
          topExpenseCategory: null
        },
        paymentLeak: null,
        todayWeekSnapshot: {
          todayExpense: 0,
          weekExpense: 0,
          weekExpenseTransactionCount: 0,
          weekTopExpenseCategory: null
        },
        recentTransactions: []
      }
    });

    const html = renderToStaticMarkup(<DashboardDietSections summary={summary} />);

    expect(html).toContain("Belum cukup data");
    expect(html).toContain("Belum ada payment leak");
    expect(html).toContain("Belum ada transaksi");
    expect(html).toContain("Belum ada pengeluaran");
  });

  it("limits recent transactions to five rows", () => {
    const html = renderToStaticMarkup(<DashboardDietSections summary={makeSummary()} />);

    expect(html).toContain("Bakso Pak Darto");
    expect(html).toContain("Grab Bike");
    expect(html).not.toContain("Hidden sixth transaction");
  });

  it("renders payment methods and income sources in recent transaction metadata", () => {
    const html = renderToStaticMarkup(<DashboardDietSections summary={makeSummary()} />);

    expect(html).toContain("Makanan · QRIS / M-Banking · 10 Jun");
    expect(html).toContain("Belanja · Kartu Debit / ATM · 10 Jun");
    expect(html).toContain("Gaji · Bank Transfer · 10 Jun");
  });

  it("formats transaction dates from YYYY-MM-DD without depending on local timezone", () => {
    const baseSummary = makeSummary();
    const summary = makeSummary({
      v15: {
        ...baseSummary.v15,
        recentTransactions: [
          makeTransaction({
            id: "stable-date",
            name: "Stable date transaction",
            category: "Makanan",
            payment_method: "Cash",
            transaction_date: "2026-06-10"
          })
        ]
      }
    });

    const html = renderToStaticMarkup(<DashboardDietSections summary={summary} />);

    expect(html).toContain("Makanan · Cash · 10 Jun");
  });

  it("does not render the legacy analytical dashboard sections", () => {
    const html = renderToStaticMarkup(<DashboardDietSections summary={makeSummary()} />);

    expect(html).not.toContain("Weekly average");
    expect(html).not.toContain("Cashflow Trend");
    expect(html).not.toContain("Money Signals");
    expect(html).not.toContain("Mini Insight");
  });
});
