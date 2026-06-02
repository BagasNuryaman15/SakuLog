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
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <section className="w-full max-w-md rounded-md border bg-card/86 p-8 shadow-[0_24px_80px_rgba(27,37,31,0.12)] backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
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
