import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarClock,
  CreditCard,
  ListChecks,
  ReceiptText,
  Tags,
  WalletCards,
  type LucideIcon
} from "lucide-react";

import type { DashboardSummary } from "@/lib/reports/dashboard";
import { formatCurrencyIDR } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { WireframeCard } from "./dashboard-primitives";
import {
  captionText,
  cardTitle,
  metricLabel,
  metricValuePlaceholder
} from "@/shared/design/tokens";

type DashboardDietSectionsProps = {
  summary: DashboardSummary;
};

export function DashboardDietSections({ summary }: DashboardDietSectionsProps) {
  return (
    <section className="mt-3 grid w-full min-w-0 gap-3.5" aria-label="Dashboard V1.5 summary">
      <div className="grid min-w-0 gap-3.5 xl:grid-cols-[minmax(0,1.18fr)_minmax(20rem,0.82fr)]">
        <MoneyStatusCard summary={summary} />
        <PaymentLeakCard summary={summary} />
      </div>

      <CompactKpiRow summary={summary} />

      <div className="grid min-w-0 gap-3.5 xl:grid-cols-[minmax(0,1.18fr)_minmax(21rem,0.82fr)]">
        <RecentTransactionsCard summary={summary} />
        <TodayWeekSnapshotCard summary={summary} />
      </div>
    </section>
  );
}

function MoneyStatusCard({ summary }: DashboardDietSectionsProps) {
  const { moneyStatus } = summary.v15;
  const isEmpty = moneyStatus.monthIncome === 0 && moneyStatus.monthExpense === 0;
  const status = getMoneyStatusView(moneyStatus.status, isEmpty);
  const visual = getMoneyStatusVisualView(moneyStatus.status, isEmpty);

  return (
    <WireframeCard className="relative overflow-hidden p-4 sm:p-5">
      <div className={cn("pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl", visual.glowClass)} />
      <MoneyStatusVisual visual={visual} />
      <div className="relative z-10 flex min-w-0 flex-col">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <IconBadge icon={WalletCards} tone="violet" small />
              <div className="min-w-0">
                <h2 className={cn(cardTitle, "text-xl text-[#F8F4FF]")}>Money Status</h2>
                <p className={cn(captionText, "mt-1")}>Kondisi bulan berjalan</p>
              </div>
            </div>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full border px-3 py-1 text-xs font-bold",
              status.className
            )}
          >
            {status.label}
          </span>
        </div>

        <div className="mt-4 min-w-0 lg:max-w-[calc(100%-10rem)] xl:max-w-[calc(100%-11rem)]">
          <p className={cn(metricLabel, "text-[#C7B8E8]/82")}>Net balance this month</p>
          <p className={cn(metricValuePlaceholder, "mt-2 max-w-full truncate text-4xl sm:text-[2.75rem]")}>
            {formatCurrencyIDR(moneyStatus.monthBalance)}
          </p>
          <p className={cn(captionText, "mt-2 max-w-xl text-sm leading-5 text-[#B9A9D8]/82")}>
            {status.description}
          </p>
        </div>

        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
          <MoneyMetric
            label="Income this month"
            value={moneyStatus.monthIncome}
            tone="cyan"
          />
          <MoneyMetric
            label="Expenses this month"
            value={moneyStatus.monthExpense}
            tone="magenta"
          />
        </div>

        <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row">
          <DashboardAction href="/add?type=expense" icon={ArrowDownToLine} label="Tambah Pengeluaran" tone="violet" />
          <DashboardAction href="/add?type=income" icon={ArrowUpFromLine} label="Tambah Pemasukan" tone="cyan" />
        </div>
      </div>
    </WireframeCard>
  );
}

function PaymentLeakCard({ summary }: DashboardDietSectionsProps) {
  const paymentLeak = summary.v15.paymentLeak;
  const hasLeak = Boolean(paymentLeak);

  return (
    <WireframeCard className="relative overflow-hidden p-4 sm:p-5">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#7B00D4]/12 blur-3xl" />
      <div className="relative z-10 flex h-full min-w-0 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <IconBadge icon={CreditCard} tone="violet" small />
            <div className="min-w-0">
              <h2 className={cn(cardTitle, "text-xl text-[#F8F4FF]")}>Payment Leak</h2>
              <p className={cn(captionText, "mt-1")}>Metode bayar paling banyak keluar</p>
            </div>
          </div>
          {hasLeak && paymentLeak ? (
            <PaymentLeakPercent percentage={paymentLeak.percentage} />
          ) : null}
        </div>

        {hasLeak && paymentLeak ? (
          <div className="mt-5 flex min-w-0 flex-1 flex-col">
            <p className="text-sm font-bold leading-6 text-[#D8B4FE]">
              Paling bocor via {paymentLeak.paymentMethod}
            </p>
            <p className={cn(metricValuePlaceholder, "mt-2 max-w-full truncate text-3xl")}>
              {formatCurrencyIDR(paymentLeak.total)}
            </p>
            <p className={cn(captionText, "mt-1")}>bulan ini</p>

            <div className="mt-5 h-2 overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.045]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#8B5CF6,#C084FC,#67E8F9)] shadow-[0_0_18px_rgba(192,132,252,0.34)]"
                style={{ width: `${Math.min(paymentLeak.percentage, 100)}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <SmallStat label="of expenses" value={`${paymentLeak.percentage}%`} />
              <SmallStat label="transactions" value={String(paymentLeak.count)} />
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-1 flex-col justify-center rounded-[1rem] border border-white/[0.07] bg-white/[0.035] p-4">
            <p className="text-lg font-bold text-[#F8F4FF]">Belum ada payment leak</p>
            <p className={cn(captionText, "mt-2 leading-6")}>
              Catat pengeluaran dulu agar SakuLog bisa membaca metode pembayaran yang paling sering membuat uang keluar.
            </p>
          </div>
        )}
      </div>
    </WireframeCard>
  );
}

function CompactKpiRow({ summary }: DashboardDietSectionsProps) {
  const { kpis } = summary.v15;
  const topCategory = kpis.topExpenseCategory;
  const items: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
    helper: string;
    tone: IconTone;
  }> = [
    {
      icon: ArrowUpFromLine,
      label: "Income this month",
      value: formatCurrencyIDR(kpis.monthIncome),
      helper: "Total pemasukan",
      tone: "cyan"
    },
    {
      icon: ArrowDownToLine,
      label: "Expenses this month",
      value: formatCurrencyIDR(kpis.monthExpense),
      helper: "Total pengeluaran",
      tone: "magenta"
    },
    {
      icon: CalendarClock,
      label: "Daily average",
      value: formatCurrencyIDR(kpis.dailyAverageExpense),
      helper: "Rata-rata per hari",
      tone: "violet"
    },
    {
      icon: Tags,
      label: "Top category",
      value: topCategory?.category ?? "Belum ada",
      helper: topCategory
        ? `${formatCurrencyIDR(topCategory.amount)} (${topCategory.percentage}%)`
        : "Belum ada pengeluaran",
      tone: "blue"
    }
  ];

  return (
    <div className="grid min-w-0 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <WireframeCard key={item.label} className="min-h-[6.75rem] p-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <IconBadge icon={item.icon} tone={item.tone} small />
            <div className="min-w-0">
              <p className={cn(metricLabel, "truncate text-[#C7B8E8]/82")}>{item.label}</p>
              <p className="mt-1.5 truncate text-lg font-black tracking-[-0.035em] text-[#F8F4FF] sm:text-xl">
                {item.value}
              </p>
              <p className={cn(captionText, "mt-1.5 truncate")}>{item.helper}</p>
            </div>
          </div>
        </WireframeCard>
      ))}
    </div>
  );
}

function RecentTransactionsCard({ summary }: DashboardDietSectionsProps) {
  const transactions = summary.v15.recentTransactions.slice(0, 5);

  return (
    <WireframeCard className="overflow-hidden p-0">
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <IconBadge icon={ReceiptText} tone="violet" small />
          <div className="min-w-0">
            <h2 className={cn(cardTitle, "truncate text-[#F8F4FF]")}>Recent Transactions</h2>
            <p className={cn(captionText, "mt-1 truncate")}>Aktivitas terakhir yang tercatat</p>
          </div>
        </div>
        <Link
          href="/transactions"
          className="shrink-0 rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-xs font-bold text-[#D8B4FE] transition hover:border-[#BFA7FF]/24 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Lihat semua
        </Link>
      </div>

      {transactions.length > 0 ? (
        <div className="divide-y divide-white/[0.055] px-3 py-1.5">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="m-5 rounded-[1rem] border border-white/[0.07] bg-white/[0.035] p-5">
          <p className="text-sm font-bold text-[#F8F4FF]">Belum ada transaksi</p>
          <p className={cn(captionText, "mt-2 leading-6")}>
            Tambahkan pemasukan atau pengeluaran pertama untuk mengisi aktivitas terbaru.
          </p>
        </div>
      )}
    </WireframeCard>
  );
}

function TodayWeekSnapshotCard({ summary }: DashboardDietSectionsProps) {
  const snapshot = summary.v15.todayWeekSnapshot;

  return (
    <WireframeCard className="p-4">
      <div className="flex min-w-0 items-center gap-3">
        <IconBadge icon={ListChecks} tone="violet" small />
        <div className="min-w-0">
          <h2 className={cn(cardTitle, "text-[#F8F4FF]")}>Today / Week Snapshot</h2>
          <p className={cn(captionText, "mt-1")}>Ringkasan pendek minggu berjalan</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3 xl:grid-cols-3">
        <SnapshotMetric label="Today spent" value={formatCurrencyIDR(snapshot.todayExpense)} />
        <SnapshotMetric label="This week spent" value={formatCurrencyIDR(snapshot.weekExpense)} />
        <SnapshotMetric label="Expense tx this week" value={String(snapshot.weekExpenseTransactionCount)} />
      </div>

      <div className="mt-3.5 rounded-[1rem] border border-[#B36BFF]/14 bg-[linear-gradient(135deg,rgba(123,0,212,0.12),rgba(255,255,255,0.026))] p-3.5">
        <p className={cn(metricLabel, "text-[#C7B8E8]/82")}>Top spend this week</p>
        {snapshot.weekTopExpenseCategory ? (
          <div className="mt-2 flex min-w-0 items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-lg font-black tracking-[-0.03em] text-[#F8F4FF]">
                {snapshot.weekTopExpenseCategory.category}
              </p>
              <p className={cn(captionText, "mt-1 truncate")}>
                {snapshot.weekTopExpenseCategory.percentage}% of this week spending
              </p>
            </div>
            <p className="shrink-0 text-right text-lg font-black text-[#D8B4FE]">
              {formatCurrencyIDR(snapshot.weekTopExpenseCategory.amount)}
            </p>
          </div>
        ) : (
          <p className={cn(captionText, "mt-2 leading-6")}>
            Belum ada kategori pengeluaran minggu ini.
          </p>
        )}
      </div>
    </WireframeCard>
  );
}

type IconTone = "cyan" | "violet" | "magenta" | "blue";

function IconBadge({
  icon: Icon,
  compact = false,
  small = false,
  tone
}: {
  icon: LucideIcon;
  compact?: boolean;
  small?: boolean;
  tone: IconTone;
}) {
  const toneClass: Record<IconTone, string> = {
    cyan: "border-cyan-200/24 bg-cyan-300/10 text-cyan-100",
    violet: "border-[#B36BFF]/26 bg-[#7B00D4]/14 text-[#E0B3FF]",
    magenta: "border-[#F9A8D4]/24 bg-[#BA319F]/12 text-[#FBCFE8]",
    blue: "border-indigo-200/24 bg-indigo-400/10 text-indigo-100"
  };

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[0.9rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        small ? "h-9 w-9" : compact ? "h-11 w-11" : "h-12 w-12",
        toneClass[tone]
      )}
      aria-hidden="true"
    >
      <Icon className={cn(small ? "h-4 w-4" : compact ? "h-[1.125rem] w-[1.125rem]" : "h-5 w-5")} strokeWidth={2.25} />
    </span>
  );
}

function MoneyStatusVisual({
  visual
}: {
  visual: ReturnType<typeof getMoneyStatusVisualView>;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute right-4 top-[4.55rem] hidden h-24 w-36 overflow-hidden rounded-[1.35rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] lg:block xl:right-5 xl:w-40",
        visual.surfaceClass
      )}
      aria-hidden="true"
    >
      <span className={cn("absolute inset-4 rounded-full border", visual.orbitClass)} />
      <span className={cn("absolute inset-x-5 top-1/2 h-px", visual.railClass)} />
      <span className={cn("absolute left-6 right-10 top-[36%] h-px", visual.railClass)} />
      <span className={cn("absolute bottom-[30%] left-10 right-6 h-px", visual.railClass)} />
      <span className={cn("absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border text-xl font-black", visual.coreClass)}>
        {visual.symbol}
      </span>
      <span className={cn("absolute bottom-4 left-5 h-2 w-12 rounded-full", visual.barClass)} />
      <span className={cn("absolute bottom-4 right-5 h-2 w-8 rounded-full opacity-70", visual.barClass)} />
    </div>
  );
}

function PaymentLeakPercent({ percentage }: { percentage: number }) {
  return (
    <div
      className="relative hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#B36BFF]/18 bg-[radial-gradient(circle_at_50%_45%,rgba(103,232,249,0.12),rgba(123,0,212,0.18)_45%,rgba(255,255,255,0.03))] text-right shadow-[0_0_28px_rgba(123,0,212,0.16),inset_0_1px_0_rgba(255,255,255,0.05)] sm:flex"
      aria-hidden="true"
    >
      <span className="absolute inset-2 rounded-[1rem] border border-[#67E8F9]/10" />
      <span className="text-lg font-black tracking-[-0.04em] text-[#F8F4FF]">{percentage}%</span>
    </div>
  );
}

function MoneyMetric({
  label,
  tone,
  value
}: {
  label: string;
  tone: "cyan" | "magenta";
  value: number;
}) {
  return (
    <div className="min-w-0 rounded-[0.9rem] border border-white/[0.07] bg-white/[0.035] p-2.5">
      <p className={cn(metricLabel, tone === "cyan" ? "text-cyan-200/78" : "text-[#F9A8D4]/78")}>
        {label}
      </p>
      <p className="mt-1.5 truncate text-base font-black tracking-[-0.03em] text-[#F8F4FF] sm:text-lg">
        {formatCurrencyIDR(value)}
      </p>
    </div>
  );
}

function DashboardAction({
  href,
  icon: Icon,
  label,
  tone
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  tone: "cyan" | "violet";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        tone === "cyan"
          ? "border-cyan-200/18 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/14"
          : "border-[#B36BFF]/24 bg-[#7B00D4]/16 text-[#E0B3FF] hover:bg-[#7B00D4]/22"
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={2.4} />
      <span>{label}</span>
    </Link>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.9rem] border border-white/[0.07] bg-white/[0.035] p-3">
      <p className="text-xl font-black tracking-[-0.04em] text-[#F8F4FF]">{value}</p>
      <p className={cn(captionText, "mt-1 truncate")}>{label}</p>
    </div>
  );
}

function SnapshotMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.9rem] border border-white/[0.07] bg-white/[0.035] p-3">
      <p className={cn(metricLabel, "text-[#C7B8E8]/82")}>{label}</p>
      <p className="mt-1.5 truncate text-lg font-black tracking-[-0.035em] text-[#F8F4FF]">{value}</p>
    </div>
  );
}

function TransactionRow({
  transaction
}: {
  transaction: DashboardSummary["v15"]["recentTransactions"][number];
}) {
  const isIncome = transaction.type === "income";
  const method = isIncome
    ? transaction.source ?? transaction.payment_method ?? "Lainnya"
    : transaction.payment_method ?? "Lainnya";

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-3 px-1.5 py-2.5 sm:grid-cols-[1.35rem_minmax(0,1.08fr)_minmax(7rem,0.62fr)_auto] sm:items-center">
      <span
        className={cn(
          "hidden h-7 w-7 items-center justify-center rounded-lg border sm:flex",
          isIncome
            ? "border-cyan-200/20 bg-cyan-300/10 text-cyan-100"
            : "border-[#F9A8D4]/20 bg-[#BA319F]/10 text-[#FBCFE8]"
        )}
        aria-hidden="true"
      >
        {isIncome ? "+" : "-"}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-[#F8F4FF]/92">{transaction.name}</p>
        <p className={cn(captionText, "mt-1 hidden truncate sm:block")}>
          {transaction.category} · {formatTransactionDate(transaction.transaction_date)}
        </p>
        <p className={cn(captionText, "mt-1 leading-5 sm:hidden")}>
          {transaction.category} · {method} · {formatTransactionDate(transaction.transaction_date)}
        </p>
      </div>
      <div className="hidden min-w-0 sm:block">
        <p className={cn(captionText, "truncate")}>{method}</p>
        <p className={cn(captionText, "mt-1 truncate text-[0.62rem]")}>
          {isIncome ? "Pemasukan" : "Pengeluaran"}
        </p>
      </div>
      <p
        className={cn(
          "shrink-0 text-right text-sm font-black tabular-nums",
          isIncome ? "text-cyan-200" : "text-[#F472B6]"
        )}
      >
        {isIncome ? "+" : "-"}
        {formatCurrencyIDR(Number(transaction.amount) || 0)}
      </p>
    </div>
  );
}

function formatTransactionDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const hasValidParts = [year, month, day].every(Number.isInteger);

  if (!hasValidParts || month < 1 || month > 12 || day < 1 || day > 31) {
    return date;
  }

  const parsedDate = new Date(Date.UTC(year, month - 1, day));
  const isSameDate =
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day;

  if (!isSameDate) {
    return date;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC"
  }).format(parsedDate);
}

function getMoneyStatusView(status: DashboardSummary["v15"]["moneyStatus"]["status"], isEmpty: boolean) {
  if (isEmpty) {
    return {
      label: "Belum cukup data",
      description: "Catat pemasukan dan pengeluaran agar status bulan ini lebih akurat.",
      className: "border-[#C7B8E8]/18 bg-white/[0.045] text-[#C7B8E8]"
    };
  }

  if (status === "minus") {
    return {
      label: "Minus",
      description: "Pengeluaran bulan ini sudah lebih besar dari pemasukan.",
      className: "border-[#F472B6]/24 bg-[#BA319F]/12 text-[#FBCFE8]"
    };
  }

  if (status === "waspada") {
    return {
      label: "Waspada",
      description: "Pengeluaran sudah mendekati pemasukan bulan ini.",
      className: "border-amber-200/24 bg-amber-300/10 text-amber-100"
    };
  }

  return {
    label: "Aman",
    description: "Pengeluaran masih berada di bawah batas waspada bulan ini.",
    className: "border-emerald-200/24 bg-emerald-300/10 text-emerald-100"
  };
}

function getMoneyStatusVisualView(status: DashboardSummary["v15"]["moneyStatus"]["status"], isEmpty: boolean) {
  if (isEmpty) {
    return {
      symbol: "0",
      glowClass: "bg-[#7B00D4]/12",
      surfaceClass: "border-[#C7B8E8]/14 bg-[radial-gradient(circle_at_50%_38%,rgba(199,184,232,0.1),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.035),rgba(3,3,5,0.1))]",
      orbitClass: "border-[#C7B8E8]/14",
      railClass: "bg-[#C7B8E8]/14",
      coreClass: "border-[#C7B8E8]/18 bg-white/[0.04] text-[#C7B8E8]",
      barClass: "bg-[#C7B8E8]/28"
    };
  }

  if (status === "minus") {
    return {
      symbol: "-",
      glowClass: "bg-[#BA319F]/16",
      surfaceClass: "border-[#F472B6]/14 bg-[radial-gradient(circle_at_50%_38%,rgba(244,114,182,0.14),transparent_38%),linear-gradient(135deg,rgba(186,49,159,0.18),rgba(3,3,5,0.08))]",
      orbitClass: "border-[#F472B6]/18",
      railClass: "bg-[#F472B6]/16",
      coreClass: "border-[#F472B6]/22 bg-[#BA319F]/14 text-[#FBCFE8]",
      barClass: "bg-[#F472B6]/48"
    };
  }

  if (status === "waspada") {
    return {
      symbol: "!",
      glowClass: "bg-amber-300/12",
      surfaceClass: "border-amber-200/14 bg-[radial-gradient(circle_at_50%_38%,rgba(252,211,77,0.14),transparent_38%),linear-gradient(135deg,rgba(217,119,6,0.13),rgba(3,3,5,0.08))]",
      orbitClass: "border-amber-200/18",
      railClass: "bg-amber-200/16",
      coreClass: "border-amber-200/22 bg-amber-300/10 text-amber-100",
      barClass: "bg-amber-200/45"
    };
  }

  return {
    symbol: "+",
    glowClass: "bg-[#7B00D4]/16",
    surfaceClass: "border-[#B36BFF]/16 bg-[radial-gradient(circle_at_50%_38%,rgba(103,232,249,0.14),transparent_38%),linear-gradient(135deg,rgba(123,0,212,0.2),rgba(3,3,5,0.08))]",
    orbitClass: "border-[#67E8F9]/18",
    railClass: "bg-[#67E8F9]/16",
    coreClass: "border-[#67E8F9]/24 bg-[#67E8F9]/10 text-cyan-100",
    barClass: "bg-[#67E8F9]/46"
  };
}
