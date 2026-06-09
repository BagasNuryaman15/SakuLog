import { ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SakuCalendarGlyph,
  SignalCoreGlyph,
  TransactionNodeGlyph
} from "./dashboard-glyphs";
import {
  cardClass,
  dashboardPageSubtitle,
  dashboardPageTitle,
  navLabel,
  topbarClass,
  topbarCommandKeyClass,
  topbarControlClass,
  topbarCtaClass,
  topbarIconButtonClass
} from "./dashboard-style-tokens";

export function WireframeTopBar({ monthLabel }: { monthLabel: string }) {
  return (
    <header className={cn(cardClass, topbarClass, "flex min-h-[4.75rem] flex-col justify-center px-5 py-3")}>
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[0.62rem] font-bold uppercase leading-none tracking-[0.18em] text-[#67E8F9]/62">
            Finance command center
          </p>
          <h1 className={cn(dashboardPageTitle, "truncate")}>Dashboard</h1>
          <p className={cn(dashboardPageSubtitle, "mt-1 truncate text-[#B9A9D8]/84")}>
            Ringkasan keuanganmu secara real-time
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
          <button
            type="button"
            className={cn(
              navLabel,
              topbarControlClass,
              "group flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md px-3 text-left text-[#9B89B8] hover:text-[#C7B8E8] lg:w-72 lg:flex-none"
            )}
            aria-label="Cari transaksi, kategori, atau insight"
          >
            <Search className="h-4 w-4 shrink-0 text-[#67E8F9]/68 transition group-hover:text-[#67E8F9]/88" />
            <span className="truncate">Cari transaksi, kategori, atau insight...</span>
            <span
              className={cn(
                topbarCommandKeyClass,
                "ml-auto hidden shrink-0 rounded-sm border px-1.5 py-1 text-[0.56rem] font-bold uppercase tracking-[0.12em] xl:inline"
              )}
            >
              Cmd K
            </span>
          </button>
          <button
            type="button"
            className={cn(
              navLabel,
              topbarControlClass,
              "group flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md px-3 text-[#C7B8E8] lg:w-40"
            )}
            aria-label={`Periode aktif ${monthLabel}`}
          >
            <SakuCalendarGlyph className="h-4 w-4 shrink-0 text-[#BFA7FF]/82" />
            <span className="truncate">{monthLabel}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#9B89B8]/72 transition group-hover:text-[#D8B4FE]" />
          </button>
          <button
            type="button"
            className={cn(
              topbarIconButtonClass,
              "group relative flex h-10 w-11 shrink-0 items-center justify-center rounded-md border"
            )}
            aria-label="Status insight dashboard"
          >
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#67E8F9] shadow-[0_0_10px_rgba(103,232,249,0.55)]" />
            <SignalCoreGlyph className="h-[1.125rem] w-[1.125rem] text-[#D8B4FE]/78 transition group-hover:text-[#F8F4FF]" />
          </button>
          <button
            type="button"
            className={cn(
              navLabel,
              topbarCtaClass,
              "group h-10 w-full shrink-0 rounded-md border px-4 lg:w-44"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              <TransactionNodeGlyph className="h-4 w-4 text-[#F8F4FF]/90 transition group-hover:text-white" />
              Tambah Transaksi
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
