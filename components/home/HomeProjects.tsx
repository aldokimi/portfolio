import { SectionHeading } from "@/components/home/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/profile";

export function HomeProjects() {
  return (
    <div className="space-y-6">
      <SectionHeading label="Projects" title="Featured repositories" />
      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
      <p className="font-mono text-xs text-[var(--fg)]/40 mt-6">
        More on{" "}
        <a
          href="https://github.com/aldokimi"
          className="text-[var(--accent)] hover:underline underline-offset-2 transition-colors"
          rel="noreferrer"
          target="_blank"
        >
          github.com/aldokimi
        </a>
      </p>
    </div>
  );
}
