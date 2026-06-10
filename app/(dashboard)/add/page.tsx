"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ExpenseForm } from "@/features/transactions/components/expense-form";
import { IncomeForm } from "@/features/transactions/components/income-form";
import { TransactionTypeChoice } from "@/features/transactions/components/transaction-type-choice";
import { PageHeader } from "@/components/layout/page-header";
import type { TransactionType } from "@/features/transactions/types";

function getTransactionTypeFromQuery(type: string | null): TransactionType | null {
  return type === "expense" || type === "income" ? type : null;
}

export default function AddPage() {
  return (
    <Suspense fallback={<AddPageFallback />}>
      <AddPageContent />
    </Suspense>
  );
}

function AddPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryType = getTransactionTypeFromQuery(searchParams.get("type"));
  const [selectedType, setSelectedType] = useState<TransactionType | null>(queryType);
  const activeType = queryType ?? selectedType;

  function handleSelectType(type: TransactionType) {
    setSelectedType(type);
    router.replace(`/add?type=${type}`);
  }

  function handleBackToChoice() {
    setSelectedType(null);
    router.replace("/add");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create Record"
        description="Pilih flow pemasukan atau pengeluaran dulu, lalu record transaksi tanpa distraksi."
      />

      {!activeType ? (
        <TransactionTypeChoice onSelect={handleSelectType} />
      ) : activeType === "expense" ? (
        <ExpenseForm onBack={handleBackToChoice} />
      ) : (
        <IncomeForm onBack={handleBackToChoice} />
      )}
    </div>
  );
}

function AddPageFallback() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Create Record"
        description="Pilih flow pemasukan atau pengeluaran dulu, lalu record transaksi tanpa distraksi."
      />
    </div>
  );
}
