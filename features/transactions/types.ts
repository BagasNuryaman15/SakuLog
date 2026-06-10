import type { expenseCategories, incomeCategories, incomeSources } from "@/features/transactions/constants/categories";
import type {
  expensePaymentMethods,
  incomeReceiptMethods
} from "@/features/transactions/constants/payment-methods";
import type { Tables } from "@/types/supabase";

export type TransactionType = "expense" | "income";
export type TransactionFilter = "all" | TransactionType;

export type ExpenseCategory = (typeof expenseCategories)[number];
export type IncomeCategory = (typeof incomeCategories)[number];
export type IncomeSource = (typeof incomeSources)[number];
export type ExpensePaymentMethod = (typeof expensePaymentMethods)[number];
export type IncomeReceiptMethod = (typeof incomeReceiptMethods)[number];

export type SelectOption = {
  label: string;
  value: string;
};

export type ExpenseFormValues = {
  name: string;
  amount: number;
  category: string;
  paymentMethod: string;
  transactionDate: string;
  note?: string;
};

export type IncomeFormValues = {
  name: string;
  amount: number;
  category: string;
  source: string;
  receiptMethod: string;
  transactionDate: string;
  note?: string;
};

export type Transaction = Omit<Tables<"transactions">, "type"> & {
  type: TransactionType;
};

export type TransactionUpdateValues = {
  type: TransactionType;
  name: string;
  amount: number;
  category: string;
  paymentMethod: string;
  source?: string | null;
  transactionDate: string;
  note?: string;
};
