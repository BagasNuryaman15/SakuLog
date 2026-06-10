"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { getEditValues } from "@/features/transactions/components/transaction-formatters";
import { TransactionItem } from "@/features/transactions/components/transaction-item";
import { transactionPanelClass } from "@/features/transactions/components/transaction-styles";
import { deleteTransaction, updateTransaction } from "@/features/transactions/services/mutations";
import { getTransactions } from "@/features/transactions/services/queries";
import {
  validateTransactionUpdateValues,
  type ValidationErrors
} from "@/features/transactions/validators";
import type { Transaction, TransactionFilter, TransactionUpdateValues } from "@/features/transactions/types";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { borderWhite10, radiusInput } from "@/shared/design/tokens";
import { cn } from "@/lib/utils";

const filters: Array<{ label: string; value: TransactionFilter }> = [
  { label: "All", value: "all" },
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" }
];

export function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Transaction | null>(null);
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

  async function handleConfirmDelete() {
    if (!confirmDelete) return;

    const transaction = confirmDelete;
    setConfirmDelete(null);
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
      <div className={cn(transactionPanelClass, "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between")}>
        <div>
          <p className="text-sm font-semibold text-white">Transaction history</p>
          <p className="mt-1 text-sm text-indigo-100/40">{totalLabel}</p>
        </div>
        <div className={cn(radiusInput, borderWhite10, "grid grid-cols-3 gap-2 border bg-white/[0.045] p-1")}>
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-xl px-3 py-2 text-xs font-medium text-indigo-100/56 transition-all",
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
        <div
          className={cn(
            radiusInput,
            "border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100 shadow-sm"
          )}
        >
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className={cn(transactionPanelClass, "p-8 text-center")}>
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-indigo-100/56" />
          <p className="mt-3 text-sm text-indigo-100/40">Memuat transaksi...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className={cn(transactionPanelClass, "p-8 text-center")}>
          <p className="text-sm font-semibold text-white">Belum ada transaksi</p>
          <p className="mt-2 text-sm text-indigo-100/40">
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
              onDelete={() => setConfirmDelete(transaction)}
              onEdit={() => startEdit(transaction)}
              onCancelEdit={cancelEdit}
              onEditValueChange={updateEditValue}
              onEditSubmit={(event) => void handleEditSubmit(event, transaction.id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmDelete !== null}
        title={`Hapus transaksi "${confirmDelete?.name ?? ""}"?`}
        description="Transaksi yang dihapus tidak bisa dikembalikan. Pastikan kamu yakin sebelum melanjutkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => setConfirmDelete(null)}
      />
    </section>
  );
}
