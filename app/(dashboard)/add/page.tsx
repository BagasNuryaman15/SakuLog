"use client";

import { useState } from "react";

import { ExpenseForm } from "@/components/forms/expense-form";
import { IncomeForm } from "@/components/forms/income-form";
import { TransactionTypeChoice } from "@/components/forms/transaction-type-choice";
import { PageHeader } from "@/components/layout/page-header";
import type { TransactionType } from "@/types/transaction";

export default function AddPage() {
  const [selectedType, setSelectedType] = useState<TransactionType | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add"
        description="Pilih jenis transaksi dulu, lalu isi detailnya dengan cepat dan rapi."
      />

      {!selectedType ? (
        <TransactionTypeChoice onSelect={setSelectedType} />
      ) : selectedType === "expense" ? (
        <ExpenseForm onBack={() => setSelectedType(null)} />
      ) : (
        <IncomeForm onBack={() => setSelectedType(null)} />
      )}
    </div>
  );
}
