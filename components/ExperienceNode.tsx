import type { ExperienceEntry } from "@/lib/profile";

export function ExperienceNode({
  role,
  pulseChevron = false,
}: {
  role: ExperienceEntry;
  pulseChevron?: boolean;
}) {
  const kubectlHint = `kubectl describe role/${role.id}`;

  return (
    <details
      id={role.id}
      className="group rounded-lg border border-slate-800 bg-slate-900/35 transition hover:border-cyan-500/25 open:border-cyan-500/30"
    >
      <summary className="cursor-pointer list-none px-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-sm text-cyan-200/90 group-open:text-cyan-300">
                {role.company} — {role.title}
              </span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                {role.period}
              </span>
            </div>
            <p className="text-sm text-slate-300">{role.summary}</p>
            <div className="flex flex-wrap items-center gap-2">
              {role.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-slate-700/80 bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] text-cyan-100/70"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <span className="text-cyan-400/90">
                +{role.bullets.length} details
              </span>
              <span className="text-slate-600 group-open:hidden">
                {kubectlHint}
              </span>
            </div>
          </div>
          <span
            className={`mt-1 shrink-0 font-mono text-cyan-400 transition-transform group-open:rotate-90 ${
              pulseChevron ? "chevron-hint" : ""
            }`}
            aria-hidden
          >
            ▸
          </span>
        </div>
      </summary>
      <div className="space-y-3 border-t border-slate-800/80 px-4 py-4 text-sm text-slate-300">
        <ul className="list-inside list-disc space-y-2 marker:text-cyan-500/60">
          {role.bullets.map((bullet) => (
            <li key={bullet.slice(0, 48)}>{bullet}</li>
          ))}
        </ul>
        <p className="font-mono text-[11px] text-slate-500">{role.location}</p>
      </div>
    </details>
  );
}
