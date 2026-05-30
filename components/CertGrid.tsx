import { certifications } from "@/lib/profile";

export function CertGrid() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {certifications.map((cert) => (
        <li
          key={cert.name}
          className={`rounded-lg border px-3 py-2 ${
            cert.highlight
              ? "border-cyan-500/40 bg-cyan-500/10"
              : "border-slate-800 bg-slate-900/35"
          }`}
        >
          <p
            className={`font-mono text-xs ${
              cert.highlight ? "text-cyan-200" : "text-slate-200"
            }`}
          >
            {cert.name}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
            valid until {cert.validUntil}
          </p>
        </li>
      ))}
    </ul>
  );
}
