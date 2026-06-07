export type AccentTone = "cyan" | "violet" | "magenta" | "blueViolet";
export type BlockTone = "default" | "primary" | "cta" | AccentTone;
export type LineTone = "default" | "primary" | "muted" | AccentTone;

export const shellClass =
  "w-full min-w-0 rounded-[1.5rem] border border-[rgba(179,107,255,0.18)] bg-[linear-gradient(rgba(224,179,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(224,179,255,0.016)_1px,transparent_1px),radial-gradient(circle_at_88%_6%,rgba(176,64,255,0.13),transparent_28%),radial-gradient(circle_at_4%_94%,rgba(217,70,239,0.075),transparent_30%),radial-gradient(circle_at_68%_112%,rgba(34,211,238,0.032),transparent_34%),linear-gradient(135deg,rgba(5,4,8,0.98),rgba(9,6,18,0.94)_48%,rgba(4,4,6,0.98))] bg-[size:72px_72px,72px_72px,auto,auto,auto,auto] p-0 text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_24px_70px_rgba(0,0,0,0.42),0_0_42px_rgba(176,64,255,0.06)]";
export const cardClass =
  "min-w-0 rounded-[1.5rem] border border-[rgba(179,107,255,0.2)] bg-[linear-gradient(145deg,rgba(13,10,20,0.92),rgba(7,6,11,0.9)_58%,rgba(4,4,6,0.94))] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),inset_0_0_0_1px_rgba(224,179,255,0.025),0_22px_60px_rgba(0,0,0,0.42),0_0_28px_rgba(176,64,255,0.045)] backdrop-blur-[18px]";
export const topbarClass =
  "border-[rgba(179,107,255,0.22)] bg-[linear-gradient(135deg,rgba(13,10,20,0.94),rgba(6,5,10,0.9))] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_16px_42px_rgba(0,0,0,0.38),0_0_30px_rgba(176,64,255,0.055)]";
export const heroSurfaceClass =
  "border-[rgba(179,107,255,0.26)] bg-[radial-gradient(circle_at_82%_10%,rgba(176,64,255,0.18),transparent_28%),radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.055),transparent_28%),linear-gradient(145deg,rgba(15,11,24,0.94),rgba(8,6,13,0.96)_62%,rgba(4,4,6,0.94))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(224,179,255,0.04),0_32px_78px_rgba(0,0,0,0.46),0_0_54px_rgba(176,64,255,0.11),0_0_22px_rgba(34,211,238,0.028)]";
export const nestedSurfaceClass =
  "border-[rgba(179,107,255,0.2)] bg-[linear-gradient(135deg,rgba(14,10,22,0.84),rgba(6,5,10,0.78))] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_16px_38px_rgba(0,0,0,0.36),0_0_22px_rgba(176,64,255,0.055)]";
export const rightRailSurfaceClass =
  "border-[rgba(179,107,255,0.2)] bg-[linear-gradient(145deg,rgba(13,10,20,0.9),rgba(6,5,10,0.88))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_48px_rgba(0,0,0,0.4),0_0_22px_rgba(176,64,255,0.045)]";
export const cashflowSurfaceClass =
  "border-[rgba(179,107,255,0.2)] bg-[linear-gradient(145deg,rgba(13,10,20,0.9),rgba(5,5,9,0.88))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_56px_rgba(0,0,0,0.42),0_0_28px_rgba(176,64,255,0.045)]";
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
  cyan: "border-[rgba(103,232,249,0.24)] bg-[radial-gradient(circle_at_84%_10%,rgba(34,211,238,0.085),transparent_34%),linear-gradient(145deg,rgba(13,10,20,0.9),rgba(7,6,12,0.86))]",
  violet: "border-[rgba(179,107,255,0.26)] bg-[radial-gradient(circle_at_84%_10%,rgba(176,64,255,0.1),transparent_34%),linear-gradient(145deg,rgba(13,10,20,0.9),rgba(7,6,12,0.86))]",
  magenta: "border-[rgba(244,114,182,0.23)] bg-[radial-gradient(circle_at_84%_10%,rgba(236,72,153,0.085),transparent_34%),linear-gradient(145deg,rgba(13,10,20,0.9),rgba(7,6,12,0.86))]",
  blueViolet: "border-[rgba(129,140,248,0.24)] bg-[radial-gradient(circle_at_84%_10%,rgba(129,140,248,0.08),transparent_34%),linear-gradient(145deg,rgba(13,10,20,0.9),rgba(7,6,12,0.86))]"
};
