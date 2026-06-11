"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-indigo-50/72">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-100/40" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="finance-input with-leading-icon"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-indigo-50/72">
          Password
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-100/40" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="finance-input with-leading-icon"
            placeholder="Enter your password"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-300/20 bg-red-500/10 px-3 py-2 text-sm text-red-100 shadow-sm">
          {error}
        </div>
      ) : null}

      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2.5 text-sm text-indigo-50/56 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-indigo-100/40" aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-medium text-indigo-50/68">Private session</p>
          <p className="mt-0.5 text-xs leading-5 text-indigo-100/40">
            Sesi login dikelola otomatis oleh Supabase di perangkat ini.
          </p>
        </div>
      </div>

      <Button type="submit" className="h-12 w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
