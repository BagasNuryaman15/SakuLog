type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="w-fit rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-100/66 shadow-[0_10px_34px_rgba(0,0,0,0.2)]">
        SakuLog Console
      </p>
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-foreground drop-shadow-sm sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-indigo-100/56 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
