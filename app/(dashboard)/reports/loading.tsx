export default function ReportsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-white/[0.06]" />
        <div className="h-5 w-80 animate-pulse rounded-lg bg-white/[0.04]" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[12rem] animate-pulse rounded-[1.7rem] border border-white/10 bg-black/24 backdrop-blur-2xl"
          />
        ))}
      </div>
    </div>
  );
}
