"use client";

import {
  borderWhite10,
  radiusInput,
  radiusSection,
  shadowPage
} from "@/components/dashboard/dashboard-style-tokens";
import { ExpenseGlyph, IncomeGlyph } from "@/components/forms/transaction-glyphs";
import { cn } from "@/lib/utils";
import type { TransactionType } from "@/types/transaction";

type TransactionTypeChoiceProps = {
  onSelect: (type: TransactionType) => void;
};

const choices = [
  {
    type: "expense" as const,
    title: "Tambah Pengeluaran",
    description: "Record uang keluar dengan kategori yang jelas.",
    icon: ExpenseGlyph,
    tone: "border-rose-200/16 bg-rose-300/10 text-rose-200",
    glow: "group-hover:shadow-[0_28px_95px_rgba(251,113,133,0.18)]"
  },
  {
    type: "income" as const,
    title: "Tambah Pemasukan",
    description: "Record uang masuk dari gaji, freelance, atau sumber lain.",
    icon: IncomeGlyph,
    tone: "border-emerald-200/16 bg-emerald-300/10 text-emerald-200",
    glow: "group-hover:shadow-[0_28px_95px_rgba(52,211,153,0.18)]"
  }
];

export function TransactionTypeChoice({ onSelect }: TransactionTypeChoiceProps) {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      {choices.map((choice) => {
        const Icon = choice.icon;

        return (
          <button
            key={choice.type}
            type="button"
            onClick={() => onSelect(choice.type)}
            className={cn(
              radiusSection,
              borderWhite10,
              shadowPage,
              "group relative overflow-hidden border bg-black/24 p-6 text-left backdrop-blur-2xl transition-all",
              "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_0%,rgba(129,140,248,0.18),transparent_18rem)] before:opacity-0 before:transition-opacity",
              "hover:-translate-y-1 hover:border-indigo-200/24 hover:before:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
              choice.glow
            )}
          >
            <div
              className={cn(
                radiusInput,
                "relative flex h-16 w-16 items-center justify-center border transition group-hover:scale-105",
                choice.tone
              )}
            >
              <Icon className="h-10 w-10" />
            </div>
            <div className="relative mt-8 space-y-2">
              <h2 className="text-2xl font-semibold tracking-[-0.045em] text-white">{choice.title}</h2>
              <p className="max-w-sm text-sm leading-6 text-indigo-100/56">{choice.description}</p>
            </div>
          </button>
        );
      })}
    </section>
  );
}
