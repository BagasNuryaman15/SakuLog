import { AlertTriangle, ChevronDown, Loader2, Search } from "lucide-react";
import Link from "next/link";

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
} from "@/shared/design/tokens";

export function WireframeTopBar({
  error,
  isLoading,
  monthLabel
}: {
  error?: string | null;
  isLoading?: boolean;
  monthLabel: string;
}) {
  const hasError = Boolean(error);
  const statusLabel = hasError
    ? "Dashboard gagal memuat data"
    : isLoading
      ? "Membaca data dashboard"
      : "Insight dashboard aktif";
  const statusTitle = hasError
    ? error
    : isLoading
      ? "SakuLog sedang mengambil data dashboard terbaru"
      : "Insight dashboard aktif";

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
            disabled
            className={cn(
              navLabel,
              topbarControlClass,
              "group flex h-10 min-w-0 flex-1 cursor-not-allowed items-center gap-2 rounded-md px-3 text-left text-[#9B89B8]/70 opacity-75 lg:w-72 lg:flex-none"
            )}
            aria-label="Search belum tersedia"
            title="Search dashboard belum tersedia"
          >
            <Search className="h-4 w-4 shrink-0 text-[#67E8F9]/42" />
            <span className="truncate">Search coming soon</span>
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
            disabled
            className={cn(
              navLabel,
              topbarControlClass,
              "group flex h-10 w-full shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-md px-3 text-[#C7B8E8]/78 opacity-80 lg:w-40"
            )}
            aria-label={`Periode dashboard aktif ${monthLabel}. Pemilih periode belum tersedia.`}
            title="Pemilih periode belum tersedia"
          >
            <SakuCalendarGlyph className="h-4 w-4 shrink-0 text-[#BFA7FF]/82" />
            <span className="truncate">{monthLabel}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#9B89B8]/52" />
          </button>
          <div
            className={cn(
              topbarIconButtonClass,
              "relative flex h-10 w-11 shrink-0 cursor-default items-center justify-center rounded-md border",
              hasError &&
                "border-rose-300/24 bg-[linear-gradient(180deg,rgba(127,29,70,0.2),rgba(5,5,8,0.86))] text-rose-100"
            )}
            aria-label={statusLabel}
            role={hasError ? "alert" : "status"}
            title={statusTitle ?? statusLabel}
          >
            <span
              className={cn(
                "absolute right-2 top-2 h-1.5 w-1.5 rounded-full",
                hasError
                  ? "bg-rose-300 shadow-[0_0_10px_rgba(253,164,175,0.55)]"
                  : "bg-[#67E8F9] shadow-[0_0_10px_rgba(103,232,249,0.55)]",
                isLoading && !hasError && "animate-pulse"
              )}
            />
            {hasError ? (
              <AlertTriangle className="h-[1.125rem] w-[1.125rem] text-rose-200" />
            ) : isLoading ? (
              <Loader2 className="h-[1.125rem] w-[1.125rem] animate-spin text-[#67E8F9]/82" />
            ) : (
              <SignalCoreGlyph className="h-[1.125rem] w-[1.125rem] text-[#D8B4FE]/78" />
            )}
          </div>
          <Link
            href="/add"
            className={cn(
              navLabel,
              topbarCtaClass,
              "group flex h-10 w-full shrink-0 items-center justify-center rounded-md border px-4 lg:w-44"
            )}
            aria-label="Tambah transaksi"
          >
            <span className="flex items-center justify-center gap-2">
              <TransactionNodeGlyph className="h-4 w-4 text-[#F8F4FF]/90 transition group-hover:text-white" />
              Tambah Transaksi
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
