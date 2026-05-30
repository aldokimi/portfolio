import { describe, expect, it } from "vitest";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillCategories,
} from "@/lib/profile";

describe("profile data", () => {
  it("has four experience entries in CV order", () => {
    expect(experience.map((e) => e.id)).toEqual([
      "genesys",
      "redhat",
      "nokia",
      "elte",
    ]);
  });

  it("each role has summary and bullets", () => {
    for (const role of experience) {
      expect(role.summary.length).toBeGreaterThan(10);
      expect(role.bullets.length).toBeGreaterThan(0);
      expect(role.stack.length).toBeGreaterThan(2);
    }
  });

  it("lists eight certifications", () => {
    expect(certifications).toHaveLength(8);
  });

  it("has six featured projects", () => {
    expect(projects).toHaveLength(6);
  });

  it("has seven skill categories", () => {
    expect(skillCategories).toHaveLength(7);
  });

  it("profile links include github and email", () => {
    const hrefs = profile.links.map((l) => l.href);
    expect(hrefs).toContain("mailto:mo.aldokimi@gmail.com");
    expect(hrefs.some((h) => h.includes("github.com/aldokimi"))).toBe(true);
  });
});
