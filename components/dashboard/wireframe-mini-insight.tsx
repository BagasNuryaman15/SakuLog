import type { DashboardSummary } from "@/lib/reports/dashboard";
import { cn } from "@/lib/utils";
import { WireframeCard } from "./dashboard-primitives";
import { MiniInsightBlackhole } from "./dashboard-glyphs";
import {
  captionText,
  metricLabel,
  rightRailSurfaceClass,
  rightRailTitle
} from "./dashboard-style-tokens";

export function WireframeMiniInsight({ summary }: { summary: DashboardSummary }) {
  const topCategory = summary.topExpenseCategory;
  const insight = topCategory
    ? `Bulan ini pengeluaran terbesar ada di kategori ${topCategory.category}.`
    : "Belum ada pola pengeluaran yang bisa dibaca.";
  const tip = topCategory
    ? "Pantau kategori ini agar cashflow tetap aman."
    : "Catat transaksi untuk mulai melihat insight.";

  return (
    <WireframeCard className={cn(rightRailSurfaceClass, "h-[6.75rem] p-4")}>
      <h3 className={cn(rightRailTitle, "truncate")}>Mini Insight</h3>
      <div className="mt-3 grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] gap-3">
        <MiniInsightBlackhole />
        <div className="min-w-0">
          <p className={cn(metricLabel, "line-clamp-2 text-[#C7B8E8]/90")}>
            {insight}
          </p>
          <p className={cn(captionText, "mt-1 truncate text-[#D8B4FE]/68")}>{tip}</p>
        </div>
      </div>
    </WireframeCard>
  );
}
