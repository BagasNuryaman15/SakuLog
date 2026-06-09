import { describe, expect, it } from "vitest";
import {
  getCashflowStatus,
  resolveAverageExpense,
  getExpenseCategoryRows,
  formatCategoryPercent,
  calculateNiceMax,
  getBarHeightPercent,
  formatCompactIDR
} from "../dashboard-helpers";
import type { DashboardSummary } from "@/lib/reports/dashboard";

function makeEmptySummary(overrides: Partial<DashboardSummary> = {}): DashboardSummary {
  return {
    monthIncome: 0,
    monthExpense: 0,
    monthBalance: 0,
    dailyAverageExpense: 0,
    weeklyAverageExpense: 0,
    todayExpense: 0,
    weekExpense: 0,
    topExpenseCategory: null,
    expenseCategoryBreakdown: [],
    recentTransactions: [],
    insights: [],
    monthSeries: [],
    ...overrides
  };
}

describe("getCashflowStatus", () => {
  it("returns positive for positive balance", () => {
    const result = getCashflowStatus(100000);
    expect(result.label).toBe("Cashflow positif");
    expect(result.className).toContain("#6EE7B7");
  });

  it("returns negative for negative balance", () => {
    const result = getCashflowStatus(-50000);
    expect(result.label).toBe("Cashflow negatif");
    expect(result.className).toContain("#FF4FD8");
  });

  it("returns balanced for zero", () => {
    const result = getCashflowStatus(0);
    expect(result.label).toBe("Cashflow seimbang");
  });
});

describe("resolveAverageExpense", () => {
  it("returns value when finite and positive", () => {
    expect(resolveAverageExpense(5000, 150000, 30)).toBe(5000);
  });

  it("returns value when zero and monthExpense is zero", () => {
    expect(resolveAverageExpense(0, 0, 30)).toBe(0);
  });

  it("falls back to division when value is zero but monthExpense is positive", () => {
    expect(resolveAverageExpense(0, 150000, 30)).toBe(5000);
  });

  it("falls back to division when value is non-finite", () => {
    expect(resolveAverageExpense(Infinity, 150000, 30)).toBe(5000);
    expect(resolveAverageExpense(NaN, 150000, 30)).toBe(5000);
  });
});

describe("getExpenseCategoryRows", () => {
  it("returns empty array for no expenses", () => {
    expect(getExpenseCategoryRows(makeEmptySummary())).toEqual([]);
  });

  it("returns rows with colors for categories", () => {
    const summary = makeEmptySummary({
      monthExpense: 10000,
      expenseCategoryBreakdown: [
        { category: "Makanan", amount: 6000, percentage: 60 },
        { category: "Transport", amount: 4000, percentage: 40 }
      ]
    });
    const rows = getExpenseCategoryRows(summary);
    expect(rows).toHaveLength(2);
    expect(rows[0].category).toBe("Makanan");
    expect(rows[0].color).toBe("#9A35FF");
    expect(rows[1].color).toBe("#22D3EE");
  });

  it("groups categories beyond top 4 into Lainnya", () => {
    const summary = makeEmptySummary({
      monthExpense: 15000,
      expenseCategoryBreakdown: [
        { category: "A", amount: 5000, percentage: 33 },
        { category: "B", amount: 3000, percentage: 20 },
        { category: "C", amount: 3000, percentage: 20 },
        { category: "D", amount: 2000, percentage: 13 },
        { category: "E", amount: 1000, percentage: 7 },
        { category: "F", amount: 1000, percentage: 7 }
      ]
    });
    const rows = getExpenseCategoryRows(summary);
    expect(rows).toHaveLength(5); // 4 + Lainnya
    expect(rows[4].category).toBe("Lainnya");
    expect(rows[4].amount).toBe(2000);
  });
});

describe("formatCategoryPercent", () => {
  it("returns 0 for zero expense or amount", () => {
    expect(formatCategoryPercent(0, 10000)).toBe(0);
    expect(formatCategoryPercent(5000, 0)).toBe(0);
  });

  it("rounds correctly", () => {
    expect(formatCategoryPercent(3333, 10000)).toBe(33);
    expect(formatCategoryPercent(6667, 10000)).toBe(67);
  });
});

describe("calculateNiceMax", () => {
  it("returns 1 for zero", () => {
    expect(calculateNiceMax(0)).toBe(1);
  });

  it("returns 1 for negative", () => {
    expect(calculateNiceMax(-100)).toBe(1);
  });

  it("snaps to nice round numbers", () => {
    expect(calculateNiceMax(95)).toBe(100);
    expect(calculateNiceMax(450000)).toBe(500000);
    expect(calculateNiceMax(1100000)).toBe(1200000);
    expect(calculateNiceMax(7500000)).toBe(8000000);
  });
});

describe("getBarHeightPercent", () => {
  it("returns 0 for zero value", () => {
    expect(getBarHeightPercent(0, 100)).toBe(0);
  });

  it("returns 0 for negative value", () => {
    expect(getBarHeightPercent(-50, 100)).toBe(0);
  });

  it("returns correct percentage", () => {
    expect(getBarHeightPercent(50, 100)).toBe(50);
    expect(getBarHeightPercent(100, 100)).toBe(100);
    expect(getBarHeightPercent(25, 200)).toBe(12.5);
  });
});

describe("formatCompactIDR", () => {
  it("formats millions", () => {
    expect(formatCompactIDR(5000000)).toBe("Rp5M");
    expect(formatCompactIDR(1500000)).toBe("Rp2M"); // rounds
  });

  it("formats thousands", () => {
    expect(formatCompactIDR(50000)).toBe("Rp50K");
    expect(formatCompactIDR(1500)).toBe("Rp2K"); // rounds
  });

  it("formats small values with full IDR", () => {
    const result = formatCompactIDR(500);
    expect(result).toContain("500");
  });
});
