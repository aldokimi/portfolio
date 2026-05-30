import type { EducationRecord } from "@/lib/education";

export function EducationRecords({ records }: { records: EducationRecord[] }) {
  return (
    <ul className="space-y-4">
      {records.map((edu) => (
        <li
          key={edu.id}
          className="rounded-lg border border-slate-800 bg-slate-900/35 px-4 py-3"
        >
          <p className="font-mono text-sm text-slate-100">{edu.degree}</p>
          <p className="mt-1 text-sm text-slate-400">
            {edu.school} · {edu.location}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
            {edu.period}
            {edu.detail ? ` · ${edu.detail}` : ""}
          </p>
          {edu.summary ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {edu.summary}
            </p>
          ) : null}
          {edu.highlights ? (
            <ul className="mt-2 list-inside list-disc text-sm text-slate-500 marker:text-cyan-500/40">
              {edu.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {edu.url ? (
            <a
              href={edu.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-mono text-[11px] text-cyan-400/80 hover:text-cyan-300"
            >
              Program details →
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
