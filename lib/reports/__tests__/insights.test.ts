import { describe, expect, it } from "vitest";
import { generateDashboardInsights } from "../insights";

describe("generateDashboardInsights", () => {
  it("returns starter message when no transactions", () => {
    const result = generateDashboardInsights({
      transactionCount: 0,
      monthIncome: 0,
      monthExpense: 0,
      weekExpense: 0,
      topExpenseCategory: null
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("Mulai catat");
  });

  it("returns warning when expense > income with top category", () => {
    const result = generateDashboardInsights({
      transactionCount: 5,
      monthIncome: 100000,
      monthExpense: 200000,
      weekExpense: 50000,
      topExpenseCategory: { category: "Makanan", amount: 150000, percentage: 75 }
    });
    expect(result).toHaveLength(2);
    expect(result[0]).toContain("lebih besar dari pemasukan");
    expect(result[1]).toContain("Makanan");
  });

  it("returns warning when expense > income without top category", () => {
    const result = generateDashboardInsights({
      transactionCount: 5,
      monthIncome: 100000,
      monthExpense: 200000,
      weekExpense: 50000,
      topExpenseCategory: null
    });
    expect(result[1]).toContain("Tambahkan kategori");
  });

  it("returns top category insight with positive cashflow", () => {
    const result = generateDashboardInsights({
      transactionCount: 5,
      monthIncome: 500000,
      monthExpense: 200000,
      weekExpense: 50000,
      topExpenseCategory: { category: "Transport", amount: 100000, percentage: 50 }
    });
    expect(result[0]).toContain("Transport");
    expect(result[1]).toContain("positif");
  });

  it("returns positive cashflow message when no top category", () => {
    const result = generateDashboardInsights({
      transactionCount: 3,
      monthIncome: 500000,
      monthExpense: 200000,
      weekExpense: 0,
      topExpenseCategory: null
    });
    expect(result[0]).toContain("positif");
  });

  it("returns week expense message", () => {
    const result = generateDashboardInsights({
      transactionCount: 3,
      monthIncome: 200000,
      monthExpense: 200000,
      weekExpense: 50000,
      topExpenseCategory: null
    });
    expect(result[0]).toContain("minggu ini");
  });

  it("returns fallback message", () => {
    const result = generateDashboardInsights({
      transactionCount: 1,
      monthIncome: 200000,
      monthExpense: 200000,
      weekExpense: 0,
      topExpenseCategory: null
    });
    expect(result[0]).toContain("Data bulan ini");
  });
});
