"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  ListChecks,
  Plus,
  Settings,
  WalletCards
} from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { mainNavigation } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

const icons: Record<NavigationItem["icon"], React.ComponentType<{ className?: string }>> = {
  "layout-dashboard": LayoutDashboard,
  list: ListChecks,
  plus: Plus,
  chart: BarChart3,
  settings: Settings
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="group/sidebar relative z-20 hidden min-h-screen w-24 shrink-0 overflow-hidden border-r border-white/10 bg-card/46 px-4 py-6 shadow-[24px_0_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-[width] duration-300 ease-out hover:w-72 focus-within:w-72 lg:flex lg:flex-col">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/35 to-transparent" />
      <Link href="/dashboard" className="flex h-12 items-center gap-3 rounded-md px-2">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-cyan-300 via-primary to-violet-400 text-primary-foreground shadow-[0_16px_48px_rgba(20,184,166,0.26)]">
          <WalletCards className="h-5 w-5" />
        </span>
        <span className="min-w-0 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">
          <span className="block text-lg font-semibold tracking-tight">SakuLog</span>
          <span className="block text-xs text-muted-foreground">Private finance</span>
        </span>
      </Link>

      <nav className="mt-10 space-y-1.5">
        {mainNavigation.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex h-12 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-all",
                "hover:bg-white/[0.06] hover:text-foreground",
                isActive &&
                  "border border-primary/25 bg-gradient-to-r from-primary/20 to-white/[0.04] text-foreground shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md transition",
                  isActive ? "bg-primary/18 text-primary" : "bg-white/[0.04] text-muted-foreground group-hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-md border border-white/10 bg-background/36 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <p className="whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">
          Private workspace
        </p>
        <p className="mt-1 hidden text-xs leading-5 text-muted-foreground group-hover/sidebar:block group-focus-within/sidebar:block">
          Your session is active. Sign out when you are done reviewing your finances.
        </p>
        <LogoutButton
          className="mt-3 justify-start px-3"
          labelClassName="whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100"
          variant="secondary"
        />
      </div>
    </aside>
  );
}
