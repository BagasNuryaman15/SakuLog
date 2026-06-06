import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F8F4FF] lg:flex">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(176,64,255,0.2),transparent_34%),radial-gradient(circle_at_18%_18%,rgba(106,44,255,0.18),transparent_32%),radial-gradient(circle_at_52%_100%,rgba(34,211,238,0.055),transparent_38%),linear-gradient(135deg,#0A0A0A_0%,#0D0B1F_42%,#100725_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(224,179,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(224,179,255,0.028)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />
      <AppSidebar />
      <div className="relative z-10 flex min-h-screen flex-1 flex-col bg-[rgba(10,10,10,0.32)]">
        <main className="w-full max-w-none flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
