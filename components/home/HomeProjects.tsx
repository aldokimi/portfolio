import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/home/SectionHeading";
import { projects } from "@/lib/profile";

export function HomeProjects() {
  return (
    <div id="projects" className="scroll-mt-28 space-y-4">
      <SectionHeading label="Projects" title="Featured repositories" />
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
    </div>
  );
}
