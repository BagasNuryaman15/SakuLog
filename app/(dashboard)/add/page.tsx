import { PageHeader } from "@/components/layout/page-header";

export default function AddPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Add"
        description="A dedicated entry point for future income and expense forms."
      />
      <section className="rounded-md border bg-card/78 p-6 shadow-sm backdrop-blur">
        <p className="text-sm text-muted-foreground">Transaction forms are not implemented yet.</p>
      </section>
    </div>
  );
}
