import Image from "next/image";

import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { WireframeBlock, WireframeCard } from "./dashboard-primitives";
import { getCashflowStatus } from "./dashboard-helpers";
import {
  brandTitle,
  captionText,
  cardClass,
  heroBody,
  heroHeadline,
  heroSurfaceClass,
  metricLabel,
  metricValuePlaceholder,
  nestedSurfaceClass
} from "./dashboard-style-tokens";

export function WireframeHero({ summary }: { summary: DashboardSummary }) {
  const cashflowStatus = getCashflowStatus(summary.monthBalance);

  return (
    <WireframeCard className={cn(heroSurfaceClass, "relative h-[26rem] overflow-hidden p-5 xl:[grid-area:hero]")}>
      <div className="pointer-events-none absolute -right-20 -top-12 h-[24rem] w-[26.75rem] opacity-90 [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.28)_10%,black_24%,black_100%)]">
        <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(146,82,255,0.13),rgba(34,211,238,0.055)_39%,transparent_70%)] blur-3xl" />
        <div className="absolute left-20 top-[13.4rem] h-px w-72 rotate-[-11deg] bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.18),rgba(179,107,255,0.14),transparent)] blur-[1px]" />
        <div className="absolute left-24 top-[15.4rem] h-px w-64 rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(179,107,255,0.16),rgba(34,211,238,0.12),transparent)] blur-[1px]" />
        <span className="absolute right-[5.5rem] top-[5.75rem] h-1.5 w-1.5 rounded-full bg-[#E0B3FF]/80 shadow-[0_0_18px_rgba(224,179,255,0.8)]" />
        <span className="absolute right-[8.5rem] top-[18.5rem] h-1 w-1 rounded-full bg-[#67E8F9]/70 shadow-[0_0_16px_rgba(103,232,249,0.7)]" />
        <span className="absolute right-[19rem] top-[15.5rem] h-1 w-1 rounded-full bg-[#B36BFF]/65 shadow-[0_0_14px_rgba(179,107,255,0.65)]" />
        <Image
          src="/assets/illustrations/sakulog-hero-core.png"
          alt=""
          fill
          sizes="24rem"
          className="object-contain opacity-92 mix-blend-screen drop-shadow-[0_0_22px_rgba(154,53,255,0.22)]"
          priority
        />
      </div>
      <div className="pointer-events-none absolute right-8 top-40 h-px w-56 rotate-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.34),rgba(176,64,255,0.24),transparent)] blur-[1px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,5,0.96)_0%,rgba(3,3,5,0.82)_43%,rgba(3,3,5,0.24)_72%,rgba(3,3,5,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(5,4,8,0.86))]" />

      <div className="relative z-10 flex h-full min-w-0 flex-col">
        <p className={cn(brandTitle, "truncate")}>SakuLog Console</p>
        <div className="mt-6 flex min-h-0 flex-1 min-w-0 flex-col">
          <h2 className={cn(heroHeadline, "mt-7 max-w-md")}>Know where your money moves.</h2>
          <p className={cn(heroBody, "mt-5 max-w-md pr-16")}>
            Pantau saldo bulan ini, baca arah cashflow, dan lihat uangmu bergerak tanpa noise.
          </p>

          <div className={cn(cardClass, nestedSurfaceClass, "mt-auto p-5")}>
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    metricLabel,
                    "truncate text-xs font-bold text-[#67E8F9] drop-shadow-[0_0_16px_rgba(34,211,238,0.38)]"
                  )}
                >
                  Sisa uang bulan ini
                </p>
                <p className={cn(metricValuePlaceholder, "mt-4 max-w-full truncate whitespace-nowrap")}>
                  {formatCurrencyIDR(summary.monthBalance)}
                </p>
                <p
                  className={cn(
                    captionText,
                    "mt-4 truncate text-xs font-bold",
                    cashflowStatus.className
                  )}
                >
                  {cashflowStatus.label}
                </p>
              </div>
              <WireframeBlock className="h-12 w-12 shrink-0" tone="primary" />
            </div>
          </div>
        </div>
      </div>
    </WireframeCard>
  );
}
