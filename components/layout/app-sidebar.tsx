"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartSpline,
  CirclePlus,
  GalleryVerticalEnd,
  LayoutGrid,
  PanelLeftClose,
  ReceiptText,
  SlidersHorizontal
} from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { BrandMark } from "@/components/layout/brand-mark";
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
        "group/sidebar relative z-20 hidden min-h-screen shrink-0 overflow-hidden border-r border-white/10 bg-black/20 py-6 shadow-[28px_0_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl transition-[width,padding] duration-300 ease-out lg:flex lg:flex-col",
        isCollapsed ? "w-[6rem] px-4" : "w-64 px-5"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(119,92,255,0.18),transparent_18rem)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-300/35 to-transparent" />

      <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl px-1">
        {isCollapsed ? (
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            className="mx-auto flex rounded-2xl transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <BrandMark compact />
          </button>
        ) : (
          <>
            <Link href="/dashboard" aria-label="SakuLog dashboard">
              <BrandMark />
            </Link>
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] text-indigo-100/68 shadow-[0_12px_36px_rgba(0,0,0,0.22)] transition hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      <div
        className={cn(
          "relative mt-7 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent",
          isCollapsed ? "mx-auto w-12" : "mx-1"
        )}
      />

      <nav className="relative mt-7 space-y-6">
        {navigationSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p
              className={cn(
                "px-3 text-xs font-medium uppercase tracking-[0.22em] text-white/32 transition",
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
                    "group relative flex h-12 items-center rounded-2xl text-sm font-medium text-indigo-100/52 transition-all",
                    isCollapsed ? "h-14 justify-center px-0" : "gap-3 px-3",
                    "hover:bg-white/[0.06] hover:text-white",
                    isActive &&
                      "border border-white/12 bg-[linear-gradient(135deg,rgba(64,212,255,0.18),rgba(158,74,255,0.34),rgba(255,67,188,0.22))] text-white shadow-[0_18px_55px_rgba(109,92,255,0.28)]"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  {isActive ? (
                    <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.75)]" />
                  ) : null}
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-xl transition",
                      isCollapsed ? "h-10 w-10" : "h-8 w-8",
                      isActive
                        ? "bg-white/12 text-cyan-100"
                        : "bg-white/[0.045] text-indigo-100/52 group-hover:text-white"
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
          "relative mt-7 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent",
          isCollapsed ? "mx-auto w-10" : "mx-1"
        )}
      />

      <div
        className={cn(
          "relative mt-auto rounded-3xl border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-all",
          isCollapsed ? "flex flex-col items-center gap-3 p-2" : "p-4"
        )}
      >
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-100", !isCollapsed && "mb-4")}>
          <GalleryVerticalEnd className="h-4 w-4" />
        </div>
        <p className={cn("text-sm font-semibold text-white", isCollapsed && "sr-only")}>
          Session secured
        </p>
        <p className={cn("mt-2 text-xs leading-5 text-indigo-100/48", isCollapsed && "hidden")}>
          Workspace pribadi untuk membaca cashflow tanpa noise.
        </p>
        <LogoutButton
          className={cn("mt-3 justify-start px-3", isCollapsed && "h-10 w-10 justify-center px-0")}
          labelClassName={cn(isCollapsed && "sr-only")}
          variant="secondary"
        />
      </div>
    </aside>
  );
}
