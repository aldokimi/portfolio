import { profile, serviceOfferings } from "@/lib/profile";

const inquiryEmail = profile.links.find((l) => l.label === "Email")?.href;

export function ContactServices() {
  return (
    <section className="space-y-6" aria-labelledby="services-heading">
      <div className="space-y-3">
        <h2
          id="services-heading"
          className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase font-semibold"
        >
          Services
        </h2>
        <p className="text-base leading-relaxed text-[var(--muted)]">
          Available for consulting, career coaching, and tailored IT solutions.
          Engagements can be advisory, hands-on, or a mix — remote-friendly from{" "}
          {profile.location}.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {serviceOfferings.map((service) => (
          <li
            key={service.id}
            className="card-sharp flex flex-col p-5 relative overflow-hidden"
          >
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--accent)] opacity-20" />
            <h3 className="h3-card text-[var(--fg)]">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {service.summary}
            </p>
            <ul className="mt-4 flex-1 space-y-1.5 border-t border-[var(--border)] pt-4 text-sm text-[var(--muted)]">
              {service.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[var(--accent)] shrink-0 font-mono text-xs">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {inquiryEmail ? (
        <p className="font-mono text-xs text-[var(--muted)]">
          To discuss scope and availability,{" "}
          <a
            href={`${inquiryEmail}?subject=${encodeURIComponent("Services inquiry")}`}
            className="text-[var(--accent)] hover:text-[var(--fg)] underline underline-offset-2 transition-colors"
          >
            send an email
          </a>
          .
        </p>
      ) : null}
    </section>
  );
}
