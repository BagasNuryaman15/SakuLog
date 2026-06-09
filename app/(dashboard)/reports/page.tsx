import { PageHeader } from "@/components/layout/page-header";
import { ReportPeriodCard } from "@/components/reports/report-period-card";
import { getReportSummaries } from "@/lib/reports/report-summary";

export default async function ReportsPage() {
  const summaries = await getReportSummaries();
  const periods = [summaries.today, summaries.week, summaries.month, summaries.year] as const;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Ruang analisis periodik untuk membaca pola uang harian, mingguan, bulanan, dan tahunan."
      />
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {periods.map((period) => (
          <ReportPeriodCard key={period.label} summary={period} />
        ))}
      </section>
    </div>
  );
}
