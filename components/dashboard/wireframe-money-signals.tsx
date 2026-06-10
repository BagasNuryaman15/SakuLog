import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { WireframeBlock, WireframeCard } from "./dashboard-primitives";
import {
  captionText,
  metricLabel,
  rightRailSurfaceClass,
  rightRailTitle,
  type AccentTone
} from "@/shared/design/tokens";

export function WireframeMoneySignals({ summary }: { summary: DashboardSummary }) {
  const signals: Array<{
    label: string;
    value: string;
    tone: AccentTone;
  }> = [
    {
      label: "Pengeluaran hari ini",
      value: formatCurrencyIDR(summary.todayExpense),
      tone: "cyan"
    },
    {
      label: "Pengeluaran minggu ini",
      value: formatCurrencyIDR(summary.weekExpense),
      tone: "magenta"
    },
    {
      label: "Kategori terboros",
      value: summary.topExpenseCategory?.category ?? "Belum ada",
      tone: "violet"
    }
  ];

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[10rem] p-4")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={cn(rightRailTitle, "truncate")}>Money Signals</h3>
          <p className={cn(captionText, "mt-1 truncate")}>Yang perlu kamu lihat cepat</p>
        </div>
        <span className={cn(captionText, "shrink-0 truncate text-[#C7B8E8]/76")}>Lihat semua</span>
      </div>
      <div className="mt-3 divide-y divide-[#B36BFF]/12">
        {signals.map((signal, item) => (
          <div key={signal.label} className="grid min-h-[1.75rem] min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_minmax(3.25rem,4.25rem)_0.5rem] items-center gap-2.5 py-1">
            <WireframeBlock className="h-5 w-5" tone={signal.tone} />
            <span className={cn(metricLabel, "truncate")}>{signal.label}</span>
            <span className={cn(captionText, "truncate whitespace-nowrap text-right tabular-nums text-[#C7B8E8]/90")}>
              {signal.value}
            </span>
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                item === 1
                  ? "bg-[#EC4899]/78 shadow-[0_0_14px_rgba(236,72,153,0.22)]"
                  : "bg-cyan-300/70 shadow-[0_0_14px_rgba(34,211,238,0.24)]"
              )}
            />
          </div>
        ))}
      </div>
    </WireframeCard>
  );
}
