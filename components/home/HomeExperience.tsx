import { ExperienceNode } from "@/components/ExperienceNode";
import { SectionHeading } from "@/components/home/SectionHeading";
import { experience } from "@/lib/profile";

export function HomeExperience() {
  return (
    <div id="experience" className="scroll-mt-28 space-y-4">
      <SectionHeading label="Experience" title="Experience nodes" />
      <div className="space-y-2">
        {experience.map((role, index) => (
          <ExperienceNode
            key={role.id}
            role={role}
            pulseChevron={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
