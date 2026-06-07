"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartSpline,
  CirclePlus,
  LayoutGrid,
  PanelLeftClose,
  ReceiptText,
  SlidersHorizontal
} from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
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

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigationSections = [
    {
      title: "Overview",
      items: mainNavigation.filter((item) => ["Dashboard", "Reports"].includes(item.title))
    },
    {
      title: "Tools",
      items: mainNavigation.filter((item) => ["Transactions", "Add"].includes(item.title))
    },
    {
      title: "Settings",
      items: mainNavigation.filter((item) => item.title === "Settings")
    }
  ];

  return (
    <aside
      className={cn(
        "group/sidebar relative z-20 hidden min-h-screen shrink-0 transition-[width,padding] duration-300 ease-out lg:flex",
        isCollapsed ? "w-[5.5rem] px-2.5 py-4" : "w-64 px-4 py-4"
      )}
    >
      <div
        className={cn(
          "relative flex min-h-0 w-full flex-1 flex-col overflow-hidden border border-[rgba(199,166,255,0.16)] bg-[linear-gradient(180deg,rgba(13,9,25,0.94),rgba(5,5,10,0.97))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_56px_rgba(0,0,0,0.48),0_0_22px_rgba(123,0,212,0.045)] backdrop-blur-[18px]",
          isCollapsed ? "rounded-[2rem] px-2 py-4" : "rounded-[1.5rem] px-4 py-4"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(154,53,255,0.12),transparent_40%),radial-gradient(circle_at_60%_42%,rgba(34,211,238,0.035),transparent_34%)]" />

        <div className="relative flex h-12 items-center justify-between gap-3 px-1">
          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(199,166,255,0.18)] bg-[rgba(18,15,28,0.56)] text-[#C7B8E8] transition hover:border-[rgba(224,179,255,0.3)] hover:bg-[rgba(123,0,212,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B36BFF]/30"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <WireframeCube />
            </button>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="flex h-11 items-center gap-3 rounded-md border border-[rgba(199,166,255,0.18)] bg-[rgba(18,15,28,0.56)] px-3 text-sm font-semibold text-[#F8F4FF]"
                aria-label="SakuLog dashboard"
              >
                <WireframeCube />
                SakuLog
              </Link>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[rgba(199,166,255,0.16)] bg-[rgba(18,15,28,0.46)] text-[#C7B8E8] transition hover:border-[rgba(224,179,255,0.3)] hover:bg-[rgba(123,0,212,0.1)] hover:text-[#F8F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B36BFF]/30"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div
          className={cn(
            "relative mt-4 h-px bg-[#B36BFF]/16",
            isCollapsed ? "mx-auto w-10" : "mx-1"
          )}
        />

        <nav className="relative mt-4 space-y-3">
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p
                className={cn(
                  "px-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6F5F86] transition",
                  isCollapsed && "sr-only"
                )}
              >
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = icons[item.icon];
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex h-12 items-center rounded-md text-sm font-medium text-[#9B89B8]/72 transition",
                      isCollapsed ? "h-10 justify-center px-0" : "gap-3 px-3",
                      "hover:bg-[rgba(123,0,212,0.075)] hover:text-[#F8F4FF]",
                      isActive &&
                        "border border-[rgba(199,166,255,0.34)] bg-[linear-gradient(135deg,rgba(36,14,84,0.56),rgba(154,53,255,0.26),rgba(217,70,239,0.18))] text-[#F8F4FF] shadow-[0_0_22px_rgba(154,53,255,0.16),0_0_14px_rgba(34,211,238,0.05)]"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    {isActive ? (
                      <span className="absolute inset-y-2.5 left-0 w-px bg-[#E0B3FF] shadow-[0_0_16px_rgba(176,64,255,0.52)]" />
                    ) : null}
                    <span
                      className={cn(
                        "flex items-center justify-center rounded-md border transition",
                        isCollapsed ? "h-8 w-8" : "h-8 w-8",
                        isActive
                          ? "border-[#E0B3FF]/28 bg-[#B36BFF]/14 text-[#E0B3FF]"
                          : "border-[rgba(91,67,129,0.34)] bg-[rgba(18,15,28,0.48)] text-[#9B89B8]/78 group-hover:border-[#B36BFF]/28 group-hover:text-[#F8F4FF]"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className={cn("whitespace-nowrap transition", isCollapsed && "hidden")}>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div
          className={cn(
            "relative mt-4 h-px bg-[#B36BFF]/14",
            isCollapsed ? "mx-auto w-9" : "mx-1"
          )}
        />

        <div
          className={cn(
            "relative mt-auto border-[#B36BFF]/16 transition-all",
            isCollapsed ? "flex flex-col items-center gap-2.5 pb-2.5 pt-4" : "rounded-md border p-3"
          )}
        >
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border border-[#B36BFF]/22 bg-[#100B25]/70 text-xs font-medium text-[#C7B8E8]", !isCollapsed && "mb-3")}>
            AN
          </div>
          <p className={cn("text-sm font-semibold text-[#F8F4FF]", isCollapsed && "sr-only")}>
            Session secured
          </p>
          <p className={cn("mt-2 text-xs leading-5 text-[#9B89B8]", isCollapsed && "hidden")}>
            Workspace pribadi untuk membaca cashflow tanpa noise.
          </p>
          <LogoutButton
            className={cn("mt-3 justify-start px-3", isCollapsed && "h-9 w-9 justify-center px-0")}
            labelClassName={cn(isCollapsed && "sr-only")}
            variant="secondary"
          />
        </div>
      </div>
    </aside>
  );
}

function WireframeCube() {
  return (
    <span className="relative block h-5 w-5 border border-[#B36BFF]/42">
      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-[#D8B4FE]/42" />
      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-cyan-200/32" />
    </span>
  );
}
