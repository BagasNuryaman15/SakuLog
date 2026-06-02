import { PageHeader } from "@/components/layout/page-header";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Ruang analisis periodik untuk membaca pola uang harian, mingguan, bulanan, dan tahunan."
      />
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Daily", "Pulse transaksi hari ini"],
          ["Weekly", "Pola keluar masuk 7 hari"],
          ["Monthly", "Kategori dan cashflow bulan ini"],
          ["Yearly", "Trend besar sepanjang tahun"]
        ].map(([period, description]) => (
          <div
            key={period}
            className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/24 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-400/12 blur-2xl" />
            <p className="relative text-lg font-semibold tracking-[-0.035em] text-white">{period}</p>
            <p className="relative mt-3 text-sm leading-6 text-indigo-100/50">{description}</p>
            <p className="relative mt-8 w-fit rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-indigo-100/48">
              Coming soon
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
