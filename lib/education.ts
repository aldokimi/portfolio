import {
  curricula,
  educationRecords,
  elteBscCurriculum,
  type CurriculumCategory,
  type CurriculumSemester,
  type CurriculumSubject,
  type EducationRecord,
} from "@/lib/education-data";

export type { CurriculumCategory, CurriculumSemester, CurriculumSubject, EducationRecord };
export {
  curricula,
  educationRecords,
  elteBscCurriculum,
  ELTE_BSC_CURRICULUM_URL,
  DEBRECEN_FOUNDATION_URL,
} from "@/lib/education-data";

export const CURRICULUM_CATEGORY_LABELS: Record<CurriculumCategory, string> = {
  core: "Core",
  math: "Math",
  cs: "CS",
  thesis: "Thesis",
};

export const CURRICULUM_CATEGORIES: {
  id: CurriculumCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "core", label: "Core" },
  { id: "math", label: "Math" },
  { id: "cs", label: "CS" },
  { id: "thesis", label: "Thesis" },
];

const SEMESTER_ORDER: CurriculumSemester[] = [1, 2, 3, 4, 5, 6, "thesis"];

const SEMESTER_LABELS: Record<CurriculumSemester, string> = {
  1: "S1",
  2: "S2",
  3: "S3",
  4: "S4",
  5: "S5",
  6: "S6",
  thesis: "Thesis",
};

/** Semester filters derived from curriculum (omits empty semesters). */
export function curriculumSemesterFilters(
  subjects: CurriculumSubject[],
): { id: CurriculumSemester | "all"; label: string }[] {
  const present = new Set(subjects.map((s) => s.semester));
  const filters: { id: CurriculumSemester | "all"; label: string }[] = [
    { id: "all", label: "All" },
  ];
  for (const semester of SEMESTER_ORDER) {
    if (present.has(semester)) {
      filters.push({ id: semester, label: SEMESTER_LABELS[semester] });
    }
  }
  return filters;
}

export function formatCurriculumSemester(semester: CurriculumSemester): string {
  return typeof semester === "number" ? `Semester ${semester}` : "Thesis";
}

export function getCurriculum(id: string): CurriculumSubject[] {
  return curricula[id] ?? [];
}

export function filterCurriculum(
  subjects: CurriculumSubject[],
  options: {
    query: string;
    semester: CurriculumSemester | "all";
    category: CurriculumCategory | "all";
  },
): CurriculumSubject[] {
  const q = options.query.trim().toLowerCase();
  return subjects.filter((subject) => {
    if (options.semester !== "all" && subject.semester !== options.semester) {
      return false;
    }
    if (options.category !== "all" && subject.category !== options.category) {
      return false;
    }
    if (!q) return true;
    const haystack = [
      subject.code,
      subject.name,
      subject.description,
      CURRICULUM_CATEGORY_LABELS[subject.category],
      subject.prerequisites?.join(" ") ?? "",
      formatCurriculumSemester(subject.semester),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
