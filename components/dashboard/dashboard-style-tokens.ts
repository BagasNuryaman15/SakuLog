export type AccentTone = "cyan" | "violet" | "magenta" | "blueViolet";
export type BlockTone = "default" | "primary" | "cta" | AccentTone;
export type LineTone = "default" | "primary" | "muted" | AccentTone;

export const shellClass =
  "w-full min-w-0 rounded-[1.5rem] border border-[rgba(179,107,255,0.22)] bg-[linear-gradient(rgba(224,179,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(224,179,255,0.035)_1px,transparent_1px),radial-gradient(circle_at_82%_10%,rgba(176,64,255,0.14),transparent_30%),radial-gradient(circle_at_10%_10%,rgba(106,44,255,0.16),transparent_32%),linear-gradient(135deg,rgba(16,7,37,0.96),rgba(18,11,34,0.88)_48%,rgba(10,10,10,0.92))] bg-[size:64px_64px,64px_64px,auto,auto,auto] p-0 text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_rgba(0,0,0,0.34),0_0_38px_rgba(176,64,255,0.08)]";
export const cardClass =
  "min-w-0 rounded-[1.5rem] border border-[rgba(179,107,255,0.28)] bg-[linear-gradient(145deg,rgba(44,31,64,0.88),rgba(26,16,48,0.82)_52%,rgba(14,9,21,0.88))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_56px_rgba(0,0,0,0.34),0_0_34px_rgba(176,64,255,0.08)] backdrop-blur-[18px]";
export const topbarClass =
  "border-[rgba(179,107,255,0.3)] bg-[linear-gradient(135deg,rgba(29,21,41,0.94),rgba(16,7,37,0.88))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_14px_38px_rgba(0,0,0,0.3),0_0_34px_rgba(176,64,255,0.08)]";
export const heroSurfaceClass =
  "border-[rgba(179,107,255,0.34)] bg-[radial-gradient(circle_at_78%_14%,rgba(176,64,255,0.24),transparent_28%),radial-gradient(circle_at_62%_34%,rgba(106,44,255,0.22),transparent_34%),radial-gradient(circle_at_16%_10%,rgba(34,211,238,0.09),transparent_30%),linear-gradient(145deg,rgba(29,21,41,0.94),rgba(22,13,42,0.96)_62%,rgba(10,10,10,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(224,179,255,0.055),0_30px_72px_rgba(0,0,0,0.38),0_0_58px_rgba(176,64,255,0.16),0_0_28px_rgba(34,211,238,0.04)]";
export const nestedSurfaceClass =
  "border-[rgba(179,107,255,0.26)] bg-[linear-gradient(135deg,rgba(34,22,51,0.82),rgba(18,11,34,0.74))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_15px_36px_rgba(0,0,0,0.3),0_0_26px_rgba(176,64,255,0.08)]";
export const rightRailSurfaceClass =
  "border-[rgba(179,107,255,0.26)] bg-[linear-gradient(145deg,rgba(34,22,51,0.88),rgba(18,11,34,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_17px_44px_rgba(0,0,0,0.32),0_0_26px_rgba(176,64,255,0.065)]";
export const cashflowSurfaceClass =
  "border-[rgba(179,107,255,0.26)] bg-[linear-gradient(145deg,rgba(34,22,51,0.88),rgba(16,10,30,0.84))] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_20px_52px_rgba(0,0,0,0.32),0_0_34px_rgba(176,64,255,0.07)]";
export const lineClass =
  "h-2 rounded-sm bg-[linear-gradient(90deg,rgba(248,244,255,0.5),rgba(199,184,232,0.32))] shadow-[0_0_18px_rgba(176,64,255,0.06)]";

export const brandTitle = "text-xl font-extrabold leading-none tracking-[-0.03em] text-[#F8F4FF]";
export const heroHeadline = "text-2xl font-extrabold leading-[1.05] tracking-[-0.035em] text-[#F8F4FF] sm:text-3xl";
export const heroBody = "text-sm font-medium leading-6 tracking-[-0.005em] text-[#C7B8E8]/90";
export const metricValue = "font-bold leading-none tracking-[-0.02em] text-[#F8F4FF]/96 tabular-nums";
export const metricValueLarge = "text-2xl font-extrabold leading-none tracking-[-0.025em] text-[#F8F4FF] tabular-nums";
export const moneyValue = "whitespace-nowrap font-bold leading-none tracking-[-0.02em] text-[#F8F4FF]/96 tabular-nums";
export const moneyValueSmall =
  "whitespace-nowrap text-sm font-semibold leading-none tracking-[-0.01em] text-[#C7B8E8]/90 tabular-nums";
export const labelText = "text-xs font-semibold leading-4 tracking-[-0.005em] text-[#C7B8E8]/88";
export const captionText = "text-[0.6875rem] font-medium leading-4 tracking-normal text-[#9B89B8]/88";
export const eyebrowText =
  "text-[0.625rem] font-bold uppercase leading-none tracking-[0.1em] text-[#D8B4FE]/72";
export const navLabel = "text-xs font-semibold leading-none tracking-[-0.005em] text-[#C7B8E8]/90";

export const dashboardPageTitle = "text-xl font-bold leading-tight tracking-[-0.025em] text-[#F8F4FF]";
export const dashboardPageSubtitle = "text-sm font-medium leading-5 tracking-[-0.005em] text-[#C7B8E8]/84";
export const cardEyebrow = eyebrowText;
export const cardTitle = "text-sm font-bold leading-5 tracking-[-0.01em] text-[#F8F4FF]/94";
export const cardSubtitle = "text-xs font-medium leading-5 tracking-[-0.005em] text-[#C7B8E8]/78";
export const metricValuePlaceholder = metricValueLarge;
export const metricLabel = labelText;
export const sectionLabel = "text-[0.625rem] font-bold uppercase leading-none tracking-[0.1em] text-[#D8B4FE]/64";
export const rightRailTitle =
  "text-sm font-bold uppercase leading-5 tracking-[0.075em] text-[#F8F4FF]/94";
export const chartLabel = "text-[0.625rem] font-semibold leading-none tracking-[-0.005em] text-[#9B89B8]/78 tabular-nums";

export const blockToneClass: Record<BlockTone, string> = {
  default: "border-[rgba(91,67,129,0.45)] bg-[rgba(44,31,64,0.5)]",
  primary: "border-[rgba(179,107,255,0.28)] bg-[rgba(44,31,64,0.64)]",
  cta: "border-[rgba(224,179,255,0.22)] bg-[linear-gradient(135deg,#6A2CFF_0%,#B040FF_54%,#D946EF_100%)] shadow-[0_14px_34px_rgba(106,44,255,0.28),0_0_22px_rgba(176,64,255,0.18),inset_0_1px_0_rgba(255,255,255,0.16)]",
  cyan: "border-[rgba(103,232,249,0.5)] bg-[rgba(34,211,238,0.14)] shadow-[0_0_18px_rgba(34,211,238,0.16)]",
  violet: "border-[rgba(179,107,255,0.48)] bg-[rgba(123,0,212,0.18)] shadow-[0_0_20px_rgba(176,64,255,0.18)]",
  magenta: "border-[rgba(244,114,182,0.46)] bg-[rgba(186,49,159,0.18)] shadow-[0_0_20px_rgba(236,72,153,0.16)]",
  blueViolet: "border-[rgba(129,140,248,0.46)] bg-[rgba(88,80,236,0.16)] shadow-[0_0_18px_rgba(129,140,248,0.14)]"
};

export const lineToneClass: Record<LineTone, string> = {
  default: "bg-[linear-gradient(90deg,rgba(199,184,232,0.42),rgba(155,137,184,0.28))]",
  primary: "bg-[linear-gradient(90deg,rgba(248,244,255,0.6),rgba(199,184,232,0.38))]",
  muted: "bg-[linear-gradient(90deg,rgba(155,137,184,0.28),rgba(111,95,134,0.2))]",
  cyan: "bg-[linear-gradient(90deg,rgba(103,232,249,0.78),rgba(34,211,238,0.3))] shadow-[0_0_18px_rgba(34,211,238,0.18)]",
  violet: "bg-[linear-gradient(90deg,rgba(176,64,255,0.78),rgba(106,44,255,0.32))] shadow-[0_0_20px_rgba(176,64,255,0.2)]",
  magenta: "bg-[linear-gradient(90deg,rgba(236,72,153,0.72),rgba(217,70,239,0.28))] shadow-[0_0_18px_rgba(236,72,153,0.18)]",
  blueViolet: "bg-[linear-gradient(90deg,rgba(129,140,248,0.74),rgba(176,64,255,0.26))] shadow-[0_0_18px_rgba(129,140,248,0.16)]"
};

export const kpiSurfaceToneClass: Record<AccentTone, string> = {
  cyan: "border-[rgba(103,232,249,0.3)] bg-[radial-gradient(circle_at_84%_10%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(145deg,rgba(44,31,64,0.86),rgba(26,16,48,0.82))]",
  violet: "border-[rgba(179,107,255,0.32)] bg-[radial-gradient(circle_at_84%_10%,rgba(176,64,255,0.14),transparent_34%),linear-gradient(145deg,rgba(44,31,64,0.88),rgba(26,16,48,0.82))]",
  magenta: "border-[rgba(244,114,182,0.3)] bg-[radial-gradient(circle_at_84%_10%,rgba(236,72,153,0.12),transparent_34%),linear-gradient(145deg,rgba(44,31,64,0.86),rgba(26,16,48,0.82))]",
  blueViolet: "border-[rgba(129,140,248,0.3)] bg-[radial-gradient(circle_at_84%_10%,rgba(129,140,248,0.11),transparent_34%),linear-gradient(145deg,rgba(44,31,64,0.86),rgba(26,16,48,0.82))]"
};
