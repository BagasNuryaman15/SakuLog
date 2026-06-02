"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Loader2,
  PieChart,
  Plus,
  ReceiptText,
  Sparkles,
  Wallet
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTransactions } from "@/lib/transactions/queries";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const compactFormatter = new Intl.NumberFormat("id-ID", {
  notation: "compact",
  maximumFractionDigits: 1
});

const monthFormatter = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  year: "numeric"
});

const shortMonthFormatter = new Intl.DateTimeFormat("id-ID", {
  month: "short"
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short"
});

function toAmount(value: Transaction["amount"]) {
  return Number(value) || 0;
}

function isSameMonth(date: Date, reference: Date) {
  return date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth();
}

function parseTransactionDate(transaction: Transaction) {
  return new Date(`${transaction.transaction_date}T00:00:00`);
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatCompactCurrency(value: number) {
  return `Rp${compactFormatter.format(value)}`;
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function getLastSixMonths(reference: Date) {
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(reference.getFullYear(), reference.getMonth() - (5 - index), 1);

    return {
      key: getMonthKey(date),
      label: shortMonthFormatter.format(date),
      income: 0,
      expense: 0
    };
  });
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadTransactions() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getTransactions("all");

        if (isActive) {
          setTransactions(data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Gagal membaca transaksi.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadTransactions();

    return () => {
      isActive = false;
    };
  }, []);

  const summary = useMemo(() => {
    const now = new Date();
    const monthlyTransactions = transactions.filter((transaction) =>
      isSameMonth(parseTransactionDate(transaction), now)
    );
    const income = monthlyTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + toAmount(transaction.amount), 0);
    const expense = monthlyTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + toAmount(transaction.amount), 0);
    const balance = income - expense;
    const categories = monthlyTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce<Record<string, number>>((result, transaction) => {
        result[transaction.category] = (result[transaction.category] ?? 0) + toAmount(transaction.amount);
        return result;
      }, {});
    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    const months = getLastSixMonths(now);

    transactions.forEach((transaction) => {
      const date = parseTransactionDate(transaction);
      const month = months.find((item) => item.key === getMonthKey(date));

      if (!month) {
        return;
      }

      if (transaction.type === "income") {
        month.income += toAmount(transaction.amount);
      } else {
        month.expense += toAmount(transaction.amount);
      }
    });

    const maxMonthValue = Math.max(...months.map((month) => Math.max(month.income, month.expense)), 1);
    const recent = transactions.slice(0, 5);
    const spendRate = income > 0 ? Math.min(Math.round((expense / income) * 100), 100) : 0;

    return {
      balance,
      income,
      expense,
      topCategory,
      months,
      maxMonthValue,
      recent,
      spendRate,
      monthLabel: monthFormatter.format(now)
    };
  }, [transactions]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-3xl border border-red-300/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <section className="aurora-panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.16fr_0.84fr]">
          <div className="min-h-[27rem] rounded-[1.6rem] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-indigo-100/72">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                  Personal money intelligence
                </div>
                <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[0.96] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
                  Know where your money moves.
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-6 text-indigo-100/58 sm:text-base">
                  Ringkasan {summary.monthLabel} untuk melihat sisa uang, arus masuk, dan area
                  pengeluaran yang paling perlu diperhatikan.
                </p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <Link href="/add">
                  <Plus className="h-4 w-4" />
                  Add record
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.2),rgba(255,255,255,0.055))] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-indigo-100/56">Balance bulan ini</p>
                    <p className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
                      {formatCompactCurrency(summary.balance)}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-100 shadow-[0_16px_44px_rgba(34,211,238,0.14)]">
                    <Wallet className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#67e8f9,#818cf8,#e879f9)] shadow-[0_0_24px_rgba(129,140,248,0.65)]"
                    style={{ width: `${summary.spendRate}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-indigo-100/48">
                  {summary.spendRate}% dari pemasukan bulan ini sudah bergerak keluar.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                <MetricCard
                  icon={ArrowDownLeft}
                  label="Income"
                  value={formatCompactCurrency(summary.income)}
                  tone="text-emerald-200"
                />
                <MetricCard
                  icon={ArrowUpRight}
                  label="Expense"
                  value={formatCompactCurrency(summary.expense)}
                  tone="text-rose-200"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.6rem] border border-white/10 bg-black/22 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Cashflow pulse</p>
                  <p className="mt-1 text-xs text-indigo-100/45">6 bulan terakhir</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-indigo-100/58">
                  Live
                </div>
              </div>
              <div className="mt-8 flex h-44 items-end gap-3">
                {summary.months.map((month) => (
                  <div key={month.key} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-36 w-full items-end justify-center gap-1.5 rounded-t-2xl border border-white/5 bg-white/[0.025] px-1.5 pb-1.5">
                      <span
                        className="w-full rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(103,232,249,0.36)]"
                        style={{
                          height: `${Math.max((month.income / summary.maxMonthValue) * 100, 4)}%`
                        }}
                      />
                      <span
                        className="w-full rounded-full bg-fuchsia-400/70 shadow-[0_0_18px_rgba(232,121,249,0.32)]"
                        style={{
                          height: `${Math.max((month.expense / summary.maxMonthValue) * 100, 4)}%`
                        }}
                      />
                    </div>
                    <span className="text-[11px] text-indigo-100/44">{month.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Kategori terboros</p>
                  <p className="mt-1 text-xs text-indigo-100/45">Expense bulan ini</p>
                </div>
                <PieChart className="h-5 w-5 text-fuchsia-200/80" />
              </div>
              <div className="mt-8 flex items-end justify-between gap-5">
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {summary.topCategory?.[0] ?? "Belum ada"}
                  </p>
                  <p className="mt-2 text-sm text-indigo-100/50">
                    {summary.topCategory ? formatCurrency(summary.topCategory[1]) : "Tambah transaksi dulu."}
                  </p>
                </div>
                <div className="relative h-24 w-24 shrink-0 rounded-full bg-[conic-gradient(from_160deg,#67e8f9,#818cf8,#e879f9,#ffffff22)] p-2 shadow-[0_0_55px_rgba(129,140,248,0.28)]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#090914] text-sm font-semibold text-white">
                    {summary.spendRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded-[1.8rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Money signals</p>
              <p className="mt-1 text-xs text-indigo-100/45">Yang perlu kamu lihat cepat</p>
            </div>
            <CircleDollarSign className="h-5 w-5 text-cyan-200/80" />
          </div>
          <div className="mt-5 space-y-3">
            <Signal label="Income bulan ini" value={formatCurrency(summary.income)} />
            <Signal label="Expense bulan ini" value={formatCurrency(summary.expense)} />
            <Signal
              label="Transaksi terekam"
              value={`${transactions.length} record`}
            />
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Recent transactions</p>
              <p className="mt-1 text-xs text-indigo-100/45">Aktivitas terakhir yang tercatat</p>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/transactions">
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            {summary.recent.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/12 bg-white/[0.035] p-6 text-center">
                <ReceiptText className="mx-auto h-6 w-6 text-indigo-100/40" />
                <p className="mt-3 text-sm font-medium text-white">Belum ada transaksi</p>
                <p className="mt-1 text-sm text-indigo-100/45">
                  Tambahkan pemasukan atau pengeluaran untuk menghidupkan dashboard.
                </p>
              </div>
            ) : (
              summary.recent.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid gap-3 rounded-3xl border border-white/8 bg-white/[0.045] p-3 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-2xl",
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
                      <p className="truncate text-sm font-semibold text-white">{transaction.name}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-indigo-100/44">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {dateFormatter.format(parseTransactionDate(transaction))}
                        <span className="h-1 w-1 rounded-full bg-indigo-100/28" />
                        {transaction.category}
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
                    {formatCurrency(toAmount(transaction.amount))}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06]", tone)}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-indigo-100/44">{label}</p>
          <p className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">{value}</p>
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
