import type {
  ExpenseFormValues,
  IncomeFormValues,
  TransactionUpdateValues
} from "@/features/transactions/types";

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export type ValidationResult<T> = {
  isValid: boolean;
  errors: ValidationErrors<T>;
};

function buildResult<T>(errors: ValidationErrors<T>): ValidationResult<T> {
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function hasPositiveAmount(amount: number) {
  return Number.isFinite(amount) && amount > 0;
}

export function normalizeOptionalText(value?: string | null) {
  const trimmedValue = value?.trim();

  return trimmedValue ? trimmedValue : null;
}

export function validateExpenseValues(
  values: ExpenseFormValues
): ValidationResult<ExpenseFormValues> {
  const errors: ValidationErrors<ExpenseFormValues> = {};

  if (!values.name.trim()) {
    errors.name = "Nama pengeluaran wajib diisi.";
  }

  if (!hasPositiveAmount(values.amount)) {
    errors.amount = "Nominal harus lebih dari 0.";
  }

  if (!values.category) {
    errors.category = "Kategori wajib dipilih.";
  }

  if (!values.transactionDate) {
    errors.transactionDate = "Tanggal wajib diisi.";
  }

  if (!values.paymentMethod) {
    errors.paymentMethod = "Metode pembayaran wajib dipilih.";
  }

  return buildResult(errors);
}

export function validateIncomeValues(values: IncomeFormValues): ValidationResult<IncomeFormValues> {
  const errors: ValidationErrors<IncomeFormValues> = {};

  if (!values.name.trim()) {
    errors.name = "Nama pemasukan wajib diisi.";
  }

  if (!hasPositiveAmount(values.amount)) {
    errors.amount = "Nominal harus lebih dari 0.";
  }

  if (!values.category) {
    errors.category = "Kategori pemasukan wajib dipilih.";
  }

  if (!values.source) {
    errors.source = "Sumber pemasukan wajib dipilih.";
  }

  if (!values.transactionDate) {
    errors.transactionDate = "Tanggal wajib diisi.";
  }

  if (!values.receiptMethod) {
    errors.receiptMethod = "Metode penerimaan wajib dipilih.";
  }

  return buildResult(errors);
}

export function validateTransactionUpdateValues(
  values: TransactionUpdateValues
): ValidationResult<TransactionUpdateValues> {
  const errors: ValidationErrors<TransactionUpdateValues> = {};

  if (!values.name.trim()) {
    errors.name = "Nama transaksi wajib diisi.";
  }

  if (!hasPositiveAmount(values.amount)) {
    errors.amount = "Nominal harus lebih dari 0.";
  }

  if (!values.category) {
    errors.category = "Kategori wajib dipilih.";
  }

  if (!values.paymentMethod) {
    errors.paymentMethod =
      values.type === "income" ? "Metode penerimaan wajib dipilih." : "Metode pembayaran wajib dipilih.";
  }

  if (values.type === "income" && !values.source) {
    errors.source = "Sumber pemasukan wajib dipilih.";
  }

  if (!values.transactionDate) {
    errors.transactionDate = "Tanggal wajib diisi.";
  }

  return buildResult(errors);
}
