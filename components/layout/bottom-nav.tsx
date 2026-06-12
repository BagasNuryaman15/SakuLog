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
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-[#C7A6FF]/14 bg-[#05050A]/82 px-2 py-2 shadow-[0_24px_90px_rgba(0,0,0,0.5),0_0_18px_rgba(123,0,212,0.045)] backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {mainNavigation.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href;
          const isAddItem = item.href === "/add";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border border-transparent px-1 text-[11px] font-medium text-indigo-100/58 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                "hover:border-white/[0.08] hover:bg-white/[0.045] hover:text-white",
                isAddItem &&
                  !isActive &&
                  "text-[#D8B4FE]/88 hover:border-[#BFA7FF]/16 hover:bg-[linear-gradient(135deg,rgba(92,36,241,0.16),rgba(179,107,255,0.075))]",
                isActive && "text-white"
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.title}
            >
              <Icon
                className={cn(
                  "h-4 w-4 text-indigo-100/66",
                  isAddItem && "text-[#D8B4FE]/90",
                  isActive && "text-[#F8F4FF]"
                )}
              />
              <span className="max-w-full truncate">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
