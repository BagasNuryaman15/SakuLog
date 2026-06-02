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
      <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-card/68 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Transaction history</p>
          <p className="mt-1 text-sm text-muted-foreground">{totalLabel}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-md border border-white/10 bg-background/36 p-1">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-all",
                filter === item.value &&
                  "bg-gradient-to-b from-primary/18 to-white/[0.04] text-foreground shadow-sm"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive shadow-sm">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border border-white/10 bg-card/68 p-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">Memuat transaksi...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-card/68 p-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <p className="text-sm font-medium">Belum ada transaksi</p>
          <p className="mt-2 text-sm text-muted-foreground">
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
      ? "border-primary/25 bg-primary/10 text-primary"
      : "border-destructive/25 bg-destructive/10 text-destructive";

  if (isEditing && editValues) {
    return (
      <form
        onSubmit={onEditSubmit}
        className="rounded-lg border border-white/10 bg-card/74 p-5 shadow-[0_22px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">
              Edit {transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
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
              className="h-10 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-primary/45 focus:bg-background/60 focus:ring-2 focus:ring-ring/25"
            />
          </EditField>

          <EditField label="Nominal" error={editErrors.amount}>
            <input
              type="number"
              min="0"
              value={editValues.amount || ""}
              onChange={(event) => onEditValueChange("amount", Number(event.target.value))}
              className="h-10 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-primary/45 focus:bg-background/60 focus:ring-2 focus:ring-ring/25"
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
              className="h-10 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-primary/45 focus:bg-background/60 focus:ring-2 focus:ring-ring/25"
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
                className="h-10 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-primary/45 focus:bg-background/60 focus:ring-2 focus:ring-ring/25"
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
              className="h-10 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-primary/45 focus:bg-background/60 focus:ring-2 focus:ring-ring/25"
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
              className="h-10 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-primary/45 focus:bg-background/60 focus:ring-2 focus:ring-ring/25"
            />
          </EditField>
        </div>

        <EditField label="Catatan" className="mt-4">
          <textarea
            value={editValues.note ?? ""}
            onChange={(event) => onEditValueChange("note", event.target.value)}
            className="min-h-24 w-full rounded-md border border-white/10 bg-background/45 px-3 py-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-primary/45 focus:bg-background/60 focus:ring-2 focus:ring-ring/25"
          />
        </EditField>

        {editError ? (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive shadow-sm">
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
    <article className="rounded-lg border border-white/10 bg-card/70 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all hover:border-primary/20 hover:bg-card/78">
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
              <h2 className="font-semibold tracking-tight">{transaction.name}</h2>
              <span
                className={cn(
                  "rounded-md border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em] shadow-sm",
                  accent
                )}
              >
                {transaction.type}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{transaction.category}</span>
              <span>{transaction.payment_method}</span>
              {transaction.type === "income" && transaction.source ? (
                <span>Sumber: {transaction.source}</span>
              ) : null}
              <span>{formatDate(transaction.transaction_date)}</span>
            </div>
            {transaction.note ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{transaction.note}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <p
            className={cn(
              "text-lg font-semibold tracking-tight",
              transaction.type === "income" ? "text-primary" : "text-destructive"
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
              className="text-destructive hover:text-destructive"
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
      <span className="text-sm font-medium text-foreground/90">{label}</span>
      {children}
      {error ? <span className="block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
