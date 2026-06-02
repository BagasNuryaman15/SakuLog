"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LayoutDashboard, ListChecks, Plus, Settings } from "lucide-react";

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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-md border border-white/10 bg-card/88 px-2 py-2 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {mainNavigation.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md px-1 text-[11px] font-medium text-muted-foreground transition-all",
                "hover:bg-white/[0.06] hover:text-foreground",
                isActive &&
                  "border border-primary/25 bg-gradient-to-b from-primary/20 to-white/[0.04] text-foreground shadow-sm"
              )}
              aria-label={item.title}
            >
              <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
              <span className="max-w-full truncate">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
