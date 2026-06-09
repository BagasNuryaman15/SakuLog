export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="h-[4.75rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl" />

      <div className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(25.5rem,1.35fr)_minmax(22rem,0.95fr)_minmax(20rem,21.25rem)] xl:grid-rows-[auto_auto] xl:[grid-template-areas:'hero_kpis_right'_'cashflow_cashflow_right']">
        <div className="h-[26rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl xl:[grid-area:hero]" />

        <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:h-[26rem] xl:grid-rows-2 xl:[grid-area:kpis]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[13rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl xl:h-full" />
          ))}
        </div>

        <aside className="grid min-w-0 gap-4 xl:[grid-area:right] xl:grid-rows-[auto_auto_auto_minmax(0,1fr)]">
          <div className="h-[14rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl" />
          <div className="h-[10rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl" />
          <div className="h-[6.75rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl" />
          <div className="h-[12.5rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl" />
        </aside>

        <div className="h-[19rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl xl:[grid-area:cashflow]" />
      </div>
    </div>
  );
}
