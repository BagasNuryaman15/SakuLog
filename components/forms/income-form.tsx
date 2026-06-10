"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import {
  borderWhite10,
  radiusInput,
  radiusSection,
  shadowPage
} from "@/components/dashboard/dashboard-style-tokens";
import { QuickAmount } from "@/components/forms/quick-amount";
import { Button } from "@/components/ui/button";
import { incomeCategories, incomeSources } from "@/lib/constants/categories";
import { incomeReceiptMethods } from "@/lib/constants/payment-methods";
import { createIncomeTransaction } from "@/lib/transactions/mutations";
import { validateIncomeValues, type ValidationErrors } from "@/lib/transactions/validators";
import { cn } from "@/lib/utils";
import type { IncomeFormValues } from "@/types/transaction";

type IncomeFormProps = {
  onBack: () => void;
};

function getInitialFormValues(): IncomeFormValues {
  return {
    name: "",
    amount: 0,
    category: "",
    source: "",
    receiptMethod: "",
    transactionDate: new Date().toISOString().slice(0, 10),
    note: ""
  };
}

export function IncomeForm({ onBack }: IncomeFormProps) {
  const [values, setValues] = useState<IncomeFormValues>(getInitialFormValues);
  const [errors, setErrors] = useState<ValidationErrors<IncomeFormValues>>({});
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

  function updateValue<Key extends keyof IncomeFormValues>(key: Key, value: IncomeFormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setIsSubmitted(false);
    setSaveError(null);
  }

  function validateForm() {
    const validation = validateIncomeValues(values);

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
      await createIncomeTransaction(values);
      setValues(getInitialFormValues());
      setErrors({});
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
      setSaveError(error instanceof Error ? error.message : "Gagal menyimpan pemasukan.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className={cn(radiusSection, borderWhite10, shadowPage, "border bg-black/24 p-5 backdrop-blur-2xl sm:p-6")}>
      <div className={cn(borderWhite10, "flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between")}>
        <div>
          <p className="text-sm font-medium text-emerald-200/78">Pemasukan</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
            Tambah Pemasukan
          </h2>
        </div>
        <Button type="button" variant="ghost" onClick={onBack} className="justify-start sm:w-auto">
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nama pemasukan" error={errors.name}>
            <input
              type="text"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              className="finance-input"
              placeholder="Contoh: Uang bulanan"
            />
          </Field>

          <Field label="Nominal" error={errors.amount}>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={values.amount || ""}
              onChange={(event) => updateValue("amount", Number(event.target.value))}
              className="finance-input"
              placeholder="0"
            />
            <p className="mt-2 text-xs text-indigo-100/40">{formattedAmount}</p>
            <QuickAmount
              value={values.amount}
              onChange={(amount) => updateValue("amount", amount)}
            />
          </Field>

          <Field label="Kategori pemasukan" error={errors.category}>
            <select
              value={values.category}
              onChange={(event) => updateValue("category", event.target.value)}
              className="finance-input"
            >
              <option value="">Pilih kategori</option>
              {incomeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Sumber pemasukan" error={errors.source}>
            <select
              value={values.source}
              onChange={(event) => updateValue("source", event.target.value)}
              className="finance-input"
            >
              <option value="">Pilih sumber</option>
              {incomeSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tanggal" error={errors.transactionDate}>
            <input
              type="date"
              value={values.transactionDate}
              onChange={(event) => updateValue("transactionDate", event.target.value)}
              className="finance-input"
            />
          </Field>

          <Field label="Metode penerimaan" error={errors.receiptMethod}>
            <select
              value={values.receiptMethod}
              onChange={(event) => updateValue("receiptMethod", event.target.value)}
              className="finance-input"
            >
              <option value="">Pilih metode</option>
              {incomeReceiptMethods.map((method) => (
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
            className="finance-input"
            placeholder="Catatan tambahan"
          />
        </Field>

        {isSubmitted ? (
          <div className={cn(radiusInput, "flex items-center gap-2 border border-emerald-200/20 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100 shadow-sm")}>
            <CheckCircle2 className="h-4 w-4" />
            Pemasukan berhasil disimpan. Kamu bisa menambahkan transaksi lain.
          </div>
        ) : null}

        {saveError ? (
          <div className={cn(radiusInput, "border border-red-300/20 bg-red-500/10 px-3 py-2 text-sm text-red-100 shadow-sm")}>
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
            "Simpan Pemasukan"
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
      <span className="flex items-center justify-between text-sm font-medium text-indigo-100/72">
        {label}
        {optional ? <span className="text-xs font-normal text-indigo-100/40">Opsional</span> : null}
      </span>
      {children}
      {error ? <span className="block text-xs text-rose-200">{error}</span> : null}
    </div>
  );
}
