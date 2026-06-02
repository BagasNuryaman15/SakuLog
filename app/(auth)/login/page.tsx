import { redirect } from "next/navigation";
import { WalletCards } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
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
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(20,184,166,0.16),transparent_30rem)]" />
      <section className="relative w-full max-w-md rounded-lg border border-white/10 bg-card/76 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-300 text-primary-foreground shadow-[0_16px_42px_rgba(20,184,166,0.25)]">
            <WalletCards className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight">SakuLog</p>
            <p className="text-sm text-muted-foreground">Private finance workspace</p>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Sign in to continue tracking your income, expenses, and personal finance rhythm.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
