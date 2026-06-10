import { PageHeader } from "@/components/layout/page-header";
import { TransactionsList } from "@/features/transactions/components/transactions-list";

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Transactions"
        description="Lihat, filter, edit, dan hapus record uang yang sudah kamu catat."
      />
      <TransactionsList />
    </div>
  );
}
