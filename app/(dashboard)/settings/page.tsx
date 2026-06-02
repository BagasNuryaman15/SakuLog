import { LogoutButton } from "@/components/auth/logout-button";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Kontrol sesi dan preferensi workspace pribadi kamu."
      />
      <section className="rounded-[1.8rem] border border-white/10 bg-black/24 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Session</p>
            <p className="mt-1 text-sm text-indigo-100/50">
              Sign out of SakuLog on this device.
            </p>
          </div>
          <LogoutButton className="sm:w-auto" />
        </div>
      </section>
    </div>
  );
}
