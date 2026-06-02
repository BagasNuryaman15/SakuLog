import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="A calm overview for income, expenses, and money movement will live here."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Balance", "Income", "Expenses", "Savings rate"].map((label) => (
          <section key={label} className="rounded-md border bg-card/78 p-5 shadow-sm backdrop-blur">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Coming soon</p>
          </section>
        ))}
      </div>
    </div>
  );
}
