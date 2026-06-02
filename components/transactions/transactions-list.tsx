"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDownLeft, ArrowUpRight, Loader2, Pencil, Trash2, X } from "lucide-react";

import { QuickAmount } from "@/components/forms/quick-amount";
import { Button } from "@/components/ui/button";
import { expenseCategories, incomeCategories, incomeSources } from "@/lib/constants/categories";
import { expensePaymentMethods, incomeReceiptMethods } from "@/lib/constants/payment-methods";
import { deleteTransaction, updateTransaction } from "@/lib/transactions/mutations";
import { getTransactions } from "@/lib/transactions/queries";
import {
  validateTransactionUpdateValues,
  type ValidationErrors
} from "@/lib/transactions/validators";
import { cn } from "@/lib/utils";
import type { Transaction, TransactionFilter, TransactionUpdateValues } from "@/types/transaction";

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

const filters: Array<{ label: string; value: TransactionFilter }> = [
  { label: "All", value: "all" },
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" }
];

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

function formatAmount(transaction: Transaction) {
  const prefix = transaction.type === "income" ? "+" : "-";

  return `${prefix}${currencyFormatter.format(transaction.amount)}`;
}

function getEditValues(transaction: Transaction): TransactionUpdateValues {
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

export function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<TransactionUpdateValues | null>(null);
  const [editErrors, setEditErrors] = useState<ValidationErrors<TransactionUpdateValues>>({});
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const totalLabel = useMemo(() => {
    if (transactions.length === 0) {
      return "Belum ada transaksi";
    }

    return `${transactions.length} transaksi`;
  }, [transactions.length]);

  async function refreshTransactions() {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTransactions(filter);
      setTransactions(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Gagal memuat transaksi.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isActive = true;

    async function loadInitialTransactions() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getTransactions(filter);

        if (isActive) {
          setTransactions(data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Gagal memuat transaksi.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialTransactions();

    return () => {
      isActive = false;
    };
  }, [filter]);

  function startEdit(transaction: Transaction) {
    setEditingId(transaction.id);
    setEditValues(getEditValues(transaction));
    setEditErrors({});
    setEditError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValues(null);
    setEditErrors({});
    setEditError(null);
  }

  function updateEditValue<Key extends keyof TransactionUpdateValues>(
    key: Key,
    value: TransactionUpdateValues[Key]
  ) {
    setEditValues((current) => (current ? { ...current, [key]: value } : current));
    setEditErrors((current) => ({ ...current, [key]: undefined }));
    setEditError(null);
  }

  async function handleDelete(transaction: Transaction) {
    const confirmed = window.confirm(`Hapus transaksi "${transaction.name}"?`);

    if (!confirmed) {
      return;
    }

    setDeletingId(transaction.id);
    setError(null);

    try {
      await deleteTransaction(transaction.id);
      await refreshTransactions();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Gagal menghapus transaksi.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleEditSubmit(event: FormEvent<HTMLFormElement>, transactionId: string) {
    event.preventDefault();

    if (!editValues) {
      return;
    }

    const validation = validateTransactionUpdateValues(editValues);
    setEditErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsUpdating(true);
    setEditError(null);

    try {
      await updateTransaction(transactionId, editValues);
      cancelEdit();
      await refreshTransactions();
    } catch (updateError) {
      setEditError(updateError instanceof Error ? updateError.message : "Gagal mengubah transaksi.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[1.8rem] border border-white/10 bg-black/24 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Transaction history</p>
          <p className="mt-1 text-sm text-indigo-100/48">{totalLabel}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.045] p-1">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-xl px-3 py-2 text-xs font-medium text-indigo-100/52 transition-all",
                filter === item.value &&
                  "bg-[linear-gradient(135deg,rgba(99,102,241,0.32),rgba(255,255,255,0.08))] text-white shadow-sm"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100 shadow-sm">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-[1.8rem] border border-white/10 bg-black/24 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-indigo-100/54" />
          <p className="mt-3 text-sm text-indigo-100/48">Memuat transaksi...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="rounded-[1.8rem] border border-white/10 bg-black/24 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <p className="text-sm font-semibold text-white">Belum ada transaksi</p>
          <p className="mt-2 text-sm text-indigo-100/48">
            Tambahkan pengeluaran atau pemasukan dari halaman Add.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              isDeleting={deletingId === transaction.id}
              isEditing={editingId === transaction.id}
              editValues={editingId === transaction.id ? editValues : null}
              editErrors={editErrors}
              editError={editError}
              isUpdating={isUpdating}
              onDelete={() => void handleDelete(transaction)}
              onEdit={() => startEdit(transaction)}
              onCancelEdit={cancelEdit}
              onEditValueChange={updateEditValue}
              onEditSubmit={(event) => void handleEditSubmit(event, transaction.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function TransactionItem({
  transaction,
  isDeleting,
  isEditing,
  editValues,
  editErrors,
  editError,
  isUpdating,
  onDelete,
  onEdit,
  onCancelEdit,
  onEditValueChange,
  onEditSubmit
}: {
  transaction: Transaction;
  isDeleting: boolean;
  isEditing: boolean;
  editValues: TransactionUpdateValues | null;
  editErrors: ValidationErrors<TransactionUpdateValues>;
  editError: string | null;
  isUpdating: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onCancelEdit: () => void;
  onEditValueChange: <Key extends keyof TransactionUpdateValues>(
    key: Key,
    value: TransactionUpdateValues[Key]
  ) => void;
  onEditSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const Icon = transaction.type === "income" ? ArrowDownLeft : ArrowUpRight;
  const accent =
    transaction.type === "income"
      ? "border-emerald-200/16 bg-emerald-300/10 text-emerald-200"
      : "border-rose-200/16 bg-rose-300/10 text-rose-200";

  if (isEditing && editValues) {
    return (
      <form
        onSubmit={onEditSubmit}
        className="rounded-[1.8rem] border border-white/10 bg-black/28 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Edit {transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}
            </p>
            <p className="mt-1 text-xs text-indigo-100/48">
              Simpan perubahan untuk transaksi ini.
            </p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onCancelEdit}>
            <X className="h-4 w-4" />
            Batal
          </Button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <EditField label="Nama" error={editErrors.name}>
            <input
              type="text"
              value={editValues.name}
              onChange={(event) => onEditValueChange("name", event.target.value)}
              className="h-10 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
            />
          </EditField>

          <EditField label="Nominal" error={editErrors.amount}>
            <input
              type="number"
              min="0"
              value={editValues.amount || ""}
              onChange={(event) => onEditValueChange("amount", Number(event.target.value))}
              className="h-10 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
            />
            <QuickAmount
              value={editValues.amount}
              onChange={(amount) => onEditValueChange("amount", amount)}
            />
          </EditField>

          <EditField label="Kategori" error={editErrors.category}>
            <select
              value={editValues.category}
              onChange={(event) => onEditValueChange("category", event.target.value)}
              className="h-10 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
            >
              {(editValues.type === "income" ? incomeCategories : expenseCategories).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </EditField>

          {editValues.type === "income" ? (
            <EditField label="Sumber pemasukan" error={editErrors.source}>
              <select
                value={editValues.source ?? ""}
                onChange={(event) => onEditValueChange("source", event.target.value)}
                className="h-10 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
              >
                <option value="">Pilih sumber</option>
                {incomeSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </EditField>
          ) : null}

          <EditField
            label={editValues.type === "income" ? "Metode penerimaan" : "Metode pembayaran"}
            error={editErrors.paymentMethod}
          >
            <select
              value={editValues.paymentMethod}
              onChange={(event) => onEditValueChange("paymentMethod", event.target.value)}
              className="h-10 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
            >
              {(editValues.type === "income" ? incomeReceiptMethods : expensePaymentMethods).map(
                (method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                )
              )}
            </select>
          </EditField>

          <EditField label="Tanggal" error={editErrors.transactionDate}>
            <input
              type="date"
              value={editValues.transactionDate}
              onChange={(event) => onEditValueChange("transactionDate", event.target.value)}
              className="h-10 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
            />
          </EditField>
        </div>

        <EditField label="Catatan" className="mt-4">
          <textarea
            value={editValues.note ?? ""}
            onChange={(event) => onEditValueChange("note", event.target.value)}
            className="min-h-24 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
          />
        </EditField>

        {editError ? (
          <div className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 px-3 py-2 text-sm text-red-100 shadow-sm">
            {editError}
          </div>
        ) : null}

        <Button type="submit" className="mt-5 w-full sm:w-auto" disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menyimpan
            </>
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </form>
    );
  }

  return (
    <article className="rounded-[1.8rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition-all hover:-translate-y-0.5 hover:border-indigo-200/22 hover:bg-white/[0.055]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border shadow-sm",
              accent
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold tracking-[-0.02em] text-white">{transaction.name}</h2>
              <span
                className={cn(
                  "rounded-xl border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em] shadow-sm",
                  accent
                )}
              >
                {transaction.type}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-indigo-100/46">
              <span>{transaction.category}</span>
              <span>{transaction.payment_method}</span>
              {transaction.type === "income" && transaction.source ? (
                <span>Sumber: {transaction.source}</span>
              ) : null}
              <span>{formatDate(transaction.transaction_date)}</span>
            </div>
            {transaction.note ? (
              <p className="mt-3 text-sm leading-6 text-indigo-100/48">{transaction.note}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <p
            className={cn(
              "text-lg font-semibold tracking-tight",
              transaction.type === "income" ? "text-emerald-200" : "text-rose-200"
            )}
          >
            {formatAmount(transaction)}
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onDelete}
              disabled={isDeleting}
              className="text-rose-200 hover:text-rose-100"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function EditField({
  label,
  error,
  className,
  children
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="text-sm font-medium text-indigo-100/70">{label}</span>
      {children}
      {error ? <span className="block text-xs text-rose-200">{error}</span> : null}
    </label>
  );
}
