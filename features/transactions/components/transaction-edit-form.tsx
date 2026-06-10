"use client";

import type { FormEvent, ReactNode } from "react";
import { Loader2, X } from "lucide-react";

import { QuickAmount } from "@/features/transactions/components/quick-amount";
import { editInputClass, editTextareaClass } from "@/features/transactions/components/transaction-styles";
import { expenseCategories, incomeCategories, incomeSources } from "@/features/transactions/constants/categories";
import { expensePaymentMethods, incomeReceiptMethods } from "@/features/transactions/constants/payment-methods";
import type { Transaction, TransactionUpdateValues } from "@/features/transactions/types";
import type { ValidationErrors } from "@/features/transactions/validators";
import { Button } from "@/components/ui/button";
import { radiusInput } from "@/shared/design/tokens";
import { cn } from "@/lib/utils";

export type TransactionEditValueChange = <Key extends keyof TransactionUpdateValues>(
  key: Key,
  value: TransactionUpdateValues[Key]
) => void;

type TransactionEditFormProps = {
  transaction: Transaction;
  editValues: TransactionUpdateValues;
  editErrors: ValidationErrors<TransactionUpdateValues>;
  editError: string | null;
  isUpdating: boolean;
  onCancel: () => void;
  onValueChange: TransactionEditValueChange;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TransactionEditForm({
  transaction,
  editValues,
  editErrors,
  editError,
  isUpdating,
  onCancel,
  onValueChange,
  onSubmit
}: TransactionEditFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.8rem] border border-white/10 bg-black/28 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Edit {transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}
          </p>
          <p className="mt-1 text-xs text-indigo-100/40">Simpan perubahan untuk transaksi ini.</p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
          Batal
        </Button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <EditField label="Nama" error={editErrors.name}>
          <input
            type="text"
            value={editValues.name}
            onChange={(event) => onValueChange("name", event.target.value)}
            className={editInputClass}
          />
        </EditField>

        <EditField label="Nominal" error={editErrors.amount}>
          <input
            type="number"
            min="0"
            value={editValues.amount || ""}
            onChange={(event) => onValueChange("amount", Number(event.target.value))}
            className={editInputClass}
          />
          <QuickAmount value={editValues.amount} onChange={(amount) => onValueChange("amount", amount)} />
        </EditField>

        <EditField label="Kategori" error={editErrors.category}>
          <select
            value={editValues.category}
            onChange={(event) => onValueChange("category", event.target.value)}
            className={editInputClass}
          >
            {(editValues.type === "income" ? incomeCategories : expenseCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </EditField>

        {editValues.type === "income" ? (
          <EditField label="Sumber pemasukan" error={editErrors.source}>
            <select
              value={editValues.source ?? ""}
              onChange={(event) => onValueChange("source", event.target.value)}
              className={editInputClass}
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
            onChange={(event) => onValueChange("paymentMethod", event.target.value)}
            className={editInputClass}
          >
            {(editValues.type === "income" ? incomeReceiptMethods : expensePaymentMethods).map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </EditField>

        <EditField label="Tanggal" error={editErrors.transactionDate}>
          <input
            type="date"
            value={editValues.transactionDate}
            onChange={(event) => onValueChange("transactionDate", event.target.value)}
            className={editInputClass}
          />
        </EditField>
      </div>

      <EditField label="Catatan" className="mt-4">
        <textarea
          value={editValues.note ?? ""}
          onChange={(event) => onValueChange("note", event.target.value)}
          className={editTextareaClass}
        />
      </EditField>

      {editError ? (
        <div
          className={cn(
            radiusInput,
            "mt-4 border border-red-300/20 bg-red-500/10 px-3 py-2 text-sm text-red-100 shadow-sm"
          )}
        >
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
      <span className="text-sm font-medium text-indigo-100/72">{label}</span>
      {children}
      {error ? <span className="block text-xs text-rose-200">{error}</span> : null}
    </label>
  );
}
