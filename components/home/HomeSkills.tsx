import { SectionHeading } from "@/components/home/SectionHeading";
import { skillCategories } from "@/lib/profile";

export function HomeSkills() {
  return (
    <div id="skills" className="scroll-mt-32 space-y-8">
      <SectionHeading label="Skills" title="Inventory" />
      <div className="space-y-8">
        {skillCategories.map((cat) => (
          <div key={cat.category} className="space-y-4">
            {/* Sharp geometric category label */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--accent)] uppercase font-semibold">
                {cat.category}
              </span>
              <div className="flex-1 h-[1.5px] bg-[var(--border)] opacity-50" />
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill.name}
                  className="tag-sharp"
                  title={skill.description}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
