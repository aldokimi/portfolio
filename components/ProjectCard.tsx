import type { Project } from "@/lib/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      rel="noreferrer"
      target="_blank"
      className="group block rounded-lg border border-slate-800 bg-slate-900/35 p-4 transition hover:border-cyan-500/30 hover:bg-slate-900/60"
    >
      <h3 className="font-mono text-sm text-cyan-200/90 group-hover:text-cyan-300">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-slate-700/80 px-1.5 py-0.5 font-mono text-[10px] text-slate-500"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}
