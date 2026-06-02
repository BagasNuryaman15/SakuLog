"use client";

import { quickAmounts } from "@/lib/constants/quick-amounts";

type QuickAmountProps = {
  value: number;
  onChange: (value: number) => void;
};

const formatter = new Intl.NumberFormat("id-ID");

export function QuickAmount({ value, onChange }: QuickAmountProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Quick Amount
      </p>
      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(value + amount)}
            className="rounded-md border bg-background/70 px-3 py-2 text-xs font-medium shadow-sm transition hover:border-primary/40 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            +{formatter.format(amount)}
          </button>
        ))}
      </div>
    </div>
  );
}
