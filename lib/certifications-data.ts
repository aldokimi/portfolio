export type CertTier =
  | "architect"
  | "engineer"
  | "administrator"
  | "specialist"
  | "developer";

/** Issuer for a credential (extend when adding non–Red Hat certs). */
export type CertProvider = "redhat";

export type CertificationDetail = {
  id: string;
  provider: CertProvider;
  name: string;
  /** Short label shown in the list (matches Red Hat credential / exam shorthand). */
  acronym: string;
  examCode?: string;
  validUntil: string;
  earnedDate?: string;
  highlight?: boolean;
  tier: CertTier;
  /** Products / platforms listed on the credential (exam stack). */
  technologies: string[];
  /** Practical tools, patterns, and topics covered by the exam or credential. */
  technologiesLearned: string[];
  /** Official-style exam / credential description (Red Hat training & verification). */
  summary: string;
  skills: string[];
  outcomes: string[];
};

const EX294_LEARNED = [
  "Ansible",
  "Ansible playbooks",
  "Roles & collections",
  "Jinja2",
  "Ansible Vault",
  "systemd",
  "firewalld",
  "SELinux",
  "LVM",
  "NFS",
  "containers",
  "Podman",
] as const;

const EX280_LEARNED = [
  "Kubernetes",
  "OpenShift",
  "Deployments",
  "Routes & Ingress",
  "Services",
  "ConfigMaps & Secrets",
  "Builds & image streams",
  "HPA",
  "Projects & quotas",
  "NetworkPolicies",
  "Persistent volumes",
  "Operators",
] as const;

export const RED_HAT_VERIFICATION = {
  certId: "240-201-996",
  owner: "Mohammed Nabeil Abdo Ahmed Al-Dokimi",
  url: "https://rhtapps.redhat.com/verify?certId=240-201-996",
} as const;

/**
 * Credentials aligned with Red Hat Certification Central (verify ID 240-201-996)
 * and official exam pages on redhat.com.
 */
export const certificationDetails: CertificationDetail[] = [
  {
    id: "rhca-rhel",
    provider: "redhat",
    name: "Red Hat Certified Architect in Enterprise Linux",
    acronym: "RHCA",
    validUntil: "May 26, 2028",
    earnedDate: "Feb 11, 2026",
    highlight: true,
    tier: "architect",
    technologies: [],
    technologiesLearned: [
      "Linux architecture",
      "Ansible automation",
      "OpenShift platforms",
      "GitOps",
      "CI/CD",
      "Infrastructure as Code",
      "Security hardening",
      "High availability",
    ],
    summary:
      "Red Hat’s architect-level credential in the Enterprise Linux track. It reflects a portfolio of current, higher-level Red Hat certifications and validates breadth across RHEL, automation, and related platforms.",
    skills: [
      "Cross-domain Linux architecture",
      "Enterprise automation design",
      "Platform integration planning",
      "Operational security and compliance",
    ],
    outcomes: [
      "Design multi-layer RHEL-based solutions",
      "Align automation and platform choices with business requirements",
      "Lead complex migration and hardening initiatives",
    ],
  },
  {
    id: "rhcsa",
    provider: "redhat",
    name: "Red Hat Certified System Administrator",
    acronym: "RHCSA",
    examCode: "EX200",
    validUntil: "Feb 11, 2029",
    earnedDate: "Jan 10, 2025",
    tier: "administrator",
    technologies: ["Red Hat Enterprise Linux 9"],
    technologiesLearned: [
      "RHEL",
      "systemd",
      "firewalld",
      "SELinux",
      "LVM",
      "Stratis",
      "NFS",
      "SSH",
      "sudo",
      "Podman",
      "containers",
      "bash",
    ],
    summary:
      "EX200 is the performance-based RHCSA exam. It tests core system administration skills common across environments and forms the foundation for other Red Hat certifications.",
    skills: [
      "Installation and disk management",
      "Networking, firewalld, and SELinux",
      "Users, groups, and permissions",
      "systemd services and containers (Podman)",
    ],
    outcomes: [
      "Administer RHEL systems in production",
      "Recover from common boot and storage issues",
      "Implement baseline host security",
    ],
  },
  {
    id: "rhce-aap",
    provider: "redhat",
    name: "Red Hat Certified Engineer in Ansible",
    acronym: "RHCE-AAP",
    examCode: "EX294",
    validUntil: "Feb 11, 2029",
    earnedDate: "May 28, 2025",
    tier: "engineer",
    technologies: ["Ansible Automation Platform 2.2", "Red Hat Enterprise Linux 9"],
    technologiesLearned: [...EX294_LEARNED],
    summary:
      "Engineer credential in the Ansible track, earned by passing EX294. That performance-based exam tests your ability to use Red Hat Ansible Automation Platform to automate system administration tasks across RHEL.",
    skills: [
      "Ansible playbooks, roles, and collections",
      "Variables, templates, and Vault",
      "Automating RHEL configuration and services",
      "Troubleshooting playbook runs",
    ],
    outcomes: [
      "Automate repeatable administration at scale",
      "Build maintainable role-based content",
      "Integrate Ansible into operational workflows",
    ],
  },
  {
    id: "rhce-rhel",
    provider: "redhat",
    name: "Red Hat Certified Engineer in Enterprise Linux",
    acronym: "RHCE-RHEL",
    examCode: "EX294",
    validUntil: "Feb 11, 2029",
    earnedDate: "May 28, 2025",
    tier: "engineer",
    technologies: ["Ansible Automation Platform 2.2", "Red Hat Enterprise Linux 9"],
    technologiesLearned: [...EX294_LEARNED],
    summary:
      "Engineer credential in the Enterprise Linux track, also earned via EX294. The same hands-on exam validates Ansible automation skills that extend advanced RHEL administration.",
    skills: [
      "Advanced RHEL administration",
      "Service and storage management",
      "Security controls on RHEL",
      "Ansible-driven operations",
    ],
    outcomes: [
      "Operate production RHEL systems under change",
      "Apply automation to reduce manual administration",
      "Meet reliability targets for Linux infrastructure",
    ],
  },
  {
    id: "rhce-ocp",
    provider: "redhat",
    name: "Red Hat Certified Engineer in OpenShift",
    acronym: "RHCE-OCP",
    examCode: "EX380",
    validUntil: "Feb 04, 2029",
    earnedDate: "Feb 04, 2026",
    tier: "engineer",
    technologies: ["Red Hat OpenShift Container Platform 4.14"],
    technologiesLearned: [
      ...EX280_LEARNED,
      "GitOps",
      "Argo CD",
      "Helm",
      "Kustomize",
      "Custom Resource Definitions",
      "Cluster integration",
      "CI/CD pipelines",
      "Multi-cluster management",
    ],
    summary:
      "Engineer credential in the OpenShift track, earned via EX380 (Red Hat Certified Specialist in OpenShift Automation and Integration). The exam tests skills to plan, implement, and manage OpenShift automation and integration at scale.",
    skills: [
      "OpenShift GitOps and CI/CD integration",
      "Operators and custom resources",
      "Multi-cluster and platform automation",
      "Helm and manifest lifecycle",
    ],
    outcomes: [
      "Automate large-scale OpenShift deployments",
      "Integrate clusters with enterprise tooling",
      "Troubleshoot platform-level automation failures",
    ],
  },
  {
    id: "rhcs-win-ansible",
    provider: "redhat",
    name: "Red Hat Certified Specialist in Microsoft Windows Automation with Ansible",
    acronym: "RHCS",
    examCode: "EX417",
    validUntil: "Feb 11, 2029",
    earnedDate: "Feb 11, 2026",
    tier: "specialist",
    technologies: ["Ansible Automation Platform 2.4"],
    technologiesLearned: [
      "Ansible",
      "WinRM",
      "Windows modules",
      "Inventory plugins",
      "Credential plugins",
      "Patch management",
      "Software deployment",
      "Hybrid automation",
      "Job templates",
    ],
    summary:
      "EX417 is a performance-based specialist exam for automating Microsoft Windows hosts with Ansible Automation Platform, including configuration, software deployment, and ongoing management via WinRM.",
    skills: [
      "Windows inventory and credentials",
      "WinRM connectivity",
      "Windows-specific Ansible modules",
      "Patching and configuration baselines",
    ],
    outcomes: [
      "Automate Windows server fleets with Ansible",
      "Standardize Windows configuration at scale",
      "Run hybrid Linux/Windows automation jobs from AAP",
    ],
  },
  {
    id: "rhcasa-aap",
    provider: "redhat",
    name: "Red Hat Certified Advanced System Administrator in Ansible",
    acronym: "RHCASA-AAP",
    examCode: "EX294",
    validUntil: "Feb 11, 2029",
    earnedDate: "May 28, 2025",
    tier: "administrator",
    technologies: ["Ansible Automation Platform 2.2", "Red Hat Enterprise Linux 9"],
    technologiesLearned: [...EX294_LEARNED],
    summary:
      "Advanced administrator credential in Ansible, earned through EX294. The exam focuses on writing Ansible playbooks to manage systems and perform common administration tasks with Red Hat Ansible Automation Platform.",
    skills: [
      "Complex playbook design",
      "Roles, handlers, and conditionals",
      "Content signing and automation workflows",
      "Managing systems at scale with Ansible",
    ],
    outcomes: [
      "Execute advanced automation on RHEL estates",
      "Structure automation for teams and reuse",
      "Diagnose and fix automation failures",
    ],
  },
  {
    id: "rhcasa-ocp",
    provider: "redhat",
    name: "Red Hat Certified Advanced System Administrator in OpenShift",
    acronym: "RHCASA-OCP",
    examCode: "EX280",
    validUntil: "Feb 04, 2029",
    earnedDate: "Feb 04, 2026",
    tier: "administrator",
    technologies: ["Red Hat OpenShift Container Platform 4.14"],
    technologiesLearned: [
      ...EX280_LEARNED,
      "RBAC",
      "etcd backups",
      "Cluster upgrades",
      "Monitoring",
      "Troubleshooting",
    ],
    summary:
      "Advanced OpenShift administrator credential. EX280 tests your ability to create, configure, and manage a cloud application platform with Red Hat OpenShift Container Platform.",
    skills: [
      "Cluster configuration and day-2 operations",
      "Projects, quotas, and networking",
      "Application deployment and routing",
      "Storage, security, and troubleshooting",
    ],
    outcomes: [
      "Run production OpenShift clusters for multiple teams",
      "Deploy and operate workloads on OCP",
      "Resolve cluster and application incidents",
    ],
  },
  {
    id: "rhcd-ai",
    provider: "redhat",
    name: "Red Hat Certified Developer in AI",
    acronym: "RHCD-AI",
    examCode: "EX267",
    validUntil: "Jan 23, 2029",
    earnedDate: "Jan 23, 2026",
    tier: "developer",
    technologies: [
      "Red Hat OpenShift AI 2.8",
      "Red Hat OpenShift Container Platform 4.14",
    ],
    technologiesLearned: [
      "OpenShift AI",
      "Kubeflow",
      "Model serving",
      "Notebooks",
      "GPU scheduling",
      "Data connections",
      "ML pipelines",
      "KServe",
      "MLOps",
      "Kubernetes",
    ],
    summary:
      "EX267 (Red Hat Certified Specialist in OpenShift AI) tests skills to deploy, manage, and integrate AI/ML workloads on Red Hat OpenShift AI. Passing also awards the RHCD in AI credential.",
    skills: [
      "OpenShift AI workspaces and serving",
      "Model deployment workflows",
      "Data connections and pipelines",
      "Resource and GPU scheduling basics",
    ],
    outcomes: [
      "Deploy and serve models on OpenShift AI",
      "Connect data sources to ML workflows",
      "Operate AI workloads on shared clusters",
    ],
  },
  {
    id: "rhcd-cna",
    provider: "redhat",
    name: "Red Hat Certified Developer in Cloud-native Applications",
    acronym: "RHCD-CnA",
    examCode: "EX188",
    validUntil: "May 26, 2028",
    earnedDate: "May 26, 2025",
    tier: "developer",
    technologies: ["Podman 4"],
    technologiesLearned: [
      "Podman",
      "Containerfiles",
      "Image registries",
      "Rootless containers",
      "Volumes & networking",
      "systemd",
      "Kubernetes basics",
      "OCI images",
    ],
    summary:
      "EX188 tests fundamentals of containers on RHEL: finding, customizing, running, and managing containerized services with Podman in stand-alone environments (applicable across OCP 4.x).",
    skills: [
      "Containerfiles and image builds",
      "Podman run, networks, and volumes",
      "Rootless containers",
      "Registry push and image management",
    ],
    outcomes: [
      "Build and run containers on RHEL",
      "Publish images to registries securely",
      "Prepare for Kubernetes/OpenShift development",
    ],
  },
  {
    id: "rhcsa-ocp",
    provider: "redhat",
    name: "Red Hat Certified System Administrator in OpenShift",
    acronym: "RHCSA-OCP",
    examCode: "EX280",
    validUntil: "Nov 05, 2028",
    earnedDate: "Nov 05, 2025",
    tier: "administrator",
    technologies: ["Red Hat OpenShift Container Platform 4.14"],
    technologiesLearned: [...EX280_LEARNED],
    summary:
      "OpenShift-focused RHCSA credential from EX280. The exam evaluates skills to configure and manage OpenShift as a cloud application platform, including projects, applications, and cluster operations.",
    skills: [
      "Projects, deployments, and routes",
      "ConfigMaps, secrets, and services",
      "Builds and image streams",
      "Monitoring and basic troubleshooting",
    ],
    outcomes: [
      "Deploy applications on OpenShift",
      "Manage developer-facing platform resources",
      "Support day-2 application operations on OCP",
    ],
  },
];
