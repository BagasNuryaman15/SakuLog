import { describe, expect, it } from "vitest";
import {
  validateExpenseValues,
  validateIncomeValues,
  validateTransactionUpdateValues,
  normalizeOptionalText
} from "../validators";

describe("normalizeOptionalText", () => {
  it("returns null for null/undefined/empty/whitespace", () => {
    expect(normalizeOptionalText(null)).toBeNull();
    expect(normalizeOptionalText(undefined)).toBeNull();
    expect(normalizeOptionalText("")).toBeNull();
    expect(normalizeOptionalText("   ")).toBeNull();
  });

  it("returns trimmed string", () => {
    expect(normalizeOptionalText("  hello  ")).toBe("hello");
    expect(normalizeOptionalText("test")).toBe("test");
  });
});

describe("validateExpenseValues", () => {
  const validExpense = {
    name: "Makan siang",
    amount: 25000,
    category: "Makanan",
    paymentMethod: "Cash",
    transactionDate: "2025-06-10"
  };

  it("returns valid for complete values", () => {
    const result = validateExpenseValues(validExpense);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it("catches empty name", () => {
    const result = validateExpenseValues({ ...validExpense, name: "  " });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toContain("wajib diisi");
  });

  it("catches zero amount", () => {
    const result = validateExpenseValues({ ...validExpense, amount: 0 });
    expect(result.isValid).toBe(false);
    expect(result.errors.amount).toBeDefined();
  });

  it("catches negative amount", () => {
    const result = validateExpenseValues({ ...validExpense, amount: -100 });
    expect(result.isValid).toBe(false);
  });

  it("catches missing category", () => {
    const result = validateExpenseValues({ ...validExpense, category: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.category).toBeDefined();
  });

  it("catches missing paymentMethod", () => {
    const result = validateExpenseValues({ ...validExpense, paymentMethod: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.paymentMethod).toContain("pembayaran");
  });

  it("catches missing transactionDate", () => {
    const result = validateExpenseValues({ ...validExpense, transactionDate: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.transactionDate).toBeDefined();
  });
});

describe("validateIncomeValues", () => {
  const validIncome = {
    name: "Gaji",
    amount: 5000000,
    category: "Orang Tua",
    source: "Mamah",
    receiptMethod: "Transfer/M-Banking",
    transactionDate: "2025-06-01"
  };

  it("returns valid for complete values", () => {
    const result = validateIncomeValues(validIncome);
    expect(result.isValid).toBe(true);
  });

  it("catches missing source", () => {
    const result = validateIncomeValues({ ...validIncome, source: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.source).toContain("Sumber");
  });

  it("catches missing receiptMethod", () => {
    const result = validateIncomeValues({ ...validIncome, receiptMethod: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.receiptMethod).toContain("penerimaan");
  });
});

describe("validateTransactionUpdateValues", () => {
  const validUpdate = {
    type: "expense" as const,
    name: "Makan",
    amount: 25000,
    category: "Makanan",
    paymentMethod: "Cash",
    transactionDate: "2025-06-10"
  };

  it("returns valid for complete expense update", () => {
    const result = validateTransactionUpdateValues(validUpdate);
    expect(result.isValid).toBe(true);
  });

  it("uses income message for paymentMethod on income type", () => {
    const result = validateTransactionUpdateValues({
      ...validUpdate,
      type: "income",
      source: "Mamah",
      paymentMethod: ""
    });
    expect(result.errors.paymentMethod).toContain("penerimaan");
  });

  it("uses expense message for paymentMethod on expense type", () => {
    const result = validateTransactionUpdateValues({
      ...validUpdate,
      paymentMethod: ""
    });
    expect(result.errors.paymentMethod).toContain("pembayaran");
  });

  it("requires source for income type", () => {
    const result = validateTransactionUpdateValues({
      ...validUpdate,
      type: "income",
      source: ""
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.source).toContain("Sumber");
  });

  it("does not require source for expense type", () => {
    const result = validateTransactionUpdateValues(validUpdate);
    expect(result.errors.source).toBeUndefined();
  });
});
