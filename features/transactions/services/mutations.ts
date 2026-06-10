import { createClient } from "@/lib/supabase/client";
import {
  normalizeOptionalText,
  validateExpenseValues,
  validateIncomeValues,
  validateTransactionUpdateValues
} from "@/features/transactions/validators";
import type {
  ExpenseFormValues,
  IncomeFormValues,
  Transaction,
  TransactionUpdateValues
} from "@/features/transactions/types";
import type { TablesInsert, TablesUpdate } from "@/types/supabase";

function normalizeTransaction(transaction: Record<string, unknown>): Transaction {
  return transaction as Transaction;
}

function getFirstError(errors: Record<string, string | undefined>) {
  return Object.values(errors).find(Boolean) ?? "Transaction values are invalid.";
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

export async function createExpenseTransaction(values: ExpenseFormValues) {
  const validation = validateExpenseValues(values);

  if (!validation.isValid) {
    throw new Error(getFirstError(validation.errors));
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  const payload: TablesInsert<"transactions"> = {
    user_id: userId,
    type: "expense",
    name: values.name.trim(),
    amount: values.amount,
    category: values.category,
    payment_method: values.paymentMethod,
    source: null,
    transaction_date: values.transactionDate,
    note: normalizeOptionalText(values.note)
  };

  const { data, error } = await supabase.from("transactions").insert(payload).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeTransaction(data);
}

export async function createIncomeTransaction(values: IncomeFormValues) {
  const validation = validateIncomeValues(values);

  if (!validation.isValid) {
    throw new Error(getFirstError(validation.errors));
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  const payload: TablesInsert<"transactions"> = {
    user_id: userId,
    type: "income",
    name: values.name.trim(),
    amount: values.amount,
    category: values.category,
    payment_method: values.receiptMethod,
    source: values.source,
    transaction_date: values.transactionDate,
    note: normalizeOptionalText(values.note)
  };

  const { data, error } = await supabase.from("transactions").insert(payload).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeTransaction(data);
}

export async function updateTransaction(id: string, values: TransactionUpdateValues) {
  const validation = validateTransactionUpdateValues(values);

  if (!validation.isValid) {
    throw new Error(getFirstError(validation.errors));
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  const payload: TablesUpdate<"transactions"> = {
    name: values.name.trim(),
    amount: values.amount,
    category: values.category,
    payment_method: values.paymentMethod,
    source: values.type === "income" ? values.source ?? null : null,
    transaction_date: values.transactionDate,
    note: normalizeOptionalText(values.note)
  };

  const { data, error } = await supabase
    .from("transactions")
    .update(payload)
    .eq("id", id)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeTransaction(data);
}

export async function deleteTransaction(id: string) {
  const { supabase, userId } = await getAuthenticatedUserId();

  const { error } = await supabase.from("transactions").delete().eq("id", id).eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
