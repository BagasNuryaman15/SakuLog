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
          "relative flex min-h-0 w-full flex-1 flex-col overflow-hidden border border-[rgba(125,163,255,0.22)] bg-[linear-gradient(180deg,rgba(9,14,31,0.94),rgba(3,7,18,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_48px_rgba(0,0,0,0.32)] backdrop-blur-[18px]",
          isCollapsed ? "rounded-[2rem] px-2 py-4" : "rounded-[1.5rem] px-4 py-4"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.16),transparent_38%),radial-gradient(circle_at_60%_42%,rgba(34,211,238,0.08),transparent_32%)]" />

        <div className="relative flex h-12 items-center justify-between gap-3 px-1">
          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(148,163,184,0.2)] bg-[rgba(15,23,42,0.46)] text-slate-300 transition hover:border-[rgba(103,232,249,0.32)] hover:bg-[rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/35"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <WireframeCube />
            </button>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="flex h-11 items-center gap-3 rounded-md border border-[rgba(148,163,184,0.2)] bg-[rgba(15,23,42,0.46)] px-3 text-sm font-semibold text-slate-200"
                aria-label="SakuLog dashboard"
              >
                <WireframeCube />
                SakuLog
              </Link>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[rgba(148,163,184,0.2)] bg-[rgba(15,23,42,0.36)] text-slate-300 transition hover:border-[rgba(103,232,249,0.32)] hover:bg-[rgba(34,211,238,0.08)] hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/35"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div
          className={cn(
            "relative mt-4 h-px bg-cyan-100/12",
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
                      "hover:bg-[rgba(34,211,238,0.06)] hover:text-slate-200",
                      isActive &&
                        "border border-[rgba(103,232,249,0.42)] bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(217,70,239,0.34))] text-slate-100 shadow-[0_0_24px_rgba(34,211,238,0.16),0_0_28px_rgba(168,85,247,0.16)]"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    {isActive ? (
                      <span className="absolute inset-y-2.5 left-0 w-px bg-cyan-200/90 shadow-[0_0_14px_rgba(34,211,238,0.42)]" />
                    ) : null}
                    <span
                      className={cn(
                        "flex items-center justify-center rounded-md border transition",
                        isCollapsed ? "h-8 w-8" : "h-8 w-8",
                        isActive
                          ? "border-white/20 bg-white/10 text-cyan-50"
                          : "border-[rgba(148,163,184,0.16)] bg-[rgba(15,23,42,0.36)] text-slate-400/70 group-hover:border-[rgba(103,232,249,0.28)] group-hover:text-slate-200"
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
            "relative mt-4 h-px bg-cyan-100/10",
            isCollapsed ? "mx-auto w-9" : "mx-1"
          )}
        />

        <div
          className={cn(
            "relative mt-auto border-cyan-100/12 transition-all",
            isCollapsed ? "flex flex-col items-center gap-2.5 pb-2.5 pt-4" : "rounded-md border p-3"
          )}
        >
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border border-violet-200/24 bg-violet-300/[0.04] text-xs font-medium text-slate-300", !isCollapsed && "mb-3")}>
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
    <span className="relative block h-5 w-5 border border-cyan-200/34">
      <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-violet-200/34" />
      <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-cyan-200/34" />
    </span>
  );
}
