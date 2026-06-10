import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020203] text-[#F8F4FF] lg:flex">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_84%_7%,rgba(146,82,255,0.052),transparent_32%),radial-gradient(circle_at_8%_92%,rgba(22,31,48,0.2),transparent_31%),radial-gradient(circle_at_60%_118%,rgba(34,211,238,0.018),transparent_36%),linear-gradient(135deg,#020203_0%,#050609_44%,#07070A_72%,#020203_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:72px_72px] opacity-32" />
      <AppSidebar />
      <div className="relative z-10 flex min-h-screen flex-1 flex-col bg-[rgba(2,2,4,0.42)]">
        <main className="mx-auto w-full max-w-[90rem] flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
