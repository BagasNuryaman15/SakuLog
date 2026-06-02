import { LogoutButton } from "@/components/auth/logout-button";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Preferences and account-related options will be shaped in a later task."
      />
      <section className="rounded-lg border border-white/10 bg-card/68 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Session</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign out of SakuLog on this device.
            </p>
          </div>
          <LogoutButton className="sm:w-auto" />
        </div>
      </section>
    </div>
  );
}
