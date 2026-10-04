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
    <header id={id} className="scroll-mt-28 space-y-3 mb-12">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 bg-[var(--accent)] rotate-45 inline-block" />
        <span className="mono-label">{label}</span>
      </div>
      <h2 className="h2-section">{title}</h2>
    </header>
  );
}
