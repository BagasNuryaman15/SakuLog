"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  className?: string;
  labelClassName?: string;
  variant?: "default" | "secondary" | "ghost" | "outline";
};

export function LogoutButton({ className, labelClassName, variant = "outline" }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant={variant}
      className={cn("w-full justify-center", className)}
      disabled={isLoading}
      onClick={handleLogout}
      aria-label="Logout"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      <span className={labelClassName}>{isLoading ? "Signing out" : "Logout"}</span>
    </Button>
  );
}
