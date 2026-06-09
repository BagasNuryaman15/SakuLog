import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { WireframeCard } from "./dashboard-primitives";
import { CashflowLegendDot } from "./dashboard-glyphs";
import {
  calculateNiceMax,
  formatCompactIDR,
  getBarHeightPercent,
  type CashflowRange,
  cashflowRangeOptions
} from "./dashboard-helpers";
import {
  captionText,
  cardSubtitle,
  cashflowSurfaceClass,
  chartLabel,
  metricLabel,
  navLabel,
  rightRailTitle
} from "./dashboard-style-tokens";

export function WireframeCashflowTrend({
  cashflowRange,
  isCashflowRangeOpen,
  onCashflowRangeMenuClose,
  onCashflowRangeMenuToggle,
  onCashflowRangeChange,
  summary
}: {
  cashflowRange: CashflowRange;
  isCashflowRangeOpen: boolean;
  onCashflowRangeMenuClose: () => void;
  onCashflowRangeMenuToggle: () => void;
  onCashflowRangeChange: (range: CashflowRange) => void;
  summary: DashboardSummary;
}) {
  const series = summary.monthSeries.slice(-cashflowRange);
  const rawMaxValue = Math.max(...series.flatMap((item) => [item.income, item.expense]), 0);
  const scaleMaxValue = calculateNiceMax(rawMaxValue);
  const axisLabels = [
    scaleMaxValue,
    scaleMaxValue * 0.75,
    scaleMaxValue * 0.5,
    scaleMaxValue * 0.25,
    0
  ];
  const hasCashflowData = series.some((item) => item.income > 0 || item.expense > 0);

  function renderCashflowBar(value: number, tone: "income" | "expense") {
    const heightPercent = getBarHeightPercent(value, scaleMaxValue);
    const barClass =
      tone === "income"
        ? "border-cyan-100/55 bg-[linear-gradient(180deg,rgba(151,245,255,0.98),rgba(34,211,238,0.72)_48%,rgba(8,145,178,0.38))] shadow-[0_0_24px_rgba(34,211,238,0.28),0_0_46px_rgba(34,211,238,0.11),inset_0_1px_0_rgba(255,255,255,0.26)]"
        : "border-[#FBCFE8]/48 bg-[linear-gradient(180deg,rgba(253,186,233,0.98),rgba(225,77,170,0.72)_48%,rgba(190,24,93,0.38))] shadow-[0_0_24px_rgba(236,72,153,0.26),0_0_46px_rgba(217,70,239,0.1),inset_0_1px_0_rgba(255,255,255,0.22)]";
    const labelClass = tone === "income" ? "text-cyan-100/78" : "text-[#FBCFE8]/78";

    return (
      <div className="group relative flex h-full w-full max-w-5 items-end justify-center">
        {value > 0 ? (
          <span
            className={cn(
              chartLabel,
              "pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-sm border border-[#B36BFF]/22 bg-[rgba(16,7,37,0.92)] px-1.5 py-0.5 text-[0.58rem] leading-none opacity-0 shadow-[0_8px_18px_rgba(10,10,10,0.24)] transition-opacity duration-150 group-hover:opacity-100",
              labelClass
            )}
            style={{ bottom: `calc(${heightPercent}% + 0.35rem)` }}
          >
            {formatCompactIDR(value)}
          </span>
        ) : null}
        <div
          className={cn("relative w-full overflow-hidden rounded-sm border", barClass)}
          style={{ height: `${heightPercent}%` }}
          title={value > 0 ? formatCurrencyIDR(value) : "Rp0"}
        >
          <span className="absolute inset-x-[2px] top-1 h-1/3 rounded-full bg-white/24 blur-[2px]" />
        </div>
      </div>
    );
  }

  return (
    <WireframeCard className={cn(cashflowSurfaceClass, "h-[19rem] p-5 xl:[grid-area:cashflow]")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={cn(rightRailTitle, "truncate")}>Cashflow Trend</h3>
          <p className={cn(cardSubtitle, "mt-2 truncate")}>Pemasukan vs pengeluaran {cashflowRange} bulan terakhir</p>
        </div>
        <div className="hidden shrink-0 items-center gap-6 md:flex">
          <span className={cn(chartLabel, "inline-flex items-center gap-2 text-xs font-bold text-[#9DECF6]/92")}>
            <CashflowLegendDot tone="income" />
            Pemasukan
          </span>
          <span className={cn(chartLabel, "inline-flex items-center gap-2 text-xs font-bold text-[#F9A8D4]/92")}>
            <CashflowLegendDot tone="expense" />
            Pengeluaran
          </span>
          <div className="relative">
            <button
              type="button"
              className={cn(
                navLabel,
                "grid h-10 w-32 grid-cols-[1rem_minmax(0,1fr)_1rem] items-center rounded-[0.9rem] border border-[rgba(91,67,129,0.42)] bg-[linear-gradient(180deg,rgba(22,18,34,0.9),rgba(11,10,18,0.86))] px-3.5 text-[#F8F4FF] shadow-[0_12px_28px_rgba(10,10,10,0.24),inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition duration-150 hover:-translate-y-px hover:border-[#B36BFF]/34 hover:bg-[linear-gradient(180deg,rgba(28,22,43,0.94),rgba(12,10,20,0.9))] hover:shadow-[0_15px_30px_rgba(10,10,10,0.3),0_0_14px_rgba(106,44,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:border-[#D8B4FE]/48 focus-visible:shadow-[0_0_0_2px_rgba(179,107,255,0.2),0_12px_28px_rgba(10,10,10,0.22)]"
              )}
              aria-expanded={isCashflowRangeOpen}
              aria-haspopup="listbox"
              aria-label="Pilih rentang cashflow"
              onClick={onCashflowRangeMenuToggle}
            >
              <span />
              <span className="truncate text-center">{cashflowRange} Bulan</span>
              <span
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 justify-self-end text-[0.55rem] leading-none text-[#8B5CF6] transition-colors duration-150",
                  isCashflowRangeOpen ? "text-[#B36BFF]" : "text-[#8B5CF6]"
                )}
                aria-hidden="true"
              >
                <span>▲</span>
                <span>▼</span>
              </span>
            </button>
            <div
              className={cn(
                "absolute right-0 top-12 z-20 w-32 overflow-hidden rounded-[0.95rem] border border-[#B36BFF]/16 bg-[rgba(5,5,10,0.97)] p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.46),0_0_16px_rgba(106,44,255,0.09)] backdrop-blur transition duration-150",
                isCashflowRangeOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
              )}
              role="listbox"
            >
              {cashflowRangeOptions.map((range) => {
                const isActive = cashflowRange === range;

                return (
                  <button
                    key={range}
                    type="button"
                    className={cn(
                      navLabel,
                      "flex h-10 w-full items-center justify-between rounded-[0.78rem] px-3.5 text-left text-[0.78rem] transition-colors focus-visible:bg-[rgba(179,107,255,0.16)] focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_rgba(216,180,254,0.28)]",
                      isActive
                        ? "bg-[linear-gradient(180deg,rgba(28,22,43,0.72),rgba(12,10,20,0.7))] text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[linear-gradient(180deg,rgba(34,26,52,0.74),rgba(14,12,22,0.72))]"
                        : "text-[#9B89B8] hover:bg-[linear-gradient(180deg,rgba(24,19,36,0.5),rgba(12,10,20,0.38))] hover:text-[#E0B3FF]"
                    )}
                    aria-selected={isActive}
                    role="option"
                    onClick={() => {
                      onCashflowRangeChange(range);
                      onCashflowRangeMenuClose();
                    }}
                  >
                    <span>{range} Bulan</span>
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D8B4FE] shadow-[0_0_10px_rgba(216,180,254,0.5)]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 h-[12.75rem] min-w-0 pb-4">
        <div className="grid h-full min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
          <div className="flex h-full flex-col justify-between pb-9 pt-4">
            {axisLabels.map((value) => (
              <span key={value} className={cn(chartLabel, "truncate text-right text-[#9B89B8]/74")}>
                {formatCompactIDR(value)}
              </span>
            ))}
          </div>
          <div className="relative flex h-full min-w-0 items-end gap-4 overflow-hidden rounded-sm border border-[#B36BFF]/12 bg-[linear-gradient(rgba(199,166,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(199,166,255,0.018)_1px,transparent_1px),linear-gradient(180deg,rgba(18,15,28,0.22),rgba(5,5,10,0.08))] bg-[size:100%_25%,16.666%_100%,auto] pb-6 pl-4 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),inset_0_-28px_60px_rgba(123,0,212,0.026)]">
            <span className="pointer-events-none absolute inset-x-4 bottom-9 h-px bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.24),rgba(199,166,255,0.18),transparent)]" />
            <span className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(199,166,255,0.08),transparent)]" />
            {series.length > 0 ? (
              series.map((item) => {
                const hasMonthData = item.income > 0 || item.expense > 0;

                return (
                  <div key={item.key} className="relative flex h-full min-w-0 flex-1 flex-col justify-end">
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(199,166,255,0.16),transparent)]",
                        hasMonthData ? "opacity-45" : "opacity-20"
                      )}
                    />
                    <div className="relative flex h-full min-w-0 items-end justify-center gap-1.5">
                      {renderCashflowBar(item.income, "income")}
                      {renderCashflowBar(item.expense, "expense")}
                    </div>
                    <span className={cn(chartLabel, "relative mx-auto mt-3 max-w-10 truncate text-center text-[#9B89B8]/78")}>
                      {item.label}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex h-full min-w-0 flex-1 items-center justify-center px-4 text-center">
                <div className="min-w-0">
                  <p className={cn(metricLabel, "text-[#F8F4FF]/86")}>Belum ada data cashflow</p>
                  <p className={cn(captionText, "mt-1 line-clamp-2")}>
                    Catat pemasukan dan pengeluaran untuk melihat tren.
                  </p>
                </div>
              </div>
            )}
            {!hasCashflowData && series.length > 0 ? (
              <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-md border border-[rgba(91,67,129,0.32)] bg-[rgba(8,7,13,0.76)] px-3 py-2 text-center">
                <p className={cn(captionText, "text-[#C7B8E8]/82")}>
                  Belum ada arus kas pada {cashflowRange} bulan terakhir.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </WireframeCard>
  );
}
