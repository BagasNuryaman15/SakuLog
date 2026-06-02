import { PageHeader } from "@/components/layout/page-header";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Daily, weekly, monthly, and yearly report views will be added later."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Daily", "Weekly", "Monthly", "Yearly"].map((period) => (
          <div
            key={period}
            className="rounded-lg border border-white/10 bg-card/68 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl"
          >
            <p className="text-sm font-medium">{period}</p>
            <p className="mt-2 text-sm text-muted-foreground">Report placeholder</p>
          </div>
        ))}
      </section>
    </div>
  );
}
