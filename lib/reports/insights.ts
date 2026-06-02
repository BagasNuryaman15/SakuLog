import type { TopExpenseCategory } from "@/lib/reports/aggregations";

export function generateDashboardInsights({
  transactionCount,
  monthIncome,
  monthExpense,
  weekExpense,
  topExpenseCategory
}: {
  transactionCount: number;
  monthIncome: number;
  monthExpense: number;
  weekExpense: number;
  topExpenseCategory: TopExpenseCategory | null;
}) {
  if (transactionCount === 0) {
    return ["Mulai catat transaksi pertama kamu agar SakuLog bisa membaca pola uangmu."];
  }

  if (monthExpense > monthIncome) {
    return [
      "Pengeluaran bulan ini lebih besar dari pemasukan. Cek kategori terbesar untuk melihat sumber bocornya.",
      topExpenseCategory
        ? `Bulan ini pengeluaran terbesar kamu ada di kategori ${topExpenseCategory.category}.`
        : "Tambahkan kategori pengeluaran agar pola uangmu lebih mudah dibaca."
    ];
  }

  if (topExpenseCategory) {
    return [
      `Bulan ini pengeluaran terbesar kamu ada di kategori ${topExpenseCategory.category}.`,
      monthIncome > monthExpense
        ? "Cashflow bulan ini masih positif. Tetap pantau pengeluaran minggu ini."
        : "Pantau kategori terbesar agar sisa uang bulan ini tetap terkendali."
    ];
  }

  if (monthIncome > monthExpense) {
    return ["Cashflow bulan ini masih positif. Tetap pantau pengeluaran minggu ini."];
  }

  if (weekExpense > 0) {
    return ["Pengeluaran minggu ini sudah tercatat. Cek transaksi terbaru untuk melihat detailnya."];
  }

  return ["Data bulan ini mulai terbentuk. Tambahkan transaksi secara rutin agar insight lebih akurat."];
}
