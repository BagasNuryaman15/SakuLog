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
  ShieldCheck,
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
      items: [
        ...mainNavigation.filter((item) => item.title === "Add"),
        ...mainNavigation.filter((item) => item.title === "Transactions")
      ]
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
          "relative flex min-h-0 w-full flex-1 flex-col overflow-visible border border-[rgba(214,226,255,0.082)] bg-[linear-gradient(180deg,rgba(6,7,12,0.99),rgba(2,2,5,0.992)_58%,rgba(5,3,10,0.99))] shadow-[inset_0_1px_0_rgba(255,255,255,0.038),0_26px_62px_rgba(0,0,0,0.6),0_0_22px_rgba(123,0,212,0.035)] backdrop-blur-[18px]",
          isCollapsed ? "rounded-[1.45rem] px-2.5 py-5" : "rounded-[1.35rem] px-4 py-4"
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(146,82,255,0.045),transparent_34%),radial-gradient(circle_at_18%_18%,rgba(103,232,249,0.014),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.012),transparent_18%,rgba(123,0,212,0.018)_100%)]" />

        <div
          className={cn(
            "relative flex items-center justify-between gap-3",
            isCollapsed ? "h-11 px-0" : "h-12 px-1"
          )}
        >
          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="group group/brand mx-auto flex h-11 w-11 items-center justify-center rounded-[1rem] border border-transparent text-[#C7B8E8] transition hover:-translate-y-px hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-[#F8F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                className="group group/brand flex h-12 min-w-0 items-center gap-3 rounded-[0.95rem] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(15,16,24,0.86),rgba(7,8,13,0.76))] px-2.5 text-sm font-semibold text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_10px_24px_rgba(0,0,0,0.24)] transition hover:-translate-y-px hover:border-[#BFA7FF]/24 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="SakuLog dashboard"
              >
                <SidebarBrandSlot />
                <span className="min-w-0">
                  <span className="block truncate leading-none tracking-[-0.015em]">SakuLog</span>
                  <span className="mt-1.5 block truncate text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#67E8F9]/46">
                    Money OS
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.78rem] border border-white/[0.08] bg-[rgba(10,11,15,0.64)] text-[#B9A9D8] transition hover:-translate-y-px hover:border-[#BFA7FF]/22 hover:bg-white/[0.045] hover:text-[#F8F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div className={cn("relative h-px bg-[rgba(214,226,255,0.06)]", isCollapsed ? "mx-auto mt-5 w-9" : "mx-1 mt-4")} />

        <nav className={cn("relative", isCollapsed ? "mt-5 space-y-4" : "mt-4 space-y-3")} aria-label="Dashboard navigation">
          {navigationSections.map((section) => (
            <div key={section.title} className={cn(isCollapsed ? "space-y-2.5" : "space-y-1")}>
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
                const tooltipLabel = isAddItem ? "Add transaction" : item.title;

                return (
                  <div key={item.href} className={cn("relative", isAddItem && "group/add")}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group group/navitem relative flex h-10 items-center text-sm font-semibold text-[#9B89B8]/68 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                        isCollapsed
                          ? "justify-center rounded-[0.7rem] px-0"
                          : "gap-3 rounded-[0.78rem] px-2.5 hover:-translate-y-px hover:bg-[rgba(255,255,255,0.032)] hover:text-[#F8F4FF]",
                        isAddItem && !isActive && "text-[#D8B4FE]/76",
                        isActive && "text-[#F8F4FF]"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={isCollapsed ? tooltipLabel : undefined}
                    >
                      <span
                        className={cn(
                          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center transition-all duration-200 before:absolute before:inset-0 before:rounded-[0.72rem] before:border before:border-transparent before:bg-transparent before:opacity-0 before:transition-all before:duration-200",
                          "group-hover/navitem:-translate-y-px group-hover/navitem:before:border-white/[0.07] group-hover/navitem:before:bg-white/[0.035] group-hover/navitem:before:opacity-100 group-focus-visible/navitem:before:border-white/[0.08] group-focus-visible/navitem:before:bg-white/[0.04] group-focus-visible/navitem:before:opacity-100",
                          isCollapsed && "group-hover/navitem:scale-[1.035]",
                          isActive
                            ? "text-[#F8F4FF] before:border-white/[0.08] before:bg-white/[0.045] before:opacity-100 before:shadow-[0_0_18px_rgba(191,167,255,0.055),inset_0_1px_0_rgba(255,255,255,0.035)]"
                            : isAddItem
                              ? "text-[#D8B4FE]/78 group-hover/navitem:text-[#F8F4FF]"
                              : "text-[#9B89B8]/62 group-hover/navitem:text-[#F8F4FF]"
                        )}
                      >
                        <Icon className="relative z-10 h-[1.08rem] w-[1.08rem]" strokeWidth={2.15} />
                      </span>
                      <span className={cn("relative z-10 whitespace-nowrap transition", isCollapsed && "hidden")}>
                        {item.title}
                      </span>
                      <SidebarTooltip label={tooltipLabel} show={isCollapsed && !isAddItem} />
                    </Link>
                    {isAddItem ? (
                      <Suspense fallback={<AddBranchMenuStatic isCollapsed={isCollapsed} />}>
                        <AddBranchMenu isCollapsed={isCollapsed} pathname={pathname} />
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
              : "overflow-hidden rounded-[0.95rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.046),rgba(123,0,212,0.026))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.034)]"
          )}
        >
          <span
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(191,167,255,0.2),transparent)]"
            aria-hidden="true"
          />
          <div
            className={cn(
              "group relative flex h-10 w-10 items-center justify-center rounded-[0.78rem] border border-white/[0.08] bg-[rgba(255,255,255,0.044)] text-xs font-bold text-[#C7B8E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
              !isCollapsed && "mb-3"
            )}
            title="Private session"
            aria-label="Private session"
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
            <SidebarTooltip label="Private session" show={isCollapsed} />
          </div>
          <p className={cn("text-sm font-semibold text-[#F8F4FF]", isCollapsed && "sr-only")}>
            Private session
          </p>
          <p className={cn("mt-2 text-xs leading-5 text-[#9B89B8]", isCollapsed && "hidden")}>
            Sesi Supabase aktif untuk workspace pribadi.
          </p>
          <LogoutButton
            className={cn(
              "mt-3 border-[rgba(214,226,255,0.1)] bg-white/[0.052] px-3 text-[#C7B8E8] hover:border-[#BFA7FF]/24 hover:bg-white/[0.078] hover:text-[#F8F4FF] focus-visible:ring-[#BFA7FF]/28",
              isCollapsed && "h-10 w-10 justify-center rounded-[0.78rem] px-0"
            )}
            labelClassName={cn(isCollapsed && "sr-only")}
            variant="secondary"
          />
        </div>
      </div>
    </aside>
  );
}

function AddBranchMenuStatic({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className={addBranchMenuClass(isCollapsed)}>
      <div className={addBranchPanelClass(isCollapsed)}>
        <SidebarBranchLink href="/add?type=expense" isActive={false} isCollapsed={isCollapsed} label="Pengeluaran" />
        <SidebarBranchLink href="/add?type=income" isActive={false} isCollapsed={isCollapsed} label="Pemasukan" />
      </div>
    </div>
  );
}

function AddBranchMenu({
  isCollapsed,
  pathname
}: {
  isCollapsed: boolean;
  pathname: string;
}) {
  const searchParams = useSearchParams();
  const addType = searchParams.get("type");

  return (
    <div className={addBranchMenuClass(isCollapsed)}>
      <div className={addBranchPanelClass(isCollapsed)}>
        <SidebarBranchLink
          href="/add?type=expense"
          isActive={pathname === "/add" && addType === "expense"}
          isCollapsed={isCollapsed}
          label="Pengeluaran"
        />
        <SidebarBranchLink
          href="/add?type=income"
          isActive={pathname === "/add" && addType === "income"}
          isCollapsed={isCollapsed}
          label="Pemasukan"
        />
      </div>
    </div>
  );
}

function addBranchMenuClass(isCollapsed: boolean) {
  return cn(
    "pointer-events-none opacity-0 transition-all duration-150 group-hover/add:pointer-events-auto group-hover/add:opacity-100 group-focus-within/add:pointer-events-auto group-focus-within/add:opacity-100",
    isCollapsed
      ? "relative ml-2 max-h-0 w-[8rem] overflow-hidden pb-0 pl-[1.65rem] pt-1 before:absolute before:left-3 before:top-0 before:h-full before:border-l before:border-white/[0.08] after:absolute after:left-0 after:top-0 after:h-full after:w-[2.75rem] group-hover/add:max-h-[4.9rem] group-focus-within/add:max-h-[4.9rem]"
      : "relative ml-7 mt-1.5 max-h-0 overflow-hidden border-l border-white/[0.075] pl-3 group-hover/add:max-h-20 group-focus-within/add:max-h-20"
  );
}

function addBranchPanelClass(isCollapsed: boolean) {
  return cn(
    "space-y-1",
    isCollapsed &&
      "rounded-[0.68rem] border border-white/[0.085] bg-[rgba(5,6,10,0.94)] p-1 shadow-[0_14px_28px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur"
  );
}

function SidebarTooltip({ label, show }: { label: string; show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <span
      className="pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[0.62rem] border border-white/[0.09] bg-[rgba(5,6,10,0.97)] px-3 py-2 text-xs font-semibold text-[#F8F4FF] opacity-0 shadow-[0_16px_34px_rgba(0,0,0,0.42),0_0_14px_rgba(123,0,212,0.045)] backdrop-blur transition-all duration-150 before:absolute before:left-[-0.32rem] before:top-1/2 before:h-2.5 before:w-2.5 before:-translate-y-1/2 before:rotate-45 before:border-b before:border-l before:border-white/[0.09] before:bg-[rgba(5,6,10,0.97)] group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100"
      role="tooltip"
    >
      {label}
    </span>
  );
}

function SidebarBranchLink({
  href,
  isCollapsed,
  isActive,
  label
}: {
  href: string;
  isCollapsed: boolean;
  isActive: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group group/branch relative flex h-7 items-center rounded-[0.52rem] text-[0.68rem] font-semibold text-[#9B89B8]/78 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/24 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        isCollapsed ? "px-2.5" : "px-2.5",
        "before:absolute before:top-1/2 before:h-px before:bg-white/[0.075]",
        isCollapsed ? "before:left-[-1.35rem] before:w-6" : "before:left-[-0.78rem] before:w-2.5",
        "hover:bg-white/[0.04] hover:text-[#F8F4FF]",
        isActive && "bg-white/[0.045] text-[#F8F4FF]"
      )}
      aria-current={isActive ? "page" : undefined}
      aria-label={label}
      onClick={(event) => {
        if (isCollapsed && event.detail > 0) {
          event.currentTarget.blur();
        }
      }}
    >
      <span className="truncate">{label}</span>
    </Link>
  );
}

function SidebarBrandSlot() {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[0.82rem] border border-white/[0.105] bg-[linear-gradient(145deg,rgba(11,12,18,0.98),rgba(4,5,9,0.96))] text-[0.82rem] font-black tracking-[-0.04em] text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.075),0_10px_24px_rgba(0,0,0,0.24),0_0_16px_rgba(176,64,255,0.07)]">
      <span
        className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(103,232,249,0.18),transparent_28%),linear-gradient(135deg,rgba(103,232,249,0.045),rgba(179,107,255,0.16),rgba(225,77,170,0.06))] opacity-80 transition-opacity group-hover/brand:opacity-100"
        aria-hidden="true"
      />
      <span className="absolute inset-[4px] rounded-[0.55rem] border border-white/[0.055]" aria-hidden="true" />
      <span className="relative translate-y-px">S</span>
    </span>
  );
}
