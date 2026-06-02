import { PageHeader } from "@/components/layout/page-header";
import { TransactionsList } from "@/components/transactions/transactions-list";

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Transactions"
        description="Lihat, filter, edit, dan hapus transaksi yang sudah kamu catat."
      />
      <TransactionsList />
    </div>
  );
}
