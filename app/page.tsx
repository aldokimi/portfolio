import { CertGrid } from "@/components/CertGrid";
import { ContactStrip } from "@/components/ContactStrip";
import { EducationBlock } from "@/components/EducationBlock";
import { ExperienceNode } from "@/components/ExperienceNode";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsTerminal } from "@/components/SkillsTerminal";
import { TerminalHero } from "@/components/TerminalHero";
import { experience, profile, projects } from "@/lib/profile";

function SectionHeading({
  id,
  label,
  title,
}: {
  id?: string;
  label: string;
  title: string;
}) {
  return (
    <header id={id} className="scroll-mt-20 space-y-1">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
        {label}
      </p>
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h2>
    </header>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-14 px-4 py-12">
      <section id="top" className="scroll-mt-20 space-y-6">
        <SectionHeading label="Architecture" title="System overview" />
        <TerminalHero />
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-slate-300">{profile.bio}</p>
          <p className="font-mono text-[11px] text-slate-500">{profile.location}</p>
          <ContactStrip variant="compact" />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          id="experience"
          label="Experience"
          title="Experience nodes"
        />
        <div className="space-y-2">
          {experience.map((role, index) => (
            <ExperienceNode
              key={role.id}
              role={role}
              pulseChevron={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="skills" label="Skills" title="Inventory" />
        <SkillsTerminal />
      </section>

      <section className="space-y-4">
        <SectionHeading
          id="certs"
          label="Certifications"
          title="Trust store"
        />
        <CertGrid />
      </section>

      <section className="space-y-4">
        <SectionHeading id="education" label="Education" title="Records" />
        <EducationBlock />
      </section>

      <section className="space-y-4">
        <SectionHeading
          id="projects"
          label="Projects"
          title="Featured repositories"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </div>
        <p className="font-mono text-xs text-slate-500">
          More on{" "}
          <a
            href="https://github.com/aldokimi"
            className="text-cyan-400/90 hover:text-cyan-300"
            rel="noreferrer"
            target="_blank"
          >
            github.com/aldokimi
          </a>
        </p>
      </section>

      <section id="contact" className="scroll-mt-20 space-y-4">
        <SectionHeading label="Ping" title="Contact" />
        <ContactStrip variant="full" />
      </section>
    </main>
  );
}
