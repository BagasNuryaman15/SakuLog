"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartSpline, CirclePlus, LayoutGrid, ReceiptText, SlidersHorizontal } from "lucide-react";

import { mainNavigation } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

const icons: Record<NavigationItem["icon"], React.ComponentType<{ className?: string }>> = {
  "layout-dashboard": LayoutGrid,
  list: ReceiptText,
  plus: CirclePlus,
  chart: ChartSpline,
  settings: SlidersHorizontal
};

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-white/12 bg-black/55 px-2 py-2 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {mainNavigation.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-medium text-indigo-100/54 transition-all",
                "hover:bg-white/[0.06] hover:text-white",
                isActive &&
                  "border border-white/12 bg-[linear-gradient(135deg,rgba(99,102,241,0.32),rgba(255,255,255,0.08))] text-white shadow-[0_12px_34px_rgba(79,70,229,0.28)]"
              )}
              aria-label={item.title}
            >
              <Icon className={cn("h-4 w-4", isActive && "text-cyan-100")} />
              <span className="max-w-full truncate">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
