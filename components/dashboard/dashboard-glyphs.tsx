import { cn } from "@/lib/utils";

export function SakuCalendarGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.5v3M17 4.5v3M5.5 9h13M7.25 5.75h9.5c1.25 0 2 .75 2 2v9.5c0 1.25-.75 2-2 2h-9.5c-1.25 0-2-.75-2-2v-9.5c0-1.25.75-2 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
      <path
        d="M8.5 12.25h1.25M11.35 12.25h1.3M14.25 12.25h1.25M8.5 15.25h1.25M11.35 15.25h1.3M14.25 15.25h1.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.15"
      />
    </svg>
  );
}

export function SignalCoreGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 14.75 12 9l5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
      <path
        d="M7 14.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM17 10.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
    </svg>
  );
}

export function TransactionNodeGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.75 7.75h11.5c1.25 0 2 .75 2 2v6.5c0 1.25-.75 2-2 2H5.75c-1.25 0-2-.75-2-2v-6.5c0-1.25.75-2 2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
      <path
        d="M7.5 7.75V6.5c0-1.05.7-1.75 1.75-1.75h5.5c1.05 0 1.75.7 1.75 1.75v1.25M12 10.75v4.5M9.75 13h4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
      />
    </svg>
  );
}

export function MiniInsightBlackhole() {
  return (
    <div
      className="relative h-12 overflow-hidden rounded-md border border-[#B36BFF]/16 bg-[radial-gradient(circle_at_50%_50%,rgba(103,232,249,0.055),rgba(10,9,16,0.92)_56%,rgba(5,5,10,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_14px_rgba(123,0,212,0.045)]"
      aria-hidden="true"
    >
      <span className="absolute left-3 top-2 h-1 w-1 rounded-full bg-[#D8B4FE]/50 shadow-[0_0_9px_rgba(216,180,254,0.32)]" />
      <span className="absolute right-4 top-3 h-0.5 w-0.5 rounded-full bg-cyan-200/55 shadow-[0_0_8px_rgba(103,232,249,0.32)]" />
      <span className="absolute bottom-2 left-5 h-0.5 w-0.5 rounded-full bg-[#B36BFF]/45 shadow-[0_0_8px_rgba(179,107,255,0.28)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 76 48" fill="none">
        <path
          d="M9 28C20 18 34 16 47 19C58 21 66 25 70 27C60 25 52 26 43 29C31 33 19 34 9 28Z"
          fill="url(#mini-insight-disk)"
          opacity="0.62"
        />
        <path
          d="M8 28C18 33 31 33 43 29C52 26 61 25 70 27"
          stroke="url(#mini-insight-cyan)"
          strokeLinecap="round"
          strokeWidth="1.25"
          opacity="0.46"
        />
        <path
          d="M14 23C26 12 46 12 57 22"
          stroke="url(#mini-insight-violet)"
          strokeLinecap="round"
          strokeWidth="1.4"
          opacity="0.58"
        />
        <path
          d="M20 18C30 9 47 12 55 23"
          stroke="#B36BFF"
          strokeLinecap="round"
          strokeWidth="0.9"
          opacity="0.42"
        />
        <circle cx="38" cy="25" r="10" fill="url(#mini-insight-core)" />
        <circle cx="38" cy="25" r="10.5" stroke="#D8B4FE" strokeOpacity="0.18" />
        <defs>
          <linearGradient id="mini-insight-disk" x1="9" y1="24" x2="70" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67E8F9" stopOpacity="0" />
            <stop offset="0.36" stopColor="#B36BFF" stopOpacity="0.62" />
            <stop offset="0.68" stopColor="#7C3AED" stopOpacity="0.44" />
            <stop offset="1" stopColor="#F472B6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mini-insight-cyan" x1="8" y1="30" x2="70" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67E8F9" stopOpacity="0" />
            <stop offset="0.5" stopColor="#67E8F9" />
            <stop offset="1" stopColor="#B36BFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mini-insight-violet" x1="14" y1="19" x2="57" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B36BFF" stopOpacity="0" />
            <stop offset="0.52" stopColor="#D8B4FE" />
            <stop offset="1" stopColor="#B36BFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="mini-insight-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 25) rotate(90) scale(10)">
            <stop offset="0.46" stopColor="#050408" />
            <stop offset="0.78" stopColor="#0B0618" />
            <stop offset="1" stopColor="#2A104A" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export function CashflowLegendDot({ tone }: { tone: "income" | "expense" }) {
  return (
    <span
      className={cn(
        "h-2 w-2 rounded-full",
        tone === "income"
          ? "bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.42)]"
          : "bg-[#F472B6] shadow-[0_0_12px_rgba(236,72,153,0.42)]"
      )}
    />
  );
}
