import {
  RED_HAT_VERIFICATION,
  certificationDetails,
} from "@/lib/certifications-data";
import { certificationsByProvider } from "@/lib/certs";
import { education, experience, profile, projects, skillCategories } from "@/lib/profile";

export const DOKICTL_ONLY_ERROR = "the only available command is dokictl";

export const HELP_LINES = [
  "dokictl — portfolio control plane (kubectl-compatible UX)",
  "",
  "Usage:",
  "  dokictl get profile",
  "  dokictl get certs",
  "  dokictl get roles",
  "  dokictl get skills",
  "  dokictl get education",
  "  dokictl get projects",
  "  dokictl describe role/<id>",
  "",
  "Role ids:",
  `  ${experience.map((r) => r.id).join(", ")}`,
];

export type DokictlResult =
  | { kind: "output"; lines: string[] }
  | { kind: "error"; message: string }
  | { kind: "help"; lines: string[] };

function formatTable(headers: string[], rows: string[][]): string[] {
  const widths = headers.map((header, i) =>
    Math.max(
      header.length,
      ...rows.map((row) => (row[i] ?? "").length),
    ),
  );
  const line = (cols: string[]) =>
    cols.map((col, i) => col.padEnd(widths[i] ?? 0)).join("  ");
  const sep = widths.map((w) => "-".repeat(w)).join("  ");
  return [line(headers), sep, ...rows.map((row) => line(row))];
}

function outputCerts(): string[] {
  const rows = certificationDetails.map((c) => [
    c.highlight ? `${c.acronym} *` : c.acronym,
    c.validUntil,
  ]);
  const redHatCount = certificationsByProvider("redhat").length;
  return [
    `credentials: ${certificationDetails.length} total`,
    `red hat: ${redHatCount} · verify-id: ${RED_HAT_VERIFICATION.certId}`,
    `red hat verify: ${RED_HAT_VERIFICATION.url}`,
    "",
    ...formatTable(["CREDENTIAL", "VALID_UNTIL"], rows),
  ];
}

function outputRoles(): string[] {
  const rows = experience.map((r) => [r.id, r.company, r.title, r.period]);
  return formatTable(["NAME", "COMPANY", "TITLE", "PERIOD"], rows);
}

function describeRole(id: string): string[] {
  const role = experience.find((r) => r.id === id);
  if (!role) {
    return [`Error from server (NotFound): roles "${id}" not found`];
  }
  return [
    `Name:         ${role.id}`,
    `Company:      ${role.company}`,
    `Title:        ${role.title}`,
    `Location:     ${role.location}`,
    `Period:       ${role.period}`,
    `Status:       ${role.period.includes("present") ? "Running" : "Completed"}`,
    "Stack:",
    ...role.stack.map((s) => `  - ${s}`),
    "Summary:",
    `  ${role.summary}`,
    "Events:",
    ...role.bullets.map((b, i) => `  ${i + 1}. ${b}`),
  ];
}

function outputSkills(): string[] {
  const lines: string[] = [];
  for (const cat of skillCategories) {
    lines.push(`${cat.category}:`);
    lines.push(`  ${cat.items.map((item) => item.name).join(", ")}`);
    lines.push("");
  }
  return lines;
}

function outputProjects(): string[] {
  const rows = projects.map((p) => [
    p.title,
    p.stack.join(","),
    p.url.replace("https://github.com/aldokimi/", ""),
  ]);
  return formatTable(["NAME", "STACK", "REPO"], rows);
}

function outputProfile(): string[] {
  const bioLines: string[] = [];
  const words = profile.bio.split(/\s+/);
  let line = "  ";
  for (const word of words) {
    if (line.length + word.length > 74) {
      bioLines.push(line.trimEnd());
      line = `  ${word} `;
    } else {
      line += `${word} `;
    }
  }
  if (line.trim()) bioLines.push(line.trimEnd());

  return [
    `Name:      ${profile.name}`,
    `Role:      ${profile.tagline}`,
    `Location:  ${profile.location}`,
    "Bio:",
    ...bioLines,
    "Endpoints:",
    ...profile.links.map((l) => `  ${l.label.padEnd(12)} ${l.href}`),
  ];
}

function outputEducation(): string[] {
  if (education.length === 0) return ["No education records."];
  return education.flatMap((edu, i) => [
    ...(i > 0 ? [""] : []),
    `Degree:     ${edu.degree}`,
    `School:     ${edu.school}`,
    `Location:   ${edu.location}`,
    `Period:     ${edu.period}`,
    ...(edu.detail ? [`Detail:     ${edu.detail}`] : []),
  ]);
}

function runDokictlCommand(tokens: string[]): DokictlResult {
  const [sub, ...rest] = tokens;

  if (!sub || sub === "help" || sub === "--help" || sub === "-h") {
    return { kind: "help", lines: HELP_LINES };
  }

  if (sub === "get") {
    const resource = rest[0];
    const extra = rest.slice(1);

    if (!resource || extra.length > 0) {
      return { kind: "help", lines: HELP_LINES };
    }

    if (resource === "profile") {
      return { kind: "output", lines: outputProfile() };
    }
    if (resource === "projects") {
      return { kind: "output", lines: outputProjects() };
    }
    if (resource === "certs") {
      return { kind: "output", lines: outputCerts() };
    }
    if (resource === "roles") {
      return { kind: "output", lines: outputRoles() };
    }
    if (resource === "skills") {
      return { kind: "output", lines: outputSkills() };
    }
    if (resource === "education") {
      return { kind: "output", lines: outputEducation() };
    }

    return { kind: "help", lines: HELP_LINES };
  }

  if (sub === "describe") {
    const target = rest[0];
    if (!target?.startsWith("role/") || rest.length > 1) {
      return { kind: "help", lines: HELP_LINES };
    }
    const id = target.slice("role/".length);
    return { kind: "output", lines: describeRole(id) };
  }

  return { kind: "help", lines: HELP_LINES };
}

export function runDokictl(input: string): DokictlResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { kind: "output", lines: [] };
  }

  const tokens = trimmed.split(/\s+/);
  if (tokens[0] !== "dokictl") {
    return { kind: "error", message: DOKICTL_ONLY_ERROR };
  }

  if (tokens.length === 1) {
    return { kind: "help", lines: HELP_LINES };
  }

  return runDokictlCommand(tokens.slice(1));
}
