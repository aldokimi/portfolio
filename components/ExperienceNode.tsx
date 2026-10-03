import type { ExperienceEntry } from "@/lib/profile";

export function ExperienceNode({ role }: { role: ExperienceEntry }) {
  return (
    <article className="card-sharp px-6 py-5 relative overflow-hidden group">
      {/* Sharp geometric corner accent */}
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)] opacity-20 group-hover:opacity-60 transition-opacity" />

      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="h3-card text-[var(--fg)]">
          {role.company}
          <span className="text-[var(--muted)] font-normal"> — {role.title}</span>
        </h3>
        <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--accent)] uppercase font-semibold shrink-0">
          {role.period}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
        {role.summary}
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-[var(--muted)]">
        {role.bullets.map((bullet) => (
          <li key={bullet.slice(0, 48)} className="flex gap-2 items-start">
            <span className="text-[var(--accent)] mt-1.5 shrink-0">›</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-wrap gap-1.5">
          {role.stack.map((tech) => (
            <span key={tech} className="tag-sharp text-[10px]">
              {tech}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] text-[var(--muted)] tracking-wide">
          {role.location}
        </span>
      </div>
    </article>
  );
}
