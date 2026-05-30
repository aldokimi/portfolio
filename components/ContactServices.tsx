import { profile, serviceOfferings } from "@/lib/profile";

const inquiryEmail = profile.links.find((l) => l.label === "Email")?.href;

export function ContactServices() {
  return (
    <section className="space-y-5" aria-labelledby="services-heading">
      <div className="space-y-2">
        <h2
          id="services-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90"
        >
          Services
        </h2>
        <p className="text-sm leading-relaxed text-slate-400">
          Available for consulting, career coaching, and tailored IT solutions.
          Engagements can be advisory, hands-on, or a mix — remote-friendly from{" "}
          {profile.location}.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceOfferings.map((service) => (
          <li
            key={service.id}
            className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/35 p-5"
          >
            <h3 className="font-mono text-sm text-cyan-300/95">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {service.summary}
            </p>
            <ul className="mt-4 flex-1 space-y-1.5 border-t border-slate-800/80 pt-4 text-sm text-slate-300">
              {service.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-cyan-500/70" aria-hidden>
                    ›
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {inquiryEmail ? (
        <p className="font-mono text-xs text-slate-500">
          To discuss scope and availability,{" "}
          <a
            href={`${inquiryEmail}?subject=${encodeURIComponent("Services inquiry")}`}
            className="text-cyan-400 hover:text-cyan-300"
          >
            send an email
          </a>
          .
        </p>
      ) : null}
    </section>
  );
}
