import { describe, expect, it } from "vitest";
import {
  filterSkills,
  indexedSkills,
  rolesUsingSkill,
  skillMatchesStack,
} from "@/lib/skills";

describe("skills helpers", () => {
  it("filters by query and category", () => {
    const python = filterSkills(indexedSkills, {
      query: "python",
      category: null,
    });
    expect(python.some((s) => s.name === "Python")).toBe(true);
    expect(
      python.every(
        (s) =>
          s.name.toLowerCase().includes("python") ||
          s.description.toLowerCase().includes("python"),
      ),
    ).toBe(true);
  });

  it("includes descriptions on indexed skills", () => {
    const go = indexedSkills.find((s) => s.name === "Go");
    expect(go?.description.length).toBeGreaterThan(10);
  });

  it("matches stack aliases", () => {
    expect(skillMatchesStack("Kubernetes", "K8s")).toBe(true);
    expect(skillMatchesStack("Go", "Golang")).toBe(true);
  });

  it("finds roles for Go", () => {
    const roles = rolesUsingSkill("Go");
    expect(roles.map((r) => r.id)).toContain("genesys");
    expect(roles.map((r) => r.id)).toContain("redhat");
  });
});
