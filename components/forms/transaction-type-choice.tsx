"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TransactionType } from "@/types/transaction";

type TransactionTypeChoiceProps = {
  onSelect: (type: TransactionType) => void;
};

const choices = [
  {
    type: "expense" as const,
    title: "Tambah Pengeluaran",
    description: "Catat uang yang kamu pakai.",
    icon: ArrowUpRight,
    tone: "bg-destructive/10 text-destructive"
  },
  {
    type: "income" as const,
    title: "Tambah Pemasukan",
    description: "Catat uang yang kamu terima.",
    icon: ArrowDownLeft,
    tone: "bg-primary/10 text-primary"
  }
];

export function TransactionTypeChoice({ onSelect }: TransactionTypeChoiceProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {choices.map((choice) => {
        const Icon = choice.icon;

        return (
          <button
            key={choice.type}
            type="button"
            onClick={() => onSelect(choice.type)}
            className="group rounded-md border bg-card/80 p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_22px_70px_rgba(27,37,31,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-md transition group-hover:scale-105",
                choice.tone
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-5 space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">{choice.title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{choice.description}</p>
            </div>
          </button>
        );
      })}
    </section>
  );
}
