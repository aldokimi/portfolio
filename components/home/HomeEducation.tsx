import { SectionHeading } from "@/components/home/SectionHeading";
import { EducationRecords } from "@/components/EducationRecords";
import { educationRecords } from "@/lib/education-data";

export function HomeEducation() {
  return (
    <div className="space-y-6">
      <SectionHeading label="Education" title="Academic records" />
      <EducationRecords records={educationRecords} />
    </div>
  );
}
