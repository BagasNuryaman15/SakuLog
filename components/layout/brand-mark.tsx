import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative h-11 w-11 shrink-0 rounded-2xl border border-white/14 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.9),rgba(133,92,255,0.38)_24%,rgba(18,18,35,0.92)_62%)] shadow-[0_18px_60px_rgba(114,76,255,0.38)]">
        <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[7px] border border-white/50 bg-white/12 shadow-[inset_0_0_18px_rgba(255,255,255,0.22)]" />
        <div className="absolute left-[11px] top-[12px] h-3 w-3 rotate-45 rounded-[4px] bg-cyan-300/90 blur-[1px]" />
        <div className="absolute bottom-[10px] right-[10px] h-3.5 w-3.5 rotate-45 rounded-[5px] bg-fuchsia-400/90 blur-[1px]" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/18" />
      </div>
      {!compact ? (
        <div className="min-w-0">
          <p className="text-[1.08rem] font-semibold leading-none tracking-[-0.03em] text-white">
            SakuLog
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.24em] text-indigo-100/48">
            Money OS
          </p>
        </div>
      ) : null}
    </div>
  );
}
