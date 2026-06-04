import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-200 lg:flex">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.18),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.1),transparent_38%),linear-gradient(135deg,#030712_0%,#06111f_42%,#090b1f_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-55" />
      <AppSidebar />
      <div className="relative z-10 flex min-h-screen flex-1 flex-col bg-[rgba(5,13,28,0.38)]">
        <main className="w-full max-w-none flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
