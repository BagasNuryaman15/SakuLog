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
          <section
            key={label}
            className="rounded-lg border border-white/10 bg-card/68 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl"
          >
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Coming soon</p>
          </section>
        ))}
      </div>
    </div>
  );
}
