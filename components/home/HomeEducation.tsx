import { SectionHeading } from "@/components/home/SectionHeading";
import { EducationRecords } from "@/components/EducationRecords";
import { educationRecords } from "@/lib/education-data";

export function HomeEducation() {
  return (
    <div id="education" className="scroll-mt-28 space-y-6">
      <SectionHeading label="Education" title="Academic records" />
      <EducationRecords records={educationRecords} />
    </div>
  );
}
