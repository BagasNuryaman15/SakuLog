import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { WireframeCard } from "./dashboard-primitives";
import {
  captionText,
  metricLabel,
  rightRailSurfaceClass,
  rightRailTitle
} from "@/shared/design/tokens";

export function WireframeRecentTransactions({ summary }: { summary: DashboardSummary }) {
  const transactions = summary.recentTransactions.slice(0, 4);

  function formatTransactionAmount(transaction: DashboardSummary["recentTransactions"][number]) {
    const prefix = transaction.type === "income" ? "+" : "-";

    return `${prefix}${formatCurrencyIDR(transaction.amount)}`;
  }

  function formatTransactionDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short"
    }).format(new Date(`${date}T00:00:00`));
  }

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[12.5rem] overflow-hidden p-4")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={cn(rightRailTitle, "truncate")}>Recent Transactions</h3>
          <p className={cn(captionText, "mt-1 truncate")}>Aktivitas terakhir yang tercatat</p>
        </div>
        <span className={cn(captionText, "shrink-0 truncate text-[#C7B8E8]/76")}>Lihat semua</span>
      </div>
      {transactions.length > 0 ? (
        <div className="mt-3 space-y-2">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <div key={transaction.id} className="grid min-w-0 grid-cols-[1rem_minmax(0,1fr)_5.2rem] items-center gap-2.5">
                <span
                  className={cn(
                    "h-4 w-4 rounded border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    isIncome
                      ? "border-cyan-200/38 bg-cyan-300/14 shadow-[0_0_14px_rgba(34,211,238,0.14)]"
                      : "border-[#F472B6]/38 bg-[#BA319F]/18 shadow-[0_0_14px_rgba(236,72,153,0.14)]"
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-[0.6875rem] font-semibold leading-none tracking-[-0.005em] text-[#F8F4FF]/88">
                    {transaction.name}
                  </p>
                  <p className={cn(captionText, "mt-1 truncate text-[0.625rem] leading-none")}>
                    {transaction.category} · {formatTransactionDate(transaction.transaction_date)}
                  </p>
                </div>
                <span
                  className={cn(
                    captionText,
                    "truncate whitespace-nowrap text-right text-[0.625rem] font-semibold leading-none tabular-nums",
                    isIncome ? "text-cyan-200/90" : "text-[#F472B6]/90"
                  )}
                >
                  {formatTransactionAmount(transaction)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-[rgba(91,67,129,0.34)] bg-[rgba(14,12,22,0.56)] p-3">
          <p className={cn(metricLabel, "truncate text-[#F8F4FF]/86")}>Belum ada transaksi</p>
          <p className={cn(captionText, "mt-1 line-clamp-2")}>
            Catat transaksi pertamamu untuk mulai melihat aktivitas.
          </p>
        </div>
      )}
    </WireframeCard>
  );
}
