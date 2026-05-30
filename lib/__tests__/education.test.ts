import { describe, expect, it } from "vitest";
import {
  curriculumSemesterFilters,
  educationRecords,
  elteBscCurriculum,
  filterCurriculum,
} from "@/lib/education";

describe("education", () => {
  it("lists all education records", () => {
    expect(educationRecords).toHaveLength(3);
    expect(educationRecords[0].id).toBe("elte-bsc");
    expect(educationRecords.find((e) => e.id === "highschool")?.detail).toContain(
      "96.57",
    );
  });

  it("includes ELTE BSc curriculum subjects", () => {
    expect(elteBscCurriculum.length).toBeGreaterThan(25);
    expect(elteBscCurriculum.some((s) => s.code === "IP-18fIMPROGEG")).toBe(true);
  });

  it("filters curriculum by semester, category, and query", () => {
    const semesters = curriculumSemesterFilters(elteBscCurriculum).map((f) => f.id);
    expect(semesters).not.toContain(6);

    const s1 = filterCurriculum(elteBscCurriculum, {
      query: "",
      semester: 1,
      category: "all",
    });
    expect(s1.every((s) => s.semester === 1)).toBe(true);
    expect(s1.some((s) => s.name.includes("Imperative"))).toBe(true);

    const math = filterCurriculum(elteBscCurriculum, {
      query: "",
      semester: "all",
      category: "math",
    });
    expect(math.every((s) => s.category === "math")).toBe(true);

    const db = filterCurriculum(elteBscCurriculum, {
      query: "database",
      semester: "all",
      category: "all",
    });
    expect(db.some((s) => s.name.includes("Databases"))).toBe(true);
  });
});
