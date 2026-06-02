import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Preferences and account-related options will be shaped in a later task."
      />
      <section className="rounded-md border bg-card/78 p-6 shadow-sm backdrop-blur">
        <p className="text-sm text-muted-foreground">Settings placeholder only.</p>
      </section>
    </div>
  );
}
