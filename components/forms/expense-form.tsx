"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import { QuickAmount } from "@/components/forms/quick-amount";
import { Button } from "@/components/ui/button";
import { expenseCategories } from "@/lib/constants/categories";
import { expensePaymentMethods } from "@/lib/constants/payment-methods";
import { createExpenseTransaction } from "@/lib/transactions/mutations";
import { validateExpenseValues, type ValidationErrors } from "@/lib/transactions/validators";
import type { ExpenseFormValues } from "@/types/transaction";

type ExpenseFormProps = {
  onBack: () => void;
};

function getInitialFormValues(): ExpenseFormValues {
  return {
    name: "",
    amount: 0,
    category: "",
    paymentMethod: "",
    transactionDate: new Date().toISOString().slice(0, 10),
    note: ""
  };
}

export function ExpenseForm({ onBack }: ExpenseFormProps) {
  const [values, setValues] = useState<ExpenseFormValues>(getInitialFormValues);
  const [errors, setErrors] = useState<ValidationErrors<ExpenseFormValues>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const formattedAmount = useMemo(() => {
    if (!values.amount) {
      return "Rp0";
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(values.amount);
  }, [values.amount]);

  function updateValue<Key extends keyof ExpenseFormValues>(
    key: Key,
    value: ExpenseFormValues[Key]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setIsSubmitted(false);
    setSaveError(null);
  }

  function validateForm() {
    const validation = validateExpenseValues(values);

    setErrors(validation.errors);
    return validation.isValid;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError(null);

    if (!validateForm()) {
      setIsSubmitted(false);
      return;
    }

    setIsSaving(true);

    try {
      await createExpenseTransaction(values);
      setValues(getInitialFormValues());
      setErrors({});
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
      setSaveError(error instanceof Error ? error.message : "Gagal menyimpan pengeluaran.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-md border bg-card/80 p-5 shadow-sm backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Pengeluaran</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Tambah Pengeluaran</h2>
        </div>
        <Button type="button" variant="ghost" onClick={onBack} className="justify-start sm:w-auto">
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nama pengeluaran" error={errors.name}>
            <input
              type="text"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              placeholder="Contoh: Makan siang"
            />
          </Field>

          <Field label="Nominal" error={errors.amount}>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={values.amount || ""}
              onChange={(event) => updateValue("amount", Number(event.target.value))}
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              placeholder="0"
            />
            <p className="mt-2 text-xs text-muted-foreground">{formattedAmount}</p>
            <QuickAmount
              value={values.amount}
              onChange={(amount) => updateValue("amount", amount)}
            />
          </Field>

          <Field label="Kategori" error={errors.category}>
            <select
              value={values.category}
              onChange={(event) => updateValue("category", event.target.value)}
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            >
              <option value="">Pilih kategori</option>
              {expenseCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tanggal" error={errors.transactionDate}>
            <input
              type="date"
              value={values.transactionDate}
              onChange={(event) => updateValue("transactionDate", event.target.value)}
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </Field>

          <Field label="Metode pembayaran" error={errors.paymentMethod}>
            <select
              value={values.paymentMethod}
              onChange={(event) => updateValue("paymentMethod", event.target.value)}
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            >
              <option value="">Pilih metode</option>
              {expensePaymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Catatan" optional>
          <textarea
            value={values.note}
            onChange={(event) => updateValue("note", event.target.value)}
            className="min-h-28 w-full rounded-md border bg-background/80 px-3 py-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
            placeholder="Catatan tambahan"
          />
        </Field>

        {isSubmitted ? (
          <div className="flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Pengeluaran berhasil disimpan. Kamu bisa menambahkan transaksi lain.
          </div>
        ) : null}

        {saveError ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {saveError}
          </div>
        ) : null}

        <Button type="submit" className="w-full sm:w-auto" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menyimpan
            </>
          ) : (
            "Simpan Pengeluaran"
          )}
        </Button>
      </form>
    </section>
  );
}

function Field({
  label,
  error,
  optional,
  children
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="block space-y-2">
      <span className="flex items-center justify-between text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="text-xs font-normal text-muted-foreground">Opsional</span> : null}
      </span>
      {children}
      {error ? <span className="block text-xs text-destructive">{error}</span> : null}
    </div>
  );
}
