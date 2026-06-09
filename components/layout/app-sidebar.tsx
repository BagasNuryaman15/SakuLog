"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose } from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { mainNavigation } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

type SidebarIconProps = SVGProps<SVGSVGElement>;

const icons: Record<NavigationItem["icon"], ComponentType<SidebarIconProps>> = {
  "layout-dashboard": DashboardGlyph,
  list: LedgerGlyph,
  plus: AddRecordGlyph,
  chart: ReportGlyph,
  settings: SettingsGlyph
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
          "relative flex min-h-0 w-full flex-1 flex-col overflow-hidden border border-[rgba(214,226,255,0.065)] bg-[linear-gradient(180deg,rgba(5,6,8,0.975),rgba(2,2,4,0.99))] shadow-[inset_0_1px_0_rgba(255,255,255,0.026),0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-[18px]",
          isCollapsed ? "rounded-[2rem] px-2 py-4" : "rounded-[1.5rem] px-4 py-4"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(146,82,255,0.032),transparent_38%),radial-gradient(circle_at_60%_42%,rgba(34,211,238,0.014),transparent_34%)]" />

        <div className="relative flex h-12 items-center justify-between gap-3 px-1">
          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(214,226,255,0.1)] bg-[rgba(10,11,15,0.72)] text-[#B9A9D8] transition hover:-translate-y-px hover:border-[rgba(214,226,255,0.18)] hover:bg-[rgba(255,255,255,0.045)] hover:text-[#F8F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9]/24"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <WireframeCube />
            </button>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="flex h-11 items-center gap-3 rounded-md border border-[rgba(214,226,255,0.1)] bg-[rgba(10,11,15,0.72)] px-3 text-sm font-semibold text-[#F8F4FF]"
                aria-label="SakuLog dashboard"
              >
                <WireframeCube />
                SakuLog
              </Link>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[rgba(214,226,255,0.1)] bg-[rgba(10,11,15,0.66)] text-[#B9A9D8] transition hover:-translate-y-px hover:border-[rgba(214,226,255,0.18)] hover:bg-[rgba(255,255,255,0.045)] hover:text-[#F8F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9]/24"
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
                      "group relative flex h-12 items-center rounded-md text-sm font-medium text-[#9B89B8]/72 transition-all duration-200 ease-out",
                      isCollapsed ? "h-10 justify-center px-0" : "gap-3 px-3",
                      "hover:bg-[rgba(255,255,255,0.045)] hover:text-[#F8F4FF]",
                      isActive &&
                        (isCollapsed
                          ? "bg-[rgba(255,255,255,0.035)] text-[#F8F4FF]"
                          : "border border-[rgba(214,226,255,0.15)] bg-[linear-gradient(135deg,rgba(16,17,23,0.82),rgba(91,39,204,0.18),rgba(170,60,220,0.08))] text-[#F8F4FF] shadow-[0_0_16px_rgba(106,44,255,0.09)]")
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    {isActive ? (
                      <span
                        className={cn(
                          "absolute rounded-full bg-[#BFA7FF] shadow-[0_0_12px_rgba(176,64,255,0.34)] transition-all duration-200",
                          isCollapsed ? "-left-1 top-1/2 h-6 w-px -translate-y-1/2" : "inset-y-2.5 left-0 w-px"
                        )}
                      />
                    ) : null}
                    <span
                      className={cn(
                        "flex items-center justify-center rounded-md border transition-all duration-200 group-hover:-translate-y-px",
                        isCollapsed ? "h-8 w-8" : "h-8 w-8",
                        isActive
                          ? "border-[rgba(214,226,255,0.14)] bg-[rgba(14,15,20,0.7)] text-[#E6D8FF] shadow-[0_0_12px_rgba(106,44,255,0.08)]"
                          : "border-transparent bg-transparent text-[#9B89B8]/76 group-hover:border-[rgba(214,226,255,0.12)] group-hover:bg-[rgba(14,15,20,0.52)] group-hover:text-[#F8F4FF]"
                      )}
                    >
                      <Icon className="h-[1.125rem] w-[1.125rem]" />
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
            "relative mt-4 h-px bg-[rgba(214,226,255,0.06)]",
            isCollapsed ? "mx-auto w-9" : "mx-1"
          )}
        />

        <div
          className={cn(
            "relative mt-auto border-[rgba(214,226,255,0.08)] transition-all",
            isCollapsed ? "flex flex-col items-center gap-2.5 pb-2.5 pt-4" : "rounded-md border p-3"
          )}
        >
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,226,255,0.12)] bg-[rgba(12,13,18,0.7)] text-xs font-medium text-[#C7B8E8]", !isCollapsed && "mb-3")}>
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
    <span className="relative flex h-5 w-5 items-center justify-center rounded-[0.35rem] border border-[rgba(214,226,255,0.18)] bg-[rgba(10,11,15,0.76)]">
      <span className="h-2.5 w-2.5 rounded-[0.22rem] border border-[#BFA7FF]/58 shadow-[0_0_10px_rgba(146,82,255,0.14)]" />
      <span className="absolute h-px w-3.5 rotate-45 bg-[#67E8F9]/34" />
    </span>
  );
}

function DashboardGlyph(props: SidebarIconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M5.75 5.75h4.5v4.5h-4.5v-4.5ZM13.75 5.75h4.5v4.5h-4.5v-4.5ZM5.75 13.75h4.5v4.5h-4.5v-4.5ZM13.75 13.75h4.5v4.5h-4.5v-4.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.35"
      />
    </svg>
  );
}

function LedgerGlyph(props: SidebarIconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M7 4.75h10c1.1 0 1.75.65 1.75 1.75v13l-2-1.15-2 1.15-2-1.15-2 1.15-2-1.15-2 1.15v-13c0-1.1.65-1.75 1.75-1.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
      <path
        d="M9.25 9h5.5M9.25 12h5.5M9.25 15h3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.25"
      />
    </svg>
  );
}

function AddRecordGlyph(props: SidebarIconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M6.25 8h11.5c1.1 0 1.75.65 1.75 1.75v6.5c0 1.1-.65 1.75-1.75 1.75H6.25c-1.1 0-1.75-.65-1.75-1.75v-6.5C4.5 8.65 5.15 8 6.25 8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
      <path
        d="M8 8V6.75C8 5.7 8.7 5 9.75 5h4.5C15.3 5 16 5.7 16 6.75V8M12 10.75v4.5M9.75 13h4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  );
}

function ReportGlyph(props: SidebarIconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M5 18.25h14M5 18.25V5.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.35"
      />
      <path
        d="M7.75 14.5 11 11.25l2.65 2.25 4.1-5.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.35"
      />
    </svg>
  );
}

function SettingsGlyph(props: SidebarIconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M6 7.25h12M6 16.75h12M8.75 7.25a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0ZM12.75 16.75a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.35"
      />
    </svg>
  );
}
