import { certificationDetails } from "@/lib/certifications-data";
import { educationRecords } from "@/lib/education-data";
import {
  experience,
  profile,
  projects,
  skillCategories,
} from "@/lib/profile";
export type MindMapTab =
  | "overview"
  | "experience"
  | "skills"
  | "certs"
  | "education"
  | "projects";

export type MindMapNodeGroup = "root" | "hub" | "leaf";

export type MindMapNode = {
  id: string;
  label: string;
  subtitle?: string;
  description: string;
  group: MindMapNodeGroup;
  x: number;
  y: number;
  /** Sync with dokictl status row */
  clusterId?: string;
  tab?: MindMapTab;
  href?: string;
  external?: boolean;
};

export type MindMapEdge = {
  from: string;
  to: string;
};

export type MindMapGraph = {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  width: number;
  height: number;
};

const CX = 480;
const CY = 340;
const HUB_RADIUS = 148;
const LEAF_RADIUS = 118;

function polar(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function leafPosition(
  hubAngle: number,
  index: number,
  total: number,
  spread = 28,
) {
  const offset =
    total <= 1 ? 0 : (index - (total - 1) / 2) * spread;
  return polar(CX, CY, HUB_RADIUS + LEAF_RADIUS, hubAngle + offset);
}

function addNode(
  nodes: MindMapNode[],
  edges: MindMapEdge[],
  node: MindMapNode,
  parentId: string,
) {
  nodes.push(node);
  edges.push({ from: parentId, to: node.id });
}

export function buildMindMapGraph(): MindMapGraph {
  const nodes: MindMapNode[] = [];
  const edges: MindMapEdge[] = [];

  const initials = profile.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  nodes.push({
    id: "root",
    label: initials,
    subtitle: profile.tagline,
    description: `${profile.name} · ${profile.location}`,
    group: "root",
    x: CX,
    y: CY,
    clusterId: "core",
  });

  const hubs: {
    id: string;
    label: string;
    angle: number;
    clusterId?: string;
    tab?: MindMapTab;
    description: string;
  }[] = [
    {
      id: "hub-experience",
      label: "Experience",
      angle: -90,
      clusterId: "platform",
      tab: "experience",
      description: `${experience.length} roles · platform engineering`,
    },
    {
      id: "hub-certs",
      label: "Certs",
      angle: -30,
      clusterId: "certs",
      tab: "certs",
      description: `${certificationDetails.length} Red Hat credentials`,
    },
    {
      id: "hub-skills",
      label: "Skills",
      angle: 30,
      clusterId: "skills",
      tab: "skills",
      description: `${skillCategories.reduce((n, c) => n + c.items.length, 0)} skills`,
    },
    {
      id: "hub-education",
      label: "Education",
      angle: 90,
      clusterId: "education",
      tab: "education",
      description: `${educationRecords.length} academic records`,
    },
    {
      id: "hub-projects",
      label: "Projects",
      angle: 150,
      clusterId: "projects",
      tab: "projects",
      description: `${projects.length} repositories`,
    },
    {
      id: "hub-terminal",
      label: "Terminal",
      angle: 210,
      tab: undefined,
      description: "Interactive dokictl shell",
    },
  ];

  for (const hub of hubs) {
    const pos = polar(CX, CY, HUB_RADIUS, hub.angle);
    nodes.push({
      id: hub.id,
      label: hub.label,
      description: hub.description,
      group: "hub",
      x: pos.x,
      y: pos.y,
      clusterId: hub.clusterId,
      tab: hub.tab,
    });
    edges.push({ from: "root", to: hub.id });
  }

  experience.forEach((role, i) => {
    const pos = leafPosition(-90, i, experience.length, 22);
    addNode(
      nodes,
      edges,
      {
        id: `role-${role.id}`,
        label: role.id,
        subtitle: role.company,
        description: `${role.title} · ${role.period}`,
        group: "leaf",
        x: pos.x,
        y: pos.y,
        clusterId: i === 0 ? "platform" : undefined,
        tab: "experience",
      },
      "hub-experience",
    );
  });

  const certLeaves = certificationDetails.filter((c) => c.highlight).slice(0, 1);
  const otherCertCount = certificationDetails.length - certLeaves.length;
  certLeaves.forEach((cert, i) => {
    const pos = leafPosition(-30, i, certLeaves.length + 1, 24);
    addNode(
      nodes,
      edges,
      {
        id: `cert-${cert.id}`,
        label: cert.acronym,
        subtitle: "Red Hat",
        description: cert.name,
        group: "leaf",
        x: pos.x,
        y: pos.y,
        clusterId: "certs",
        tab: "certs",
      },
      "hub-certs",
    );
  });
  if (otherCertCount > 0) {
    const pos = leafPosition(-30, certLeaves.length, certLeaves.length + 1, 24);
    addNode(
      nodes,
      edges,
      {
        id: "cert-more",
        label: `+${otherCertCount}`,
        subtitle: "RH",
        description: `${otherCertCount} more Red Hat credentials`,
        group: "leaf",
        x: pos.x,
        y: pos.y,
        clusterId: "certs",
        tab: "certs",
      },
      "hub-certs",
    );
  }

  const skillHubAngle = 30;
  skillCategories.forEach((cat, i) => {
    const short =
      cat.category.length > 12
        ? cat.category.split(/[\s/&]+/)[0]?.slice(0, 8) ?? cat.category
        : cat.category;
    const pos = leafPosition(skillHubAngle, i, skillCategories.length, 14);
    addNode(
      nodes,
      edges,
      {
        id: `skill-${i}`,
        label: short,
        subtitle: String(cat.items.length),
        description: cat.category,
        group: "leaf",
        x: pos.x,
        y: pos.y,
        clusterId: i === 0 ? "skills" : undefined,
        tab: "skills",
      },
      "hub-skills",
    );
  });

  educationRecords.forEach((edu, i) => {
    const short = edu.degree.includes("BSc")
      ? "ELTE BSc"
      : edu.degree.includes("Foundation")
        ? "Debrecen"
        : "High school";
    const pos = leafPosition(90, i, educationRecords.length, 22);
    addNode(
      nodes,
      edges,
      {
        id: `edu-${edu.id ?? i}`,
        label: short,
        subtitle: edu.detail,
        description: `${edu.school} · ${edu.period}`,
        group: "leaf",
        x: pos.x,
        y: pos.y,
        clusterId: i === 0 ? "education" : undefined,
        tab: "education",
      },
      "hub-education",
    );
  });

  projects.forEach((project, i) => {
    const pos = leafPosition(150, i, projects.length, 16);
    addNode(
      nodes,
      edges,
      {
        id: `project-${project.title}`,
        label: project.title,
        description: project.description,
        group: "leaf",
        x: pos.x,
        y: pos.y,
        clusterId: i === 0 ? "projects" : undefined,
        tab: "projects",
        href: project.url,
        external: true,
      },
      "hub-projects",
    );
  });

  const termPos = leafPosition(210, 0, 2, 32);
  addNode(
    nodes,
    edges,
    {
      id: "terminal-shell",
      label: "dokictl",
      subtitle: "shell",
      description: "Full interactive terminal on /terminal/",
      group: "leaf",
      x: termPos.x,
      y: termPos.y,
      href: "/terminal/",
    },
    "hub-terminal",
  );
  const logsPos = leafPosition(210, 1, 2, 32);
  addNode(
    nodes,
    edges,
    {
      id: "terminal-logs",
      label: "logs",
      subtitle: "blog",
      description: "Engineering notes",
      group: "leaf",
      x: logsPos.x,
      y: logsPos.y,
      href: "/logs/",
    },
    "hub-terminal",
  );

  const infraPos = polar(CX, CY, HUB_RADIUS + 52, 250);
  addNode(
    nodes,
    edges,
    {
      id: "node-location",
      label: "HU",
      subtitle: "infra",
      description: profile.location,
      group: "leaf",
      x: infraPos.x,
      y: infraPos.y,
      clusterId: "infra",
    },
    "root",
  );

  return { nodes, edges, width: 960, height: 680 };
}

export function nodeMatchesClusterSelection(
  node: MindMapNode,
  selectedClusterId: string | null,
): boolean {
  if (!selectedClusterId) return false;
  if (node.clusterId === selectedClusterId) return true;
  if (selectedClusterId === "core" && node.id === "root") return true;
  return false;
}

export const TAB_HASH: Record<MindMapTab, string> = {
  overview: "top",
  experience: "experience",
  skills: "skills",
  certs: "certs",
  education: "education",
  projects: "projects",
};

export function navigateHomeTab(tab: MindMapTab) {
  window.history.replaceState(null, "", `/#${TAB_HASH[tab]}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
