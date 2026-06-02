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
    <aside className="hidden min-h-screen w-72 shrink-0 border-r bg-card/72 px-5 py-6 shadow-[0_24px_80px_rgba(27,37,31,0.08)] backdrop-blur lg:flex lg:flex-col">
      <Link href="/dashboard" className="flex items-center gap-3 rounded-md px-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
          <WalletCards className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-lg font-semibold tracking-tight">SakuLog</span>
          <span className="block text-xs text-muted-foreground">Personal finance</span>
        </span>
      </Link>

      <nav className="mt-10 space-y-1">
        {mainNavigation.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-md border bg-background/70 p-4">
        <p className="text-sm font-medium">Private workspace</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Your session is active. Sign out when you are done reviewing your finances.
        </p>
        <LogoutButton className="mt-4" variant="secondary" />
      </div>
    </aside>
  );
}
