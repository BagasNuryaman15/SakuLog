import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03070d] lg:flex">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(12,24,38,0.52),rgba(3,7,13,0.9)_36%,rgba(3,7,13,1))]" />
      <AppSidebar />
      <div className="relative z-10 flex min-h-screen flex-1 flex-col bg-[#060b12]/82">
        <main className="w-full max-w-none flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
