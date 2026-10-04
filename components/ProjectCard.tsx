import type { Project } from "@/lib/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      rel="noreferrer"
      target="_blank"
      className="group block card-sharp p-0 overflow-hidden relative hover:border-[var(--accent)] transition-colors"
    >
      <div className="relative h-32 border-b border-[var(--border)] bg-[radial-gradient(circle_at_30%_20%,var(--glow-green),transparent_60%)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="absolute bottom-3 left-3 block h-2.5 w-2.5 rotate-45 bg-[var(--accent)] opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--card-fg)] group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--card-muted)]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="tag-sharp">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
