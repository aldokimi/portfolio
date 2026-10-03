import { certifications } from "@/lib/profile";

export function CertGrid() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {certifications.map((cert) => (
        <li
          key={cert.name}
          className={`card-sharp px-4 py-3 relative overflow-hidden group ${
            cert.highlight ? "border-[var(--accent)]" : ""
          }`}
        >
          {/* Shield badge indicator for highlighted */}
          {cert.highlight && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent)] rotate-45" />
          )}
          <p className="font-mono text-sm text-[var(--fg)] font-medium">
            {cert.name}
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-[var(--muted)]">
            VALID UNTIL {cert.validUntil}
          </p>
        </li>
      ))}
    </ul>
  );
}
