import type { EducationRecord } from "@/lib/education-data";

export function EducationRecords({ records }: { records: EducationRecord[] }) {
  return (
    <ul className="space-y-3">
      {records.map((edu) => (
        <li
          key={edu.id}
          className="card-sharp px-5 py-4 relative overflow-hidden group"
        >
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] opacity-20 group-hover:opacity-50 transition-opacity" />
          <p className="h3-card text-[var(--card-fg)]">{edu.degree}</p>
          <p className="mt-1 text-sm text-[var(--card-muted)]">
            {edu.school} · {edu.location}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-[var(--accent)] uppercase font-medium">
            {edu.period}
            {edu.detail ? ` · ${edu.detail}` : ""}
          </p>
          {edu.summary ? (
            <p className="mt-3 text-sm leading-relaxed text-[var(--card-muted)]">
              {edu.summary}
            </p>
          ) : null}
          {edu.highlights ? (
            <ul className="mt-3 space-y-1 text-sm text-[var(--card-muted)]">
              {edu.highlights.map((item) => (
                <li key={item} className="flex gap-2 items-start">
                  <span className="text-[var(--accent)] mt-1 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {edu.url ? (
            <a
              href={edu.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-mono text-[11px] text-[var(--accent)] hover:text-[var(--card-fg)] underline underline-offset-2 transition-colors"
            >
              Program details →
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
