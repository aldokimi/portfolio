import { SectionHeading } from "@/components/home/SectionHeading";
import { experience } from "@/lib/profile";
import { ExperienceNode } from "@/components/ExperienceNode";

export function HomeExperience() {
  return (
    <div id="experience" className="scroll-mt-28 space-y-6">
      <SectionHeading label="Experience" title="Experience nodes" />
      <div className="space-y-4">
        {experience.map((role) => (
          <ExperienceNode key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}
