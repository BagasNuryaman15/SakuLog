"use client";

import { borderWhite10, radiusButton } from "@/components/dashboard/dashboard-style-tokens";
import { quickAmounts } from "@/lib/constants/quick-amounts";
import { cn } from "@/lib/utils";

type QuickAmountProps = {
  value: number;
  onChange: (value: number) => void;
};

const formatter = new Intl.NumberFormat("id-ID");

export function QuickAmount({ value, onChange }: QuickAmountProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-100/40">
        Quick Amount
      </p>
      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(value + amount)}
            className={cn(radiusButton, borderWhite10, "border bg-white/[0.045] px-3 py-2 text-xs font-medium text-indigo-100/56 shadow-sm transition hover:border-indigo-200/28 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60")}
          >
            +{formatter.format(amount)}
          </button>
        ))}
      </div>
    </div>
  );
}
