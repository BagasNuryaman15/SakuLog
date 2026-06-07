import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F8F4FF] lg:flex">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(176,64,255,0.18),transparent_30%),radial-gradient(circle_at_8%_92%,rgba(217,70,239,0.1),transparent_28%),radial-gradient(circle_at_58%_118%,rgba(34,211,238,0.035),transparent_34%),linear-gradient(135deg,#050407_0%,#080611_38%,#0B0618_68%,#050407_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(224,179,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(224,179,255,0.014)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
      <AppSidebar />
      <div className="relative z-10 flex min-h-screen flex-1 flex-col bg-[rgba(5,4,7,0.42)]">
        <main className="w-full max-w-none flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
