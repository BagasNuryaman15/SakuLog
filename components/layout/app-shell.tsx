import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden lg:flex">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(120,87,255,0.24),transparent_22rem),radial-gradient(circle_at_86%_12%,rgba(56,189,248,0.13),transparent_24rem),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:auto,auto,52px_52px,52px_52px]" />
      <div className="pointer-events-none fixed left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-3xl" />
      <AppSidebar />
      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        <main className="mx-auto w-full max-w-[86rem] flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pb-12">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
