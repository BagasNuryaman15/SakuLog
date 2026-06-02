"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Loader2,
  PieChart,
  Plus,
  ReceiptText,
  Search,
  Sparkles,
  Wallet
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrencyIDR } from "@/lib/formatters";
import {
  getDashboardMonthLabel,
  getDashboardSummary,
  getEmptyDashboardSummary,
  type DashboardSummary
} from "@/lib/reports/dashboard";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short"
});

function toAmount(value: Transaction["amount"]) {
  return Number(value) || 0;
}

function parseTransactionDate(transaction: Transaction) {
  return new Date(`${transaction.transaction_date}T00:00:00`);
}

function DashboardSkeleton() {
  return (
    <div className="aurora-panel flex min-h-[32rem] items-center justify-center rounded-[2rem]">
      <div className="relative z-10 text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-indigo-100/60" />
        <p className="mt-4 text-sm text-indigo-100/54">Membaca cashflow kamu...</p>
      </div>
    </div>
  );
}

export function Web3Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>(getEmptyDashboardSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadSummary() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getDashboardSummary();

        if (isActive) {
          setSummary(data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Gagal membaca ringkasan dashboard.");
          setSummary(getEmptyDashboardSummary());
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadSummary();

    return () => {
      isActive = false;
    };
  }, []);

  const monthSeriesMax = useMemo(
    () => Math.max(...summary.monthSeries.map((month) => Math.max(month.income, month.expense)), 1),
    [summary]
  );
  const spendRate = summary.monthIncome
    ? Math.min(Math.round((summary.monthExpense / summary.monthIncome) * 100), 100)
    : 0;
  const topExpensePercentage = summary.topExpenseCategory?.percentage ?? 0;
  const monthLabel = getDashboardMonthLabel();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-5">
      {error ? (
        <div className="rounded-3xl border border-red-300/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <DashboardTopBar monthLabel={monthLabel} />

      <section className="grid gap-5 min-[1440px]:grid-cols-[minmax(0,1fr)_25rem]">
        <div className="space-y-5">
          <div className="grid gap-5 min-[1260px]:grid-cols-[minmax(0,1fr)_minmax(21rem,0.95fr)]">
            <HeroBalanceCard
              monthLabel={monthLabel}
              monthBalance={summary.monthBalance}
              spendRate={spendRate}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard
                icon={ArrowDownLeft}
                label="Pemasukan bulan ini"
                value={formatCurrencyIDR(summary.monthIncome)}
                tone="text-emerald-200"
                accent="from-emerald-300/18"
              />
              <MetricCard
                icon={ArrowUpRight}
                label="Pengeluaran bulan ini"
                value={formatCurrencyIDR(summary.monthExpense)}
                tone="text-rose-200"
                accent="from-rose-300/18"
              />
              <MetricCard
                icon={CalendarDays}
                label="Pengeluaran hari ini"
                value={formatCurrencyIDR(summary.todayExpense)}
                tone="text-cyan-200"
                accent="from-cyan-300/18"
              />
              <MetricCard
                icon={CircleDollarSign}
                label="Pengeluaran minggu ini"
                value={formatCurrencyIDR(summary.weekExpense)}
                tone="text-fuchsia-200"
                accent="from-fuchsia-300/18"
              />
            </div>
          </div>

          <CashflowTrendCard summary={summary} monthSeriesMax={monthSeriesMax} />
        </div>

        <aside className="space-y-5">
          <TopCategoryCard
            topExpensePercentage={topExpensePercentage}
            category={summary.topExpenseCategory?.category ?? "Belum ada"}
            amount={
              summary.topExpenseCategory
                ? formatCurrencyIDR(summary.topExpenseCategory.amount)
                : "Tambah transaksi dulu."
            }
            hasCategory={Boolean(summary.topExpenseCategory)}
          />
          <MoneySignalsCard summary={summary} />
          <MiniInsightCard insights={summary.insights} />
          <RecentTransactionsCard transactions={summary.recentTransactions} />
        </aside>
      </section>
    </div>
  );
}

function DashboardTopBar({ monthLabel }: { monthLabel: string }) {
  return (
    <header className="rounded-[1.8rem] border border-white/10 bg-black/24 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.04em] text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-indigo-100/48">Ringkasan keuanganmu secara real-time</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex h-11 min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm text-indigo-100/42 md:w-[22rem]">
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Cari transaksi, kategori, atau insight...</span>
            <span className="ml-auto rounded-lg border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] text-indigo-100/38">
              ⌘K
            </span>
          </div>
          <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-sm font-medium text-indigo-100/70">
            <CalendarDays className="h-4 w-4" />
            {monthLabel}
          </div>
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-indigo-100/70 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_16px_rgba(232,121,249,0.8)]" />
          </button>
          <Button asChild size="lg" className="md:w-auto">
            <Link href="/add">
              <Plus className="h-4 w-4" />
              Tambah Transaksi
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroBalanceCard({
  monthLabel,
  monthBalance,
  spendRate
}: {
  monthLabel: string;
  monthBalance: number;
  spendRate: number;
}) {
  return (
    <div className="aurora-panel rounded-[2rem] p-5 sm:p-6">
      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div>
          <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-indigo-100/72">
            <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
            SakuLog Console
          </div>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl">
            Know where your money moves.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-indigo-100/54">
            Ringkasan {monthLabel} untuk memahami sisa uang, cashflow, dan kategori yang paling
            banyak menguras saldo.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.22),rgba(255,255,255,0.055))] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-indigo-100/56">Sisa uang bulan ini</p>
              <p className="mt-3 break-words text-4xl font-semibold leading-none tracking-[-0.055em] text-white sm:text-5xl">
                {formatCurrencyIDR(monthBalance)}
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cyan-100 shadow-[0_16px_44px_rgba(34,211,238,0.14)]">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-6 h-2.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#67e8f9,#818cf8,#e879f9)] shadow-[0_0_24px_rgba(129,140,248,0.65)]"
              style={{ width: `${spendRate}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-100/48">
            <span>{spendRate}% dari pemasukan bulan ini sudah bergerak keluar.</span>
            <span className={monthBalance >= 0 ? "text-emerald-200" : "text-rose-200"}>
              Cashflow {monthBalance >= 0 ? "positif" : "negatif"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CashflowTrendCard({
  summary,
  monthSeriesMax
}: {
  summary: DashboardSummary;
  monthSeriesMax: number;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[-0.035em] text-white">Cashflow trend</p>
          <p className="mt-1 text-sm text-indigo-100/45">Income vs expense 6 bulan terakhir</p>
        </div>
        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-indigo-100/50">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Pemasukan
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
            Pengeluaran
          </span>
        </div>
      </div>

      <div className="mt-7 h-72 rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-4">
        <div className="flex h-full items-end gap-3">
          {summary.monthSeries.map((month) => (
            <div key={month.key} className="flex h-full flex-1 flex-col justify-end">
              <div className="flex min-h-0 flex-1 items-end justify-center gap-2 border-b border-white/10 pb-3">
                <div
                  className="w-full max-w-8 rounded-t-2xl bg-cyan-300/75 shadow-[0_0_22px_rgba(103,232,249,0.32)]"
                  style={{
                    height: `${
                      month.income > 0 ? Math.max((month.income / monthSeriesMax) * 100, 8) : 3
                    }%`
                  }}
                />
                <div
                  className="w-full max-w-8 rounded-t-2xl bg-fuchsia-400/75 shadow-[0_0_22px_rgba(232,121,249,0.3)]"
                  style={{
                    height: `${
                      month.expense > 0 ? Math.max((month.expense / monthSeriesMax) * 100, 8) : 3
                    }%`
                  }}
                />
              </div>
              <p className="mt-3 text-center text-xs font-medium text-indigo-100/42">{month.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopCategoryCard({
  topExpensePercentage,
  category,
  amount,
  hasCategory
}: {
  topExpensePercentage: number;
  category: string;
  amount: string;
  hasCategory: boolean;
}) {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Kategori terboros</p>
          <p className="mt-1 text-xs text-indigo-100/45">Expense bulan ini</p>
        </div>
        <PieChart className="h-5 w-5 text-fuchsia-200/80" />
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        <div
          className="relative h-36 w-36 shrink-0 rounded-full p-3 shadow-[0_0_70px_rgba(129,140,248,0.34)]"
          style={{
            background:
              topExpensePercentage > 0
                ? `conic-gradient(from 160deg, #67e8f9 0%, #818cf8 ${Math.max(
                    topExpensePercentage / 2,
                    1
                  )}%, #e879f9 ${topExpensePercentage}%, rgba(255,255,255,0.12) ${topExpensePercentage}%, rgba(255,255,255,0.12) 100%)`
                : "conic-gradient(from 160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08))"
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#090914] text-white">
            <span className="text-3xl font-semibold tracking-[-0.05em]">{topExpensePercentage}%</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-indigo-100/38">total</span>
          </div>
        </div>

        <p className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white">{category}</p>
        <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-indigo-50">{amount}</p>
        <p className="mt-2 text-xs leading-5 text-indigo-100/45">
          {hasCategory
            ? "Dari total pengeluaran bulan ini."
            : "Kategori akan muncul setelah kamu mencatat pengeluaran."}
        </p>
      </div>
    </div>
  );
}

function MoneySignalsCard({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Money signals</p>
          <p className="mt-1 text-xs text-indigo-100/45">Yang perlu kamu lihat cepat</p>
        </div>
        <CircleDollarSign className="h-5 w-5 text-cyan-200/80" />
      </div>
      <div className="mt-5 space-y-3">
        <Signal label="Pengeluaran hari ini" value={formatCurrencyIDR(summary.todayExpense)} />
        <Signal label="Pengeluaran minggu ini" value={formatCurrencyIDR(summary.weekExpense)} />
        <Signal label="Kategori terboros" value={summary.topExpenseCategory?.category ?? "Belum ada"} />
      </div>
    </div>
  );
}

function MiniInsightCard({ insights }: { insights: string[] }) {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div>
        <p className="text-sm font-semibold text-white">Mini insight</p>
        <p className="mt-1 text-xs text-indigo-100/45">Pembacaan sederhana dari datamu</p>
      </div>
      <div className="mt-5 space-y-2">
        {insights.map((insight) => (
          <p
            key={insight}
            className="rounded-3xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-indigo-100/58"
          >
            {insight}
          </p>
        ))}
      </div>
    </div>
  );
}

function RecentTransactionsCard({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Transaksi terbaru</p>
          <p className="mt-1 text-xs text-indigo-100/45">Aktivitas terakhir yang tercatat</p>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href="/transactions">
            Lihat semua
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {transactions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/12 bg-white/[0.035] p-6 text-center">
            <ReceiptText className="mx-auto h-6 w-6 text-indigo-100/40" />
            <p className="mt-3 text-sm font-medium text-white">Belum ada transaksi</p>
            <p className="mt-1 text-sm text-indigo-100/45">
              Tambahkan pemasukan atau pengeluaran untuk menghidupkan dashboard.
            </p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <RecentTransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
}

function RecentTransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="grid gap-3 rounded-3xl border border-white/8 bg-white/[0.045] p-3 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
            transaction.type === "income"
              ? "bg-emerald-300/10 text-emerald-200"
              : "bg-rose-300/10 text-rose-200"
          )}
        >
          {transaction.type === "income" ? (
            <ArrowDownLeft className="h-4 w-4" />
          ) : (
            <ArrowUpRight className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-white">{transaction.name}</p>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                transaction.type === "income"
                  ? "border-emerald-200/16 bg-emerald-300/10 text-emerald-100"
                  : "border-rose-200/16 bg-rose-300/10 text-rose-100"
              )}
            >
              {transaction.type}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-indigo-100/44">
            <CalendarDays className="h-3.5 w-3.5" />
            {dateFormatter.format(parseTransactionDate(transaction))}
            <span className="h-1 w-1 rounded-full bg-indigo-100/28" />
            {transaction.category}
            {transaction.payment_method ? (
              <>
                <span className="h-1 w-1 rounded-full bg-indigo-100/28" />
                {transaction.payment_method}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <p
        className={cn(
          "text-sm font-semibold sm:text-right",
          transaction.type === "income" ? "text-emerald-200" : "text-rose-200"
        )}
      >
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrencyIDR(toAmount(transaction.amount))}
      </p>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone,
  accent
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: string;
  accent: string;
}) {
  return (
    <div
      className={cn(
        "min-h-[10.25rem] overflow-hidden rounded-[1.45rem] border border-white/10 bg-black/24 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl",
        "relative before:absolute before:inset-0 before:bg-gradient-to-br before:to-transparent before:opacity-100",
        accent
      )}
    >
      <div className="relative z-10 flex h-full flex-col justify-between gap-5">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06]", tone)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-indigo-100/44">{label}</p>
          <p className="mt-2 break-words text-xl font-semibold leading-tight tracking-[-0.04em] text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/8 bg-white/[0.04] px-4 py-3">
      <p className="text-sm text-indigo-100/50">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
