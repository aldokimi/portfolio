import { SkillsTerminal } from "@/components/SkillsTerminal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeSkills() {
  return (
    <div id="skills" className="scroll-mt-28 space-y-4">
      <SectionHeading label="Skills" title="Inventory" />
      <SkillsTerminal />
    </div>
  );
}
