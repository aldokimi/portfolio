export function SectionHeading({
  id,
  label,
  title,
}: {
  id?: string;
  label: string;
  title: string;
}) {
  return (
    <header id={id} className="scroll-mt-28 space-y-1">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
        {label}
      </p>
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h2>
    </header>
  );
}
