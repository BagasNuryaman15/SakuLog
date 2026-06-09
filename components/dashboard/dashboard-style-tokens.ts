export type AccentTone = "cyan" | "violet" | "magenta" | "blueViolet";
export type BlockTone = "default" | "primary" | "cta" | AccentTone;
export type LineTone = "default" | "primary" | "muted" | AccentTone;

export const shellClass =
  "w-full min-w-0 rounded-[1.5rem] bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px),radial-gradient(circle_at_88%_4%,rgba(146,82,255,0.052),transparent_30%),radial-gradient(circle_at_11%_88%,rgba(33,50,74,0.18),transparent_34%),radial-gradient(circle_at_74%_112%,rgba(34,211,238,0.018),transparent_36%),linear-gradient(135deg,rgba(3,3,5,0.995),rgba(6,7,10,0.985)_48%,rgba(2,2,4,0.995))] bg-[size:72px_72px,72px_72px,auto,auto,auto,auto] p-0 text-[#F8F4FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.026),0_30px_80px_rgba(0,0,0,0.58)]";
export const cardClass =
  "min-w-0 rounded-[1.5rem] border border-[rgba(214,226,255,0.078)] bg-[linear-gradient(145deg,rgba(10,10,13,0.965),rgba(5,6,8,0.94)_62%,rgba(2,2,4,0.975))] shadow-[inset_0_1px_0_rgba(255,255,255,0.034),inset_0_0_0_1px_rgba(255,255,255,0.006),0_24px_64px_rgba(0,0,0,0.52)] backdrop-blur-[18px]";
export const topbarClass =
  "border-[rgba(214,226,255,0.07)] bg-[linear-gradient(135deg,rgba(5,5,7,0.99),rgba(2,2,4,0.97))] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_18px_46px_rgba(0,0,0,0.54)]";
export const topbarControlClass =
  "border-[rgba(214,226,255,0.125)] bg-[linear-gradient(180deg,rgba(12,13,17,0.88),rgba(5,5,8,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.036),0_10px_24px_rgba(0,0,0,0.2)] outline-none transition duration-150 hover:-translate-y-px hover:border-[rgba(214,226,255,0.2)] hover:bg-[linear-gradient(180deg,rgba(16,17,22,0.92),rgba(6,6,9,0.86))] hover:text-[#F8F4FF] hover:shadow-[0_12px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.045)] focus-visible:border-[#67E8F9]/36 focus-visible:shadow-[0_0_0_2px_rgba(34,211,238,0.1),0_12px_28px_rgba(0,0,0,0.26)]";
export const topbarCommandKeyClass =
  "border-[rgba(214,226,255,0.1)] bg-[rgba(12,13,18,0.82)] text-[#6F5F86]";
export const topbarIconButtonClass =
  "border-[rgba(214,226,255,0.125)] bg-[linear-gradient(180deg,rgba(12,13,17,0.9),rgba(5,5,8,0.84))] text-[#C7B8E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.036),0_10px_24px_rgba(0,0,0,0.2)] outline-none transition duration-150 hover:-translate-y-px hover:border-[rgba(214,226,255,0.2)] hover:text-[#F8F4FF] hover:shadow-[0_12px_26px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.045)] focus-visible:border-[#67E8F9]/36 focus-visible:shadow-[0_0_0_2px_rgba(34,211,238,0.1)]";
export const topbarCtaClass =
  "border-[#E0B3FF]/22 bg-[linear-gradient(135deg,#5C24F1_0%,#8235FF_58%,#B337F0_100%)] text-[#F8F4FF] shadow-[0_14px_34px_rgba(106,44,255,0.24),0_0_18px_rgba(176,64,255,0.13),inset_0_1px_0_rgba(255,255,255,0.16)] outline-none transition duration-150 hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(106,44,255,0.3),0_0_24px_rgba(176,64,255,0.18),inset_0_1px_0_rgba(255,255,255,0.18)] focus-visible:shadow-[0_0_0_2px_rgba(224,179,255,0.18),0_14px_34px_rgba(106,44,255,0.24),0_0_18px_rgba(176,64,255,0.13)]";
export const heroSurfaceClass =
  "border-[rgba(214,226,255,0.105)] bg-[radial-gradient(circle_at_80%_12%,rgba(146,82,255,0.105),transparent_31%),radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.032),transparent_30%),linear-gradient(145deg,rgba(11,11,15,0.98),rgba(5,6,9,0.98)_64%,rgba(2,2,4,0.97))] shadow-[inset_0_1px_0_rgba(255,255,255,0.046),inset_0_0_0_1px_rgba(255,255,255,0.008),0_36px_88px_rgba(0,0,0,0.58),0_0_34px_rgba(123,0,212,0.045)]";
export const nestedSurfaceClass =
  "border-[rgba(214,226,255,0.072)] bg-[linear-gradient(135deg,rgba(9,9,12,0.92),rgba(3,4,6,0.86))] shadow-[inset_0_1px_0_rgba(255,255,255,0.034),0_18px_42px_rgba(0,0,0,0.48)]";
export const rightRailSurfaceClass =
  "border-[rgba(214,226,255,0.068)] bg-[linear-gradient(145deg,rgba(9,9,12,0.94),rgba(4,4,7,0.93))] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_52px_rgba(0,0,0,0.48)]";
export const cashflowSurfaceClass =
  "border-[rgba(214,226,255,0.078)] bg-[radial-gradient(circle_at_86%_4%,rgba(146,82,255,0.034),transparent_32%),linear-gradient(145deg,rgba(9,9,12,0.965),rgba(3,4,6,0.95))] shadow-[inset_0_1px_0_rgba(255,255,255,0.034),0_26px_66px_rgba(0,0,0,0.54)]";
export const lineClass =
  "h-2 rounded-sm bg-[linear-gradient(90deg,rgba(248,244,255,0.42),rgba(199,184,232,0.24))]";

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
  default: "border-[rgba(214,226,255,0.11)] bg-[rgba(14,15,19,0.62)]",
  primary: "border-[rgba(214,226,255,0.14)] bg-[rgba(18,18,24,0.66)]",
  cta: "border-[rgba(224,179,255,0.22)] bg-[linear-gradient(135deg,#5C24F1_0%,#8235FF_55%,#B337F0_100%)] shadow-[0_14px_34px_rgba(106,44,255,0.23),0_0_18px_rgba(176,64,255,0.13),inset_0_1px_0_rgba(255,255,255,0.16)]",
  cyan: "border-[rgba(103,232,249,0.38)] bg-[rgba(34,211,238,0.1)] shadow-[0_0_14px_rgba(34,211,238,0.1)]",
  violet: "border-[rgba(179,107,255,0.34)] bg-[rgba(123,0,212,0.12)] shadow-[0_0_14px_rgba(176,64,255,0.1)]",
  magenta: "border-[rgba(244,114,182,0.34)] bg-[rgba(186,49,159,0.12)] shadow-[0_0_14px_rgba(236,72,153,0.1)]",
  blueViolet: "border-[rgba(129,140,248,0.34)] bg-[rgba(88,80,236,0.11)] shadow-[0_0_14px_rgba(129,140,248,0.09)]"
};

export const lineToneClass: Record<LineTone, string> = {
  default: "bg-[linear-gradient(90deg,rgba(199,184,232,0.42),rgba(155,137,184,0.28))]",
  primary: "bg-[linear-gradient(90deg,rgba(248,244,255,0.6),rgba(199,184,232,0.38))]",
  muted: "bg-[linear-gradient(90deg,rgba(155,137,184,0.28),rgba(111,95,134,0.2))]",
  cyan: "bg-[linear-gradient(90deg,rgba(103,232,249,0.74),rgba(34,211,238,0.24))] shadow-[0_0_14px_rgba(34,211,238,0.12)]",
  violet: "bg-[linear-gradient(90deg,rgba(176,64,255,0.72),rgba(106,44,255,0.26))] shadow-[0_0_15px_rgba(176,64,255,0.14)]",
  magenta: "bg-[linear-gradient(90deg,rgba(236,72,153,0.68),rgba(217,70,239,0.22))] shadow-[0_0_14px_rgba(236,72,153,0.12)]",
  blueViolet: "bg-[linear-gradient(90deg,rgba(129,140,248,0.7),rgba(176,64,255,0.2))] shadow-[0_0_14px_rgba(129,140,248,0.1)]"
};

export const kpiSurfaceToneClass: Record<AccentTone, string> = {
  cyan: "border-[rgba(103,232,249,0.16)] bg-[radial-gradient(circle_at_84%_10%,rgba(34,211,238,0.04),transparent_36%),linear-gradient(145deg,rgba(9,9,12,0.955),rgba(4,5,7,0.93))]",
  violet: "border-[rgba(179,107,255,0.15)] bg-[radial-gradient(circle_at_84%_10%,rgba(154,53,255,0.042),transparent_36%),linear-gradient(145deg,rgba(9,9,12,0.955),rgba(4,5,7,0.93))]",
  magenta: "border-[rgba(244,114,182,0.15)] bg-[radial-gradient(circle_at_84%_10%,rgba(236,72,153,0.038),transparent_36%),linear-gradient(145deg,rgba(9,9,12,0.955),rgba(4,5,7,0.93))]",
  blueViolet: "border-[rgba(129,140,248,0.145)] bg-[radial-gradient(circle_at_84%_10%,rgba(129,140,248,0.038),transparent_36%),linear-gradient(145deg,rgba(9,9,12,0.955),rgba(4,5,7,0.93))]"
};
