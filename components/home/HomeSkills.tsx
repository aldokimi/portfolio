import { SectionHeading } from "@/components/home/SectionHeading";
import { skillCategories } from "@/lib/profile";
import { SkillsOrbit } from "@/components/home/SkillsOrbit";

export function HomeSkills() {
  return (
    <div className="space-y-8">
      <SectionHeading label="Skills" title="Inventory" />
      <SkillsOrbit categories={skillCategories} />
    </div>
  );
}
