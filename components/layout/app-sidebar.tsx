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
          "relative flex min-h-0 w-full flex-1 flex-col overflow-hidden border border-slate-600/45 bg-[#030811]",
          isCollapsed ? "rounded-[2rem] px-2 py-4" : "rounded-[1.5rem] px-4 py-4"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#06101a]/45" />

        <div className="relative flex h-12 items-center justify-between gap-3 px-1">
          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-md border border-slate-500/55 text-slate-300 transition hover:border-slate-400 hover:bg-slate-800/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/60"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <WireframeCube />
            </button>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="flex h-11 items-center gap-3 rounded-md border border-slate-500/45 px-3 text-sm font-semibold text-slate-200"
                aria-label="SakuLog dashboard"
              >
                <WireframeCube />
                SakuLog
              </Link>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-500/45 text-slate-300 transition hover:bg-slate-800/35 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/60"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div
          className={cn(
            "relative mt-4 h-px bg-slate-600/45",
            isCollapsed ? "mx-auto w-10" : "mx-1"
          )}
        />

        <nav className="relative mt-4 space-y-3">
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p
                className={cn(
                  "px-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 transition",
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
                      "group relative flex h-12 items-center rounded-md text-sm font-medium text-slate-500 transition",
                      isCollapsed ? "h-10 justify-center px-0" : "gap-3 px-3",
                      "hover:bg-slate-800/28 hover:text-slate-200",
                      isActive && "border border-slate-500/55 bg-slate-800/28 text-slate-100"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    {isActive ? (
                      <span className="absolute inset-y-2.5 left-0 w-px bg-slate-300/70" />
                    ) : null}
                    <span
                      className={cn(
                        "flex items-center justify-center rounded-md border border-slate-600/40 transition",
                        isCollapsed ? "h-8 w-8" : "h-8 w-8",
                        isActive ? "border-slate-400/65 text-slate-100" : "text-slate-500 group-hover:text-slate-200"
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
            "relative mt-4 h-px bg-slate-600/40",
            isCollapsed ? "mx-auto w-9" : "mx-1"
          )}
        />

        <div
          className={cn(
            "relative mt-auto border-slate-600/45 transition-all",
            isCollapsed ? "flex flex-col items-center gap-2.5 pb-2.5 pt-4" : "rounded-md border p-3"
          )}
        >
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border border-slate-500/55 text-xs font-medium text-slate-300", !isCollapsed && "mb-3")}>
            AN
          </div>
          <p className={cn("text-sm font-semibold text-slate-200", isCollapsed && "sr-only")}>
            Session secured
          </p>
          <p className={cn("mt-2 text-xs leading-5 text-slate-500", isCollapsed && "hidden")}>
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
    <span className="relative block h-5 w-5 border border-slate-500/70">
      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-slate-500/70" />
      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-slate-500/70" />
    </span>
  );
}
