"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  PanelLeftClose,
  Plus,
  ReceiptText,
  Settings,
  type LucideIcon
} from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { mainNavigation } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

const icons: Record<NavigationItem["icon"], LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  list: ReceiptText,
  plus: Plus,
  chart: BarChart3,
  settings: Settings
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
        isCollapsed ? "w-[4.75rem] px-2 py-4" : "w-64 px-4 py-4"
      )}
    >
      <div
        className={cn(
          "relative flex min-h-0 w-full flex-1 flex-col overflow-visible border border-[rgba(214,226,255,0.07)] bg-[linear-gradient(180deg,rgba(5,6,10,0.985),rgba(2,2,4,0.99)_58%,rgba(4,3,8,0.99))] shadow-[inset_0_1px_0_rgba(255,255,255,0.032),0_24px_60px_rgba(0,0,0,0.62)] backdrop-blur-[18px]",
          isCollapsed ? "rounded-[1.2rem] px-2 py-4" : "rounded-[1.25rem] px-4 py-4"
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(146,82,255,0.035),transparent_38%),radial-gradient(circle_at_60%_42%,rgba(34,211,238,0.012),transparent_34%)]" />

        <div className="relative flex h-12 items-center justify-between gap-3 px-1">
          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="group group/brand mx-auto flex h-10 w-10 items-center justify-center rounded-[0.8rem] border border-white/[0.08] bg-[rgba(11,12,18,0.78)] text-[#C7B8E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:-translate-y-px hover:border-[#BFA7FF]/22 hover:bg-white/[0.045] hover:text-[#F8F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <SidebarBrandSlot />
              <SidebarTooltip label="Expand sidebar" show={isCollapsed} />
            </button>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="group group/brand flex h-12 min-w-0 items-center gap-3 rounded-[0.9rem] border border-white/[0.08] bg-[rgba(11,12,18,0.78)] px-2.5 text-sm font-semibold text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:-translate-y-px hover:border-[#BFA7FF]/22 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="SakuLog dashboard"
              >
                <SidebarBrandSlot />
                <span className="min-w-0">
                  <span className="block truncate leading-none">SakuLog</span>
                  <span className="mt-1 block truncate text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#67E8F9]/48">
                    Money OS
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.75rem] border border-white/[0.08] bg-[rgba(10,11,15,0.66)] text-[#B9A9D8] transition hover:-translate-y-px hover:border-[#BFA7FF]/22 hover:bg-white/[0.045] hover:text-[#F8F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div
          className={cn(
            "relative mt-4 h-px bg-[rgba(214,226,255,0.06)]",
            isCollapsed ? "mx-auto w-10" : "mx-1"
          )}
        />

        <nav className="relative mt-4 space-y-3" aria-label="Dashboard navigation">
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
                const isAddItem = item.href === "/add";

                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex h-10 items-center rounded-[0.72rem] text-sm font-semibold text-[#9B89B8]/74 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                        isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                        "hover:-translate-y-px hover:bg-[rgba(255,255,255,0.045)] hover:text-[#F8F4FF]",
                        isActive &&
                          (isCollapsed
                            ? "bg-[rgba(255,255,255,0.078)] text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                            : "border border-white/[0.08] bg-[rgba(255,255,255,0.07)] text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]")
                      )}
                      aria-current={isActive && !isAddItem ? "page" : undefined}
                      aria-label={isCollapsed ? item.title : undefined}
                      title={isCollapsed ? item.title : undefined}
                    >
                      {isActive ? (
                        <span
                          className="pointer-events-none absolute inset-0 rounded-[0.72rem] ring-1 ring-inset ring-white/[0.075]"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span
                        className={cn(
                          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center transition-colors duration-200",
                          isActive ? "text-[#F8F4FF]" : "text-[#9B89B8]/76 group-hover:text-[#F8F4FF]"
                        )}
                      >
                        <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={2.1} />
                      </span>
                      <span className={cn("relative z-10 whitespace-nowrap transition", isCollapsed && "hidden")}>
                        {item.title}
                      </span>
                      <SidebarTooltip label={item.title} show={isCollapsed} />
                    </Link>
                    {isAddItem && !isCollapsed ? (
                      <Suspense fallback={<AddBranchLinksStatic />}>
                        <AddBranchLinks pathname={pathname} />
                      </Suspense>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        <div
          className={cn(
            "relative mt-4 h-px bg-[rgba(214,226,255,0.06)]",
            isCollapsed ? "mx-auto w-9" : "mx-1"
          )}
        />

        <div
          className={cn(
            "relative mt-auto border-[rgba(214,226,255,0.08)] transition-all",
            isCollapsed
              ? "flex flex-col items-center gap-2.5 pb-2.5 pt-4"
              : "overflow-hidden rounded-[0.9rem] border bg-[rgba(255,255,255,0.045)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          )}
        >
          <span
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(191,167,255,0.2),transparent)]"
            aria-hidden="true"
          />
          <div
            className={cn(
              "group relative flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-white/[0.08] bg-white/[0.045] text-xs font-bold text-[#C7B8E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
              !isCollapsed && "mb-3"
            )}
            title="Session secured"
            aria-label="Session secured"
          >
            AN
            <SidebarTooltip label="Session secured" show={isCollapsed} />
          </div>
          <p className={cn("text-sm font-semibold text-[#F8F4FF]", isCollapsed && "sr-only")}>
            Session secured
          </p>
          <p className={cn("mt-2 text-xs leading-5 text-[#9B89B8]", isCollapsed && "hidden")}>
            Workspace pribadi untuk membaca cashflow tanpa noise.
          </p>
          <LogoutButton
            className={cn(
              "mt-3 border-[rgba(214,226,255,0.1)] bg-white/[0.055] px-3 text-[#C7B8E8] hover:border-[#BFA7FF]/24 hover:bg-white/[0.085] hover:text-[#F8F4FF] focus-visible:ring-[#BFA7FF]/28",
              isCollapsed && "h-10 w-10 justify-center rounded-[0.75rem] px-0"
            )}
            labelClassName={cn(isCollapsed && "sr-only")}
            variant="secondary"
          />
        </div>
      </div>
    </aside>
  );
}

function AddBranchLinksStatic() {
  return (
    <div className="ml-7 mt-1.5 space-y-1 border-l border-white/[0.07] pl-3">
      <SidebarBranchLink href="/add?type=expense" isActive={false} label="Pengeluaran" />
      <SidebarBranchLink href="/add?type=income" isActive={false} label="Pemasukan" />
    </div>
  );
}

function AddBranchLinks({ pathname }: { pathname: string }) {
  const searchParams = useSearchParams();
  const addType = searchParams.get("type");

  return (
    <div className="ml-7 mt-1.5 space-y-1 border-l border-white/[0.07] pl-3">
      <SidebarBranchLink
        href="/add?type=expense"
        isActive={pathname === "/add" && addType === "expense"}
        label="Pengeluaran"
      />
      <SidebarBranchLink
        href="/add?type=income"
        isActive={pathname === "/add" && addType === "income"}
        label="Pemasukan"
      />
    </div>
  );
}

function SidebarTooltip({ label, show }: { label: string; show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <span
      className="pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[0.62rem] border border-white/[0.08] bg-[rgba(5,6,10,0.96)] px-3 py-2 text-xs font-semibold text-[#F8F4FF] opacity-0 shadow-[0_16px_34px_rgba(0,0,0,0.42)] backdrop-blur transition-all duration-150 before:absolute before:left-[-0.32rem] before:top-1/2 before:h-2.5 before:w-2.5 before:-translate-y-1/2 before:rotate-45 before:border-b before:border-l before:border-white/[0.08] before:bg-[rgba(5,6,10,0.96)] group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100"
      role="tooltip"
    >
      {label}
    </span>
  );
}

function SidebarBranchLink({
  href,
  isActive,
  label
}: {
  href: string;
  isActive: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-8 items-center rounded-[0.58rem] px-3 text-xs font-semibold text-[#9B89B8]/74 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/24 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "hover:-translate-y-px hover:bg-white/[0.04] hover:text-[#F8F4FF]",
        isActive && "bg-white/[0.065] text-[#F8F4FF] ring-1 ring-inset ring-white/[0.07]"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="truncate">{label}</span>
    </Link>
  );
}

function SidebarBrandSlot() {
  return (
    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center text-[0.82rem] font-black tracking-[-0.06em] text-[#F8F4FF]">
      <span className="absolute inset-0 rounded-[0.4rem] bg-[linear-gradient(135deg,rgba(103,232,249,0.12),rgba(179,107,255,0.2),rgba(225,77,170,0.12))] opacity-70" />
      <span className="relative">S</span>
    </span>
  );
}
