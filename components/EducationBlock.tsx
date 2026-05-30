import { education } from "@/lib/profile";

export function EducationBlock() {
  return (
    <ul className="space-y-3">
      {education.map((edu) => (
        <li
          key={edu.degree}
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
        </li>
      ))}
    </ul>
  );
}
