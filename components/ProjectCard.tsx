import type { Project } from "@/lib/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      rel="noreferrer"
      target="_blank"
      className="group block card-sharp p-6 hover:shadow-md transition-shadow relative overflow-hidden"
    >
      <h3 className="font-display text-xl font-bold tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/60">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="tag-sharp">
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}
