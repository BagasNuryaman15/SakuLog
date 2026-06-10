import type { Transaction, TransactionUpdateValues } from "@/features/transactions/types";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

export function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

export function formatAmount(transaction: Transaction) {
  const prefix = transaction.type === "income" ? "+" : "-";

  return `${prefix}${currencyFormatter.format(transaction.amount)}`;
}

export function getEditValues(transaction: Transaction): TransactionUpdateValues {
  return {
    type: transaction.type,
    name: transaction.name,
    amount: transaction.amount,
    category: transaction.category,
    paymentMethod: transaction.payment_method ?? "",
    source: transaction.source ?? "",
    transactionDate: transaction.transaction_date,
    note: transaction.note ?? ""
  };
}
