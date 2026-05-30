import { EducationRecords } from "@/components/EducationRecords";
import { EducationTerminal } from "@/components/EducationTerminal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { educationRecords } from "@/lib/education";

export function HomeEducation() {
  const bsc = educationRecords.find((e) => e.curriculumId);

  return (
    <div id="education" className="scroll-mt-28 space-y-8">
      <SectionHeading label="Education" title="Academic records" />
      <EducationRecords records={educationRecords} />

      {bsc?.curriculumId ? (
        <div className="space-y-4">
          <SectionHeading
            label="Curriculum"
            title={`${bsc.degree} — subjects`}
          />
          <EducationTerminal curriculumId={bsc.curriculumId} />
        </div>
      ) : null}
    </div>
  );
}
