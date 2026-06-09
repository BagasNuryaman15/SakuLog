"use client";

export default function DashboardLayoutError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[1.7rem] border border-white/10 bg-black/24 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <p className="text-lg font-semibold tracking-[-0.035em] text-white">Terjadi kesalahan</p>
        <p className="mt-3 text-sm leading-6 text-indigo-100/50">
          {error.message || "Sesuatu tidak berjalan dengan semestinya."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full border border-white/10 bg-white/[0.055] px-5 py-2 text-sm font-medium text-indigo-100/80 transition hover:bg-white/[0.09]"
        >
          Coba lagi
        </button>
      </div>
    </div>
  );
}
