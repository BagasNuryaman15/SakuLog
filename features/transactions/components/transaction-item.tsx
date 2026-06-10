"use client";

import type { FormEvent } from "react";
import { ArrowDownLeft, ArrowUpRight, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  formatAmount,
  formatDate
} from "@/features/transactions/components/transaction-formatters";
import {
  TransactionEditForm,
  type TransactionEditValueChange
} from "@/features/transactions/components/transaction-edit-form";
import { transactionPanelClass } from "@/features/transactions/components/transaction-styles";
import type { Transaction, TransactionUpdateValues } from "@/features/transactions/types";
import type { ValidationErrors } from "@/features/transactions/validators";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TransactionItemProps = {
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
  onEditValueChange: TransactionEditValueChange;
  onEditSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TransactionItem({
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
}: TransactionItemProps) {
  const Icon = transaction.type === "income" ? ArrowDownLeft : ArrowUpRight;
  const accent =
    transaction.type === "income"
      ? "border-emerald-200/16 bg-emerald-300/10 text-emerald-200"
      : "border-rose-200/16 bg-rose-300/10 text-rose-200";

  if (isEditing && editValues) {
    return (
      <TransactionEditForm
        transaction={transaction}
        editValues={editValues}
        editErrors={editErrors}
        editError={editError}
        isUpdating={isUpdating}
        onCancel={onCancelEdit}
        onValueChange={onEditValueChange}
        onSubmit={onEditSubmit}
      />
    );
  }

  return (
    <article
      className={cn(
        transactionPanelClass,
        "p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-200/22 hover:bg-white/[0.055]"
      )}
    >
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
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-indigo-100/40">
              <span>{transaction.category}</span>
              <span>{transaction.payment_method}</span>
              {transaction.type === "income" && transaction.source ? (
                <span>Sumber: {transaction.source}</span>
              ) : null}
              <span>{formatDate(transaction.transaction_date)}</span>
            </div>
            {transaction.note ? (
              <p className="mt-3 text-sm leading-6 text-indigo-100/40">{transaction.note}</p>
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
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
