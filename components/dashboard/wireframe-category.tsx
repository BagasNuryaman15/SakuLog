import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { WireframeCard } from "./dashboard-primitives";
import { getExpenseCategoryRows, type ExpenseCategoryRow } from "./dashboard-helpers";
import {
  captionText,
  navLabel,
  rightRailSurfaceClass,
  rightRailTitle
} from "./dashboard-style-tokens";

export function WireframeCategory({ summary }: { summary: DashboardSummary }) {
  const categoryRows = getExpenseCategoryRows(summary);
  const hasExpenses = summary.monthExpense > 0 && categoryRows.length > 0;

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[14rem] p-4")}>
      <div className="min-w-0">
        <h3 className={cn(rightRailTitle, "truncate")}>Expense by Category</h3>
        <p className={cn(captionText, "mt-1 truncate")}>Kategori pengeluaran bulan ini</p>
      </div>
      <div className="mt-3 grid min-w-0 grid-cols-[5.85rem_minmax(0,1fr)] items-center gap-3">
        <ExpenseCategoryDonut rows={categoryRows} totalExpense={summary.monthExpense} />
        <div className="min-w-0 space-y-1">
          {hasExpenses ? (
            categoryRows.map((item) => (
              <div
                key={item.category}
                className="grid min-h-4 min-w-0 grid-cols-[0.45rem_minmax(0,1fr)_minmax(3.25rem,4.2rem)_2rem] items-center gap-1.5"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}66` }}
                />
                <span className="truncate text-[0.625rem] font-semibold leading-none tracking-[-0.005em] text-[#F8F4FF]/88">
                  {item.category}
                </span>
                <span
                  className="truncate whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#C7B8E8]/84 tabular-nums"
                >
                  {formatCurrencyIDR(item.amount)}
                </span>
                <span
                  className="whitespace-nowrap text-right text-[0.625rem] font-semibold leading-none tracking-normal tabular-nums"
                  style={{ color: item.color }}
                >
                  {item.percentage}%
                </span>
              </div>
            ))
          ) : (
            <div className="min-w-0 space-y-1">
              <div className="grid min-h-4 min-w-0 grid-cols-[0.45rem_minmax(0,1fr)_minmax(3.25rem,4.2rem)_2rem] items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B4381]/70" />
                <span className="truncate text-[0.625rem] font-semibold leading-none tracking-[-0.005em] text-[#F8F4FF]/84">
                  Belum ada pengeluaran
                </span>
                <span
                  className="truncate whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#9B89B8]/82 tabular-nums"
                >
                  Rp0
                </span>
                <span className="whitespace-nowrap text-right text-[0.625rem] font-medium leading-none tracking-normal text-[#6F5F86]/82 tabular-nums">
                  0%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2.5 flex h-7 items-center justify-center rounded-md border border-[rgba(199,166,255,0.16)] bg-[rgba(18,15,28,0.64)]">
        <span className={cn(navLabel, "text-[#C7B8E8]/82")}>Lihat semua kategori</span>
      </div>
    </WireframeCard>
  );
}

function ExpenseCategoryDonut({ rows, totalExpense }: { rows: ExpenseCategoryRow[]; totalExpense: number }) {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  const segmentGap = rows.length > 1 ? 2.8 : 0;
  let segmentOffset = 0;
  const hasExpenses = totalExpense > 0 && rows.length > 0;

  return (
    <svg
      className="h-[5.85rem] w-[5.85rem] shrink-0 drop-shadow-[0_0_18px_rgba(154,53,255,0.16)]"
      viewBox="0 0 88 88"
      aria-hidden="true"
    >
      <circle
        cx="44"
        cy="44"
        fill="none"
        r={radius}
        stroke="rgba(199,166,255,0.12)"
        strokeWidth="9"
      />
      {hasExpenses
        ? rows.map((item) => {
            const segmentLength = (item.amount / totalExpense) * circumference;
            const visibleSegmentLength = Math.max(segmentLength - segmentGap, 0);
            const dashOffset = -(segmentOffset + segmentGap / 2);
            segmentOffset += segmentLength;

            return (
              <circle
                key={item.category}
                cx="44"
                cy="44"
                fill="none"
                r={radius}
                stroke={item.color}
                strokeDasharray={`${visibleSegmentLength} ${circumference - visibleSegmentLength}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
                strokeWidth="9"
                transform="rotate(-90 44 44)"
              />
            );
          })
        : null}
      <circle cx="44" cy="44" fill="rgba(5,5,10,0.88)" r="20" />
      <circle cx="44" cy="44" fill="none" r="19.5" stroke="rgba(199,166,255,0.1)" strokeWidth="1" />
    </svg>
  );
}
