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
          <div key={period} className="rounded-md border bg-card/78 p-5 shadow-sm backdrop-blur">
            <p className="text-sm font-medium">{period}</p>
            <p className="mt-2 text-sm text-muted-foreground">Report placeholder</p>
          </div>
        ))}
      </section>
    </div>
  );
}
