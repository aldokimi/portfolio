import { TerminalHero } from "@/components/TerminalHero";

const roles = [
  {
    id: "genesys",
    title: "Genesys — Software Engineer",
    period: "Feb 2026 – present",
    impact:
      "Microservices, AI-assisted diagnostics, AWS cost-aware architecture, internal platforms.",
    stack: "Go, Java, Python, Kubernetes, AWS",
  },
  {
    id: "redhat",
    title: "Red Hat — Software Developer",
    period: "Jan 2024 – Feb 2026",
    impact:
      "Backends and automation against OpenStack & Kubernetes; IaC/CaaS; CI/CD and security posture.",
    stack: "Go, Python, Terraform, Ansible, OpenShift, Jenkins",
  },
  {
    id: "nokia",
    title: "Nokia — Software Developer",
    period: "Aug 2021 – Jan 2024",
    impact:
      "Telco cloud security, identity systems, Nokia CloudBand / NCS integration, hardened pipelines.",
    stack: "Python, Go, Kubernetes, OpenStack, Jenkins",
  },
  {
    id: "elte",
    title: "ELTE — Teaching / research",
    period: "Feb 2021 – present",
    impact:
      "Courses from Java to imperative C; quantum simulation with Python & Qiskit; senior demonstrator.",
    stack: "C, C++, Python, Qiskit",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-14 px-4 py-12">
      <section className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
          Architecture
        </p>
        <TerminalHero />
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-slate-400">
          Experience nodes
        </h2>
        <div className="space-y-2">
          {roles.map((role) => (
            <details
              key={role.id}
              className="group rounded-lg border border-slate-800 bg-slate-900/35 open:border-cyan-500/25"
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-mono text-sm text-slate-100 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-cyan-200/90 group-open:text-cyan-300">
                    {role.title}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-slate-500">
                    {role.period}
                  </span>
                </span>
              </summary>
              <div className="space-y-3 border-t border-slate-800/80 px-4 py-4 text-sm text-slate-300">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                    Impact
                  </h3>
                  <p className="mt-1">{role.impact}</p>
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                    Stack
                  </h3>
                  <p className="mt-1 font-mono text-xs text-cyan-100/80">{role.stack}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
