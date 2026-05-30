import { certificationDetails } from "@/lib/certifications-data";
import { educationRecords } from "@/lib/education-data";
import { experience, profile, projects, skillCategories } from "@/lib/profile";

export type ClusterResourceStatus = "Running" | "Ready" | "Complete";

export type ClusterResource = {
  id: string;
  namespace: string;
  kind: string;
  name: string;
  ready: string;
  status: ClusterResourceStatus;
  /** Short label on the 3D pod */
  podLabel: string;
  description: string;
  /** Current / primary workload */
  highlight?: boolean;
};

export function buildClusterResources(): ClusterResource[] {
  const currentRole = experience[0];
  const redHatCount = certificationDetails.filter(
    (c) => c.provider === "redhat",
  ).length;
  const skillCount = skillCategories.reduce(
    (n, cat) => n + cat.items.length,
    0,
  );
  const nodeName = profile.location
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return [
    {
      id: "platform",
      namespace: "platform",
      kind: "deployment",
      name: currentRole?.id ?? "workload",
      ready: "1/1",
      status: "Running",
      podLabel: currentRole?.id ?? "work",
      description: `${currentRole?.title ?? "Engineer"} @ ${currentRole?.company ?? "—"}`,
      highlight: true,
    },
    {
      id: "certs",
      namespace: "certs",
      kind: "statefulset",
      name: "redhat-trust-store",
      ready: `${redHatCount}/${redHatCount}`,
      status: "Ready",
      podLabel: "RHCA",
      description: `${redHatCount} Red Hat credentials on verify store`,
    },
    {
      id: "skills",
      namespace: "skills",
      kind: "configmap",
      name: "inventory",
      ready: `${skillCount}/${skillCount}`,
      status: "Ready",
      podLabel: "skills",
      description: `${skillCount} skills across ${skillCategories.length} categories`,
    },
    {
      id: "education",
      namespace: "education",
      kind: "job",
      name: "academic-records",
      ready: `${educationRecords.length}/${educationRecords.length}`,
      status: "Complete",
      podLabel: "ELTE",
      description: "BSc CS · Debrecen foundation · high school",
    },
    {
      id: "projects",
      namespace: "projects",
      kind: "deployment",
      name: "repos",
      ready: `${projects.length}/${projects.length}`,
      status: "Running",
      podLabel: "repos",
      description: `${projects.length} open-source projects on GitHub`,
    },
    {
      id: "infra",
      namespace: "infra",
      kind: "node",
      name: nodeName || "edge-node",
      ready: "1/1",
      status: "Ready",
      podLabel: "HU",
      description: profile.location,
    },
  ];
}

/** Orbit layout for the 3D mesh (one pod per cluster resource). */
export function clusterPodLayout(resources: ClusterResource[]) {
  const step = 360 / Math.max(resources.length, 1);
  return resources.map((resource, i) => ({
    resource,
    orbit: i * step,
  }));
}
