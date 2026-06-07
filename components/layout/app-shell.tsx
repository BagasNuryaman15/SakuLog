import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05050A] text-[#F8F4FF] lg:flex">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_84%_7%,rgba(154,53,255,0.11),transparent_32%),radial-gradient(circle_at_8%_92%,rgba(123,0,212,0.055),transparent_31%),radial-gradient(circle_at_60%_118%,rgba(34,211,238,0.026),transparent_36%),linear-gradient(135deg,#040407_0%,#070611_42%,#090713_72%,#040407_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(224,179,255,0.011)_1px,transparent_1px),linear-gradient(90deg,rgba(224,179,255,0.008)_1px,transparent_1px)] bg-[size:72px_72px] opacity-38" />
      <AppSidebar />
      <div className="relative z-10 flex min-h-screen flex-1 flex-col bg-[rgba(4,4,7,0.52)]">
        <main className="w-full max-w-none flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
