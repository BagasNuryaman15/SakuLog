import { createClient } from "@/lib/supabase/client";
import type { Transaction, TransactionFilter } from "@/types/transaction";

function normalizeTransaction(transaction: Record<string, unknown>): Transaction {
  return transaction as Transaction;
}

async function getAuthenticatedUserId() {
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  return { supabase, userId: user.id };
}

export async function getTransactions(filter: TransactionFilter = "all") {
  const { supabase, userId } = await getAuthenticatedUserId();

  let query = supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (filter !== "all") {
    query = query.eq("type", filter);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((transaction) => normalizeTransaction(transaction));
}

export async function getTransactionById(id: string) {
  const { supabase, userId } = await getAuthenticatedUserId();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeTransaction(data);
}

export async function getRecentTransactions(limit = 5) {
  const { supabase, userId } = await getAuthenticatedUserId();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((transaction) => normalizeTransaction(transaction));
}
