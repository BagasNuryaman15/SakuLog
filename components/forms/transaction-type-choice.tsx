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
    tone: "border-destructive/25 bg-destructive/10 text-destructive",
    glow: "group-hover:shadow-[0_24px_80px_rgba(251,113,133,0.14)]"
  },
  {
    type: "income" as const,
    title: "Tambah Pemasukan",
    description: "Catat uang yang kamu terima.",
    icon: ArrowDownLeft,
    tone: "border-primary/25 bg-primary/10 text-primary",
    glow: "group-hover:shadow-[0_24px_80px_rgba(20,184,166,0.14)]"
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
            className={cn(
              "group rounded-lg border border-white/10 bg-card/68 p-5 text-left shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all",
              "hover:-translate-y-0.5 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
              choice.glow
            )}
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-md border transition group-hover:scale-105",
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
