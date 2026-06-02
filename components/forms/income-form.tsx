"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { QuickAmount } from "@/components/forms/quick-amount";
import { Button } from "@/components/ui/button";
import { incomeCategories, incomeSources } from "@/lib/constants/categories";
import { incomeReceiptMethods } from "@/lib/constants/payment-methods";
import type { IncomeFormValues } from "@/types/transaction";

type IncomeFormProps = {
  onBack: () => void;
};

type IncomeFormErrors = Partial<Record<keyof IncomeFormValues, string>>;

const initialFormValues: IncomeFormValues = {
  name: "",
  amount: 0,
  category: "",
  source: "",
  receiptMethod: "",
  transactionDate: new Date().toISOString().slice(0, 10),
  note: ""
};

export function IncomeForm({ onBack }: IncomeFormProps) {
  const [values, setValues] = useState<IncomeFormValues>(initialFormValues);
  const [errors, setErrors] = useState<IncomeFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  }

  function validateForm() {
    const nextErrors: IncomeFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Nama pemasukan wajib diisi.";
    }

    if (values.amount <= 0) {
      nextErrors.amount = "Nominal harus lebih dari 0.";
    }

    if (!values.category) {
      nextErrors.category = "Kategori pemasukan wajib dipilih.";
    }

    if (!values.source) {
      nextErrors.source = "Sumber pemasukan wajib dipilih.";
    }

    if (!values.transactionDate) {
      nextErrors.transactionDate = "Tanggal wajib diisi.";
    }

    if (!values.receiptMethod) {
      nextErrors.receiptMethod = "Metode penerimaan wajib dipilih.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      setIsSubmitted(false);
      return;
    }

    console.log("Income form values:", values);
    setIsSubmitted(true);
  }

  return (
    <section className="rounded-md border bg-card/80 p-5 shadow-sm backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Pemasukan</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Tambah Pemasukan</h2>
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
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
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
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              placeholder="0"
            />
            <p className="mt-2 text-xs text-muted-foreground">{formattedAmount}</p>
            <QuickAmount
              value={values.amount}
              onChange={(amount) => updateValue("amount", amount)}
            />
          </Field>

          <Field label="Kategori pemasukan" error={errors.category}>
            <select
              value={values.category}
              onChange={(event) => updateValue("category", event.target.value)}
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
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
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
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
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </Field>

          <Field label="Metode penerimaan" error={errors.receiptMethod}>
            <select
              value={values.receiptMethod}
              onChange={(event) => updateValue("receiptMethod", event.target.value)}
              className="h-11 w-full rounded-md border bg-background/80 px-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
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
            className="min-h-28 w-full rounded-md border bg-background/80 px-3 py-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
            placeholder="Catatan tambahan"
          />
        </Field>

        {isSubmitted ? (
          <div className="flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Pemasukan siap disimpan nanti. Belum ada data yang dikirim ke Supabase.
          </div>
        ) : null}

        <Button type="submit" className="w-full sm:w-auto">
          Simpan Placeholder
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
