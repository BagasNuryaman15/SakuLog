import type { ComponentType } from "react";
import { redirect } from "next/navigation";
import { ArrowUpRight, BadgeCheck, CircleDollarSign, Sparkles } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { BrandMark } from "@/components/layout/brand-mark";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen bg-[#080713] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:58px_58px]" />
      <div className="pointer-events-none absolute -left-24 top-0 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/24 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-10 h-[34rem] w-[34rem] rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[52rem] -translate-x-1/2 rounded-full bg-rose-400/14 blur-3xl" />

      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl rounded-[2.4rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.045))] shadow-[0_34px_130px_rgba(0,0,0,0.48)] backdrop-blur-2xl lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative z-10 flex flex-col p-6 sm:p-8 lg:p-12">
          <div className="lg:sticky lg:top-8">
            <BrandMark />

            <div className="my-auto max-w-md py-12">
              <p className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-100/62">
                Secure access
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-6xl">
                Welcome back.
              </h1>
              <p className="mt-5 text-sm leading-6 text-indigo-100/56 sm:text-base">
                Masuk ke money OS pribadi kamu untuk membaca cashflow, record transaksi, dan melihat
                arah uang dengan lebih jernih.
              </p>

              <LoginForm />
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[44rem] overflow-hidden rounded-r-[2.4rem] bg-black/24 p-8 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(129,140,248,0.34),transparent_24rem),radial-gradient(circle_at_34%_84%,rgba(244,114,182,0.24),transparent_22rem)]" />
          <div className="absolute right-10 top-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/22 px-4 py-2 text-sm text-indigo-50/70 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            Private finance workspace
          </div>

          <div className="relative ml-auto mt-28 max-w-xl rounded-[2rem] border border-white/12 bg-black/56 p-8 shadow-[0_30px_110px_rgba(0,0,0,0.45)]">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-400/22 blur-2xl" />
            <p className="text-4xl font-semibold leading-tight tracking-[-0.055em] text-white">
              Track the money. Keep the control.
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-indigo-100/54">
              Dashboard ini dibuat untuk satu tujuan: uang yang keluar dan masuk punya jejak yang
              jelas, bukan cuma angka yang hilang dari saldo.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <AuthVisualCard
                icon={CircleDollarSign}
                label="Monthly pulse"
                value="Rp500 rb"
                tone="text-cyan-100"
              />
              <AuthVisualCard
                icon={BadgeCheck}
                label="Private session"
                value="Secured"
                tone="text-emerald-100"
              />
            </div>
          </div>

          <div className="absolute bottom-10 left-10 right-10 rounded-[2rem] border border-white/12 bg-white/[0.08] p-5 backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-white">SakuLog Insight Layer</p>
                <p className="mt-1 text-xs text-indigo-100/46">
                  Income, expenses, category pulse, and recent records in one workspace.
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cyan-100">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AuthVisualCard({
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
    <div className="rounded-3xl border border-white/10 bg-white/[0.065] p-4">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] ${tone}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-5 text-xs text-indigo-100/46">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-[-0.035em] text-white">{value}</p>
    </div>
  );
}
