export type AccentTone = "cyan" | "violet" | "magenta";
export type BlockTone = "default" | "primary" | "cta" | AccentTone;
export type LineTone = "default" | "primary" | "muted" | AccentTone;

export const shellClass =
  "w-full min-w-0 rounded-[1.5rem] border border-[rgba(125,163,255,0.18)] bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(135deg,rgba(5,13,28,0.82),rgba(6,17,31,0.68)_48%,rgba(9,11,31,0.72))] bg-[size:64px_64px,64px_64px,auto] p-0 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_22px_56px_rgba(0,0,0,0.18)]";
export const cardClass =
  "min-w-0 rounded-[1.5rem] border border-[rgba(125,163,255,0.24)] bg-[linear-gradient(145deg,rgba(16,27,50,0.88),rgba(7,16,32,0.78))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_48px_rgba(0,0,0,0.23),0_0_32px_rgba(34,211,238,0.055)] backdrop-blur-[18px]";
export const topbarClass =
  "border-[rgba(125,163,255,0.24)] bg-[linear-gradient(135deg,rgba(10,21,40,0.9),rgba(8,13,30,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_32px_rgba(0,0,0,0.2),0_0_30px_rgba(34,211,238,0.05)]";
export const heroSurfaceClass =
  "border-[rgba(167,139,250,0.34)] bg-[radial-gradient(circle_at_76%_18%,rgba(34,211,238,0.13),transparent_26%),radial-gradient(circle_at_68%_32%,rgba(99,102,241,0.23),transparent_34%),radial-gradient(circle_at_16%_10%,rgba(124,58,237,0.2),transparent_30%),linear-gradient(145deg,rgba(24,25,63,0.78),rgba(7,18,36,0.9)_62%,rgba(5,13,28,0.86))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(34,211,238,0.04),0_26px_64px_rgba(0,0,0,0.3),0_0_44px_rgba(139,92,246,0.12),0_0_30px_rgba(34,211,238,0.055)]";
export const nestedSurfaceClass =
  "border-[rgba(103,232,249,0.24)] bg-[linear-gradient(135deg,rgba(16,29,55,0.74),rgba(8,18,36,0.64))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_34px_rgba(0,0,0,0.2),0_0_22px_rgba(34,211,238,0.055)]";
export const rightRailSurfaceClass =
  "border-[rgba(125,163,255,0.28)] bg-[linear-gradient(145deg,rgba(15,28,52,0.86),rgba(7,16,32,0.8))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_16px_42px_rgba(0,0,0,0.24),0_0_26px_rgba(139,92,246,0.045)]";
export const cashflowSurfaceClass =
  "border-[rgba(125,163,255,0.27)] bg-[linear-gradient(145deg,rgba(15,28,52,0.86),rgba(6,15,30,0.8))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_18px_48px_rgba(0,0,0,0.24),0_0_34px_rgba(34,211,238,0.055)]";
export const lineClass =
  "h-2 rounded-sm bg-[linear-gradient(90deg,rgba(203,213,225,0.46),rgba(148,163,184,0.3))] shadow-[0_0_18px_rgba(34,211,238,0.045)]";

export const dashboardPageTitle = "text-xl font-semibold leading-tight tracking-normal text-slate-100";
export const dashboardPageSubtitle = "text-sm font-medium leading-5 tracking-normal text-slate-400/82";
export const cardEyebrow =
  "text-[0.625rem] font-semibold uppercase leading-none tracking-[0.08em] text-slate-400/72";
export const cardTitle = "text-sm font-semibold leading-5 tracking-normal text-slate-100/94";
export const cardSubtitle = "text-xs font-medium leading-5 tracking-normal text-slate-400/78";
export const metricValuePlaceholder = "text-2xl font-semibold leading-none tracking-normal text-slate-100/96";
export const metricLabel = "text-xs font-medium leading-4 tracking-normal text-slate-400/82";
export const captionText = "text-[0.6875rem] font-medium leading-4 tracking-normal text-slate-500/82";
export const sectionLabel =
  "text-[0.625rem] font-semibold uppercase leading-none tracking-[0.08em] text-slate-400/64";
export const rightRailTitle =
  "text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.07em] text-slate-300/86";
export const chartLabel = "text-[0.625rem] font-medium leading-none tracking-normal text-slate-500/72";

export const blockToneClass: Record<BlockTone, string> = {
  default: "border-[rgba(148,163,184,0.24)] bg-[rgba(22,36,62,0.56)]",
  primary: "border-[rgba(203,213,225,0.28)] bg-[rgba(24,39,68,0.66)]",
  cta: "border-white/15 bg-[linear-gradient(135deg,#6366f1_0%,#8b5cf6_48%,#d946ef_100%)] shadow-[0_14px_32px_rgba(139,92,246,0.22),inset_0_1px_0_rgba(255,255,255,0.14)]",
  cyan: "border-[rgba(34,211,238,0.44)] bg-[rgba(34,211,238,0.13)] shadow-[0_0_18px_rgba(34,211,238,0.14)]",
  violet: "border-[rgba(139,92,246,0.42)] bg-[rgba(139,92,246,0.14)] shadow-[0_0_18px_rgba(139,92,246,0.13)]",
  magenta: "border-[rgba(217,70,239,0.4)] bg-[rgba(217,70,239,0.13)] shadow-[0_0_18px_rgba(217,70,239,0.13)]"
};

export const lineToneClass: Record<LineTone, string> = {
  default: "bg-[linear-gradient(90deg,rgba(203,213,225,0.46),rgba(148,163,184,0.3))]",
  primary: "bg-[linear-gradient(90deg,rgba(226,232,240,0.58),rgba(148,163,184,0.36))]",
  muted: "bg-[linear-gradient(90deg,rgba(103,126,165,0.28),rgba(71,94,134,0.2))]",
  cyan: "bg-[linear-gradient(90deg,rgba(34,211,238,0.68),rgba(34,211,238,0.28))] shadow-[0_0_18px_rgba(34,211,238,0.18)]",
  violet: "bg-[linear-gradient(90deg,rgba(139,92,246,0.66),rgba(139,92,246,0.28))] shadow-[0_0_18px_rgba(139,92,246,0.16)]",
  magenta: "bg-[linear-gradient(90deg,rgba(217,70,239,0.64),rgba(217,70,239,0.26))] shadow-[0_0_18px_rgba(217,70,239,0.16)]"
};

export const kpiSurfaceToneClass: Record<AccentTone, string> = {
  cyan: "border-[rgba(34,211,238,0.24)] bg-[radial-gradient(circle_at_84%_10%,rgba(34,211,238,0.095),transparent_34%),linear-gradient(145deg,rgba(16,30,54,0.88),rgba(7,16,32,0.8))]",
  violet: "border-[rgba(139,92,246,0.25)] bg-[radial-gradient(circle_at_84%_10%,rgba(139,92,246,0.105),transparent_34%),linear-gradient(145deg,rgba(17,28,54,0.88),rgba(8,16,34,0.8))]",
  magenta: "border-[rgba(217,70,239,0.23)] bg-[radial-gradient(circle_at_84%_10%,rgba(217,70,239,0.095),transparent_34%),linear-gradient(145deg,rgba(18,28,52,0.88),rgba(8,16,34,0.8))]"
};
