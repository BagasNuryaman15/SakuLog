import type { PeriodSummary } from "@/lib/reports/report-summary";
import {
  borderWhite10,
  cardSubtitle,
  cardTitle,
  radiusButton,
  radiusPanel,
  radiusPill,
  shadowPage
} from "@/components/dashboard/dashboard-style-tokens";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function ReportPeriodCard({ summary }: { summary: PeriodSummary }) {
  const hasData = summary.income > 0 || summary.expense > 0;
  const balanceColor =
    summary.balance > 0
      ? "text-emerald-300"
      : summary.balance < 0
        ? "text-[#F472B6]"
        : "text-[#C7B8E8]/84";

  return (
    <div className={cn(radiusPanel, borderWhite10, shadowPage, "relative overflow-hidden border bg-black/24 p-5 backdrop-blur-2xl")}>
      <div className={cn(radiusPill, "absolute -right-8 -top-8 h-24 w-24 bg-indigo-400/12 blur-2xl")} />
      <p className={cn(cardTitle, "relative text-lg tracking-[-0.035em] text-white")}>
        {summary.label}
      </p>
      <p className={cn(cardSubtitle, "relative mt-1 text-[0.7rem] leading-5 text-indigo-100/56")}>
        {summary.description}
      </p>

      {hasData ? (
        <div className="relative mt-4 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div className={cn(radiusButton, "border border-white/[0.06] bg-white/[0.03] px-3 py-2")}>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cyan-300/70">Pemasukan</p>
              <p className="mt-1 text-sm font-bold tabular-nums text-cyan-100/90">
                {formatCurrencyIDR(summary.income)}
              </p>
            </div>
            <div className={cn(radiusButton, "border border-white/[0.06] bg-white/[0.03] px-3 py-2")}>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#F9A8D4]/70">Pengeluaran</p>
              <p className="mt-1 text-sm font-bold tabular-nums text-[#FBCFE8]/90">
                {formatCurrencyIDR(summary.expense)}
              </p>
            </div>
          </div>
          <div className={cn(radiusButton, "border border-white/[0.06] bg-white/[0.03] px-3 py-2")}>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#C7B8E8]/56">Sisa</p>
            <p className={cn("mt-1 text-sm font-bold tabular-nums", balanceColor)}>
              {formatCurrencyIDR(summary.balance)}
            </p>
          </div>

          {summary.topCategory ? (
            <p className="text-[0.65rem] leading-4 text-[#D8B4FE]/56">
              Kategori terbesar: <span className="font-semibold text-[#D8B4FE]/84">{summary.topCategory}</span>
            </p>
          ) : null}

          {summary.categoryBreakdown.length > 0 ? (
            <div className="space-y-1 pt-1">
              {summary.categoryBreakdown.slice(0, 3).map((item) => (
                <div key={item.category} className="flex items-center justify-between gap-2">
                  <span className="truncate text-[0.625rem] font-medium text-[#F8F4FF]/72">{item.category}</span>
                  <span className="shrink-0 text-[0.625rem] font-semibold tabular-nums text-[#C7B8E8]/72">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="relative mt-4">
          <p className="text-sm leading-6 text-indigo-100/56">Belum ada transaksi</p>
          <p className={cn(radiusPill, borderWhite10, "relative mt-4 w-fit border bg-white/[0.055] px-3 py-1 text-xs text-indigo-100/40")}>
            Belum ada data
          </p>
        </div>
      )}
    </div>
  );
}
