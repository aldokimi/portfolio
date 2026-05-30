import { skillCategories } from "@/lib/profile";

export function SkillsTerminal() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-[13px] shadow-inner shadow-black/30">
      <div className="border-b border-slate-800 px-4 py-2 text-cyan-500/80">
        $ skills --list
      </div>
      <div className="space-y-4 px-4 py-4">
        {skillCategories.map(({ category, items }) => (
          <div key={category}>
            <p className="text-cyan-400/90">[{category}]</p>
            <p className="mt-1 leading-relaxed text-slate-300">
              {items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
