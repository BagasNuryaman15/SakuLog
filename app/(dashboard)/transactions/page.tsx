import { PageHeader } from "@/components/layout/page-header";

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Transactions"
        description="Transaction history placeholder. CRUD and filters are intentionally deferred."
      />
      <section className="rounded-md border bg-card/78 p-6 shadow-sm backdrop-blur">
        <p className="text-sm text-muted-foreground">No transaction table yet.</p>
      </section>
    </div>
  );
}
