import { experience, skillCategories } from "@/lib/profile";
import type { ExperienceEntry } from "@/lib/profile";

export type IndexedSkill = {
  name: string;
  category: string;
  description: string;
};

export const indexedSkills: IndexedSkill[] = skillCategories.flatMap((c) =>
  c.items.map((item) => ({
    name: item.name,
    category: c.category,
    description: item.description,
  })),
);

export const SKILL_CATEGORIES = skillCategories.map((c) => c.category);

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+#/]/g, "");
}

const ALIASES: Record<string, string[]> = {
  go: ["golang"],
  golang: ["go"],
  kubernetes: ["k8s", "k8"],
  k8s: ["kubernetes"],
  k8: ["kubernetes", "k8s"],
  containers: ["docker", "kubernetes", "k8s"],
  docker: ["containers"],
  openshift: ["k8s"],
  openstack: ["iaas"],
  iaas: ["openstack", "terraform", "ansible"],
  typescript: ["javascript"],
  javascript: ["typescript"],
  aiagents: ["ai", "mcp"],
  platformengineering: ["platform"],
  c: ["cpp", "c++"],
  cpp: ["c", "c++"],
};

function expands(token: string): Set<string> {
  const base = normalize(token);
  const set = new Set([base]);
  for (const alt of ALIASES[base] ?? []) {
    set.add(normalize(alt));
  }
  return set;
}

export function skillMatchesQuery(skill: IndexedSkill, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    skill.name.toLowerCase().includes(q) ||
    skill.category.toLowerCase().includes(q) ||
    skill.description.toLowerCase().includes(q)
  );
}

export function skillMatchesStack(skillName: string, stackItem: string): boolean {
  const a = expands(skillName);
  const b = expands(stackItem);
  for (const left of a) {
    for (const right of b) {
      if (left === right || left.includes(right) || right.includes(left)) {
        return true;
      }
    }
  }
  return false;
}

export function rolesUsingSkill(skillName: string): ExperienceEntry[] {
  return experience.filter((role) =>
    role.stack.some((tag) => skillMatchesStack(skillName, tag)),
  );
}

export function filterSkills(
  skills: IndexedSkill[],
  options: { query: string; category: string | null },
): IndexedSkill[] {
  return skills.filter((skill) => {
    if (options.category && skill.category !== options.category) return false;
    return skillMatchesQuery(skill, options.query);
  });
}
