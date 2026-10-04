import { SectionHeading } from "@/components/home/SectionHeading";
import { experience } from "@/lib/profile";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";

export function HomeExperience() {
  return (
    <div className="space-y-6">
      <SectionHeading label="Experience" title="Experience timeline" />
      <ExperienceTimeline roles={experience} />
    </div>
  );
}
