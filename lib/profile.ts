import { certificationDetails } from "@/lib/certifications-data";
import { educationRecords, type EducationRecord } from "@/lib/education-data";

export type ProfileLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  title: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export type SkillItem = {
  name: string;
  description: string;
};

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};

function sk(name: string, description: string): SkillItem {
  return { name, description };
}

export type Certification = {
  name: string;
  validUntil: string;
  highlight?: boolean;
};

/** Simple list derived from certificationDetails (see Certifications tab for full data). */
export const certifications: Certification[] = certificationDetails.map(
  (cert) => ({
    name: cert.name,
    validUntil: cert.validUntil,
    highlight: cert.highlight,
  }),
);

export type Education = Pick<
  EducationRecord,
  "degree" | "school" | "location" | "period" | "detail"
>;

export type Project = {
  title: string;
  description: string;
  stack: string[];
  url: string;
};

export const profile = {
  name: "Mohammed Al-Dokimi",
  tagline: "Software Engineer",
  location: "Budapest, Hungary",
  bio: "Software Engineer with deep expertise in Golang and Python, specializing in building scalable automation tools and microservices for cloud environments. Proven track record in creating backends and integrating microservices and new features in large codebases. Outside of work, I teach imperative programming using the C programming language. I thrive in dynamic, collaborative environments and aspire to advance in my engineering journey, driving innovation and delivering meaningful impact.",
  links: [
    { label: "Email", href: "mailto:mo.aldokimi@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohammed-al-dokimi-98ba411a5",
      external: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/aldokimi",
      external: true,
    },
    {
      label: "Streamlit apps",
      href: "https://aldokimi.streamlit.app/",
      external: true,
    },
    { label: "Phone", href: "tel:+36301589147" },
  ] satisfies ProfileLink[],
};

export const experience: ExperienceEntry[] = [
  {
    id: "genesys",
    company: "Genesys",
    title: "Software Engineer - Platform Engineer/AI Engineer",
    location: "Budapest, Hungary",
    period: "Feb 2026 – present",
    summary:
      "Microservices, AI-assisted platform features, and cost-aware AWS architecture on the Genesys core platform.",
    stack: [
      "Go",
      "Python",
      "Java",
      "TypeScript",
      "AWS",
      "AI Agents",
      "Platform Engineering",
    ],
    bullets: [
      "Designing and optimizing high-performance microservices and RESTful APIs to enhance the scalability and efficiency of the Genesys core platform using Go, Java, Python, and others.",
      "Developing and integrating AI-powered features into the platform to automate operational workflows and improve system-wide diagnostic capabilities.",
      "Architecting and implementing scalable cloud-native solutions on AWS, focusing on resource optimization and cost-efficient infrastructure management.",
      "Building advanced automation tools and internal developer platforms to streamline microservice deployment and enhance cross-team developer experience (DX).",
      "Managing platform resilience and performance tuning through deep-dive analysis of distributed systems and high-throughput data pipelines.",
    ],
  },
  {
    id: "redhat",
    company: "Red Hat",
    title: "Software Developer - Cloud Security Engineer",
    location: "Budapest, Hungary",
    period: "Jan 2024 – Feb 2026",
    summary:
      "Go/Python backends and automation against OpenStack & Kubernetes with IaC, CI/CD, and security hardening.",
    stack: [
      "Go",
      "Python",
      "Ansible",
      "OpenShift",
      "OpenStack",
      "K8s",
      "Security",
      "IaaS",
    ],
    bullets: [
      "Developing and integrating backend, microservices, RESTful APIs, and automation tools with Golang and Python.",
      "Developing and integrating backends to interact with OpenStack and Kubernetes services through RESTful APIs.",
      "Designing and implementing secure, scalable Infrastructure as Code (IaC) and Container as a Service (CaaS) platforms using Terraform, Ansible, OpenStack, and Kubernetes.",
      "Building CI/CD pipelines (Jenkins, Git) to automate testing, deployment, and security operations.",
      "Implementing security hardening and enforcing compliance.",
      "Managing vulnerability assessments and automating security policies.",
    ],
  },
  {
    id: "nokia",
    company: "Nokia",
    title: "Software Developer - Cloud Security Engineer",
    location: "Budapest, Hungary",
    period: "Aug 2021 – Jan 2024",
    summary:
      "Telco cloud security, Nokia CloudBand/NCS, and OpenStack/Kubernetes integration with automated CI/CD.",
    stack: ["Python", "Ansible", "Security", "OpenStack", "K8s", "Containers"],
    bullets: [
      "Designing and developing core security features, hardening Linux systems, ensuring Kubernetes cluster security, and tuning cloud infrastructure to ensure end-to-end system integrity.",
      "Architecting identity management systems and automated security policies to mitigate vulnerabilities and enforce robust security standards across the platform.",
      "Architecting and maintaining Telco Cloud infrastructure, specifically focused on Nokia CloudBand (CBIS/CBAM) and Nokia Container Services (NCS).",
      "Integrating cloud-native platforms with OpenStack and Kubernetes to meet the high-availability and low-latency requirements of telecommunications providers.",
      "Building automated CI/CD pipelines (Jenkins, Git) for continuous integration, validation, and security of the systems.",
    ],
  },
  {
    id: "elte",
    company: "Eötvös Loránd University (ELTE)",
    title: "Teaching / Research assistant / Senior Demonstrator",
    location: "Budapest, Hungary",
    period: "Feb 2021 – present",
    summary:
      "Teaching Java to imperative C; quantum simulation research; leading demonstrator training.",
    stack: ["C", "C++", "Python", "Qiskit", "Java"],
    bullets: [
      "Teaching various courses, from Java Programming to OOP using C++ and currently Imperative Programming using C programming.",
      "Contributing to quantum research using Python, GROQ GPUs, and Qiskit for quantum simulation.",
      "Playing the role of senior demonstrator, leading sessions and training courses for new demonstrators and teachers.",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      sk(
        "Python",
        "General-purpose language for APIs, automation, data work, and ML tooling.",
      ),
      sk(
        "Go",
        "Statically typed language for concurrent services, CLIs, and cloud-native backends.",
      ),
      sk(
        "Java",
        "Enterprise JVM language for large backends, integrations, and platform services.",
      ),
      sk(
        "C/C++",
        "Systems languages for performance-critical code, teaching, and low-level tooling.",
      ),
      sk(
        "Rust",
        "Memory-safe systems language for reliable, high-performance infrastructure code.",
      ),
      sk(
        "JavaScript",
        "Runtime language for web UIs, scripting, and full-stack application logic.",
      ),
      sk(
        "TypeScript",
        "Typed superset of JavaScript for safer frontends and Node-based services.",
      ),
      sk(
        "Haskell",
        "Pure functional language emphasizing correctness and strong type systems.",
      ),
      sk(
        "PowerShell",
        "Shell and scripting language for Windows automation and hybrid ops tasks.",
      ),
      sk("PHP", "Scripting language common in web backends and CMS ecosystems."),
      sk(
        "Bash",
        "Unix shell for glue scripts, CI steps, and day-to-day operator workflows.",
      ),
    ],
  },
  {
    category: "Backend & Frameworks",
    items: [
      sk(
        "Spring Boot",
        "Java framework for production REST services and enterprise integrations.",
      ),
      sk("Gin", "Lightweight Go HTTP framework for fast APIs and microservices."),
      sk("Flask", "Minimal Python web framework for small APIs and prototypes."),
      sk(
        "FastAPI",
        "Modern Python ASGI framework with automatic OpenAPI and validation.",
      ),
      sk(
        "Django",
        "Batteries-included Python framework for full web apps and admin UIs.",
      ),
      sk("Laravel", "PHP framework for rapid web application development."),
      sk(
        "Angular",
        "TypeScript frontend framework for large structured single-page apps.",
      ),
      sk(
        "REST",
        "Resource-oriented HTTP API style for interoperable service contracts.",
      ),
      sk(
        "GraphQL",
        "Query language and runtime letting clients request exactly the data they need.",
      ),
      sk(
        "gRPC",
        "High-performance RPC framework using Protocol Buffers over HTTP/2.",
      ),
      sk("MariaDB", "Open-source relational database compatible with MySQL workloads."),
      sk(
        "PostgreSQL",
        "Advanced open-source RDBMS with strong SQL, extensions, and reliability.",
      ),
      sk("MySQL", "Widely deployed relational database for web and business apps."),
      sk(
        "Redis",
        "In-memory data store used for caching, queues, and fast key-value access.",
      ),
      sk(
        "Microservices",
        "Architecture of small, independently deployable services with clear boundaries.",
      ),
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      sk(
        "AWS",
        "Amazon's public cloud for compute, storage, networking, and managed services.",
      ),
      sk(
        "GCP",
        "Google Cloud Platform for Kubernetes-native and data-heavy workloads.",
      ),
      sk(
        "OpenStack",
        "Open-source private cloud stack for VMs, networking, and object storage.",
      ),
      sk(
        "Kubernetes",
        "Container orchestrator for scheduling, scaling, and operating workloads.",
      ),
      sk(
        "OpenShift",
        "Red Hat Kubernetes distribution with developer tooling and enterprise ops.",
      ),
      sk(
        "Docker",
        "Container packaging and runtime for consistent deployable application images.",
      ),
      sk(
        "Terraform",
        "Declarative IaC tool for provisioning cloud and platform resources.",
      ),
      sk(
        "Ansible",
        "Agentless automation for configuration management and repeatable deployments.",
      ),
      sk(
        "RHEL",
        "Red Hat Enterprise Linux — supported Linux for servers and OpenShift nodes.",
      ),
      sk(
        "Helm",
        "Package manager for templating and releasing apps on Kubernetes.",
      ),
      sk(
        "Kustomize",
        "Kubernetes-native way to customize manifests without templating.",
      ),
      sk(
        "K8s Operators",
        "Controllers that encode operational knowledge for complex stateful apps.",
      ),
      sk(
        "Kubebuilder",
        "SDK for building Kubernetes APIs and operators in Go.",
      ),
      sk(
        "ArgoCD",
        "GitOps continuous delivery controller for Kubernetes clusters.",
      ),
      sk(
        "Velero",
        "Backup and disaster-recovery tool for Kubernetes resources and volumes.",
      ),
    ],
  },
  {
    category: "Tools and Technologies",
    items: [
      sk(
        "RabbitMQ",
        "Message broker for reliable async messaging between distributed services.",
      ),
      sk(
        "Nginx",
        "High-performance web server, reverse proxy, and load balancer.",
      ),
      sk(
        "HAProxy",
        "Layer 4/7 load balancer for routing traffic with health checks.",
      ),
      sk(
        "Load Balancers",
        "Traffic distribution across instances for availability and scale.",
      ),
      sk(
        "LDAP",
        "Directory protocol for centralized authentication and identity data.",
      ),
      sk(
        "Apache",
        "Long-standing HTTP server and ecosystem for web hosting.",
      ),
      sk(
        "OpenID Connect (OIDC)",
        "Identity layer on OAuth 2.0 for SSO and modern app authentication.",
      ),
    ],
  },
  {
    category: "Security",
    items: [
      sk(
        "Tenable",
        "Vulnerability management platform for scanning and prioritizing risk.",
      ),
      sk(
        "Anchor",
        "Security tooling context (organization-specific scanning/compliance workflows).",
      ),
      sk(
        "Nmap",
        "Network scanner for host discovery, port mapping, and service fingerprinting.",
      ),
      sk(
        "Pen Testing",
        "Simulated attacks to find exploitable weaknesses before adversaries do.",
      ),
      sk(
        "Vulnerability Assessment",
        "Systematic review of systems for known security flaws and misconfigurations.",
      ),
      sk(
        "IAM / IdM",
        "Identity and access management — who can do what, and how accounts lifecycle.",
      ),
      sk(
        "CIS-CAT",
        "Tooling aligned with CIS benchmarks for configuration compliance checks.",
      ),
      sk(
        "Security Hardening",
        "Reducing attack surface via secure defaults, patching, and least privilege.",
      ),
      sk(
        "HashiCorp Vault",
        "Secrets management for dynamic credentials, encryption, and audit.",
      ),
      sk(
        "Firewalls",
        "Network controls that filter traffic by policy between trust zones.",
      ),
    ],
  },
  {
    category: "AI/ML",
    items: [
      sk(
        "TensorFlow",
        "Google's ML framework for training and serving neural network models.",
      ),
      sk(
        "PyTorch",
        "Flexible deep-learning framework popular in research and production.",
      ),
      sk(
        "vLLM",
        "High-throughput serving engine for large language model inference.",
      ),
      sk(
        "Red Hat AI",
        "Red Hat's portfolio for running and operationalizing AI on OpenShift.",
      ),
      sk(
        "llama.cpp",
        "Efficient C++ inference for LLaMA-family models on CPU/GPU.",
      ),
      sk(
        "MCP Servers",
        "Model Context Protocol hosts that expose tools and data to AI agents.",
      ),
      sk(
        "AI Agents",
        "Autonomous or semi-autonomous software that plans and acts with LLM reasoning.",
      ),
      sk(
        "Kubeflow",
        "Kubernetes-native platform for ML pipelines, training, and serving.",
      ),
      sk(
        "Hugging Face",
        "Hub and libraries for pretrained models, datasets, and transformers.",
      ),
      sk(
        "Ray",
        "Distributed runtime for scaling Python ML training and hyperparameter search.",
      ),
      sk(
        "InstructLab",
        "Red Hat–backed workflow for improving open LLMs with synthetic data.",
      ),
      sk(
        "NVIDIA CUDA",
        "Parallel computing platform for GPU-accelerated ML and HPC workloads.",
      ),
    ],
  },
  {
    category: "Collaboration & Methodologies",
    items: [
      sk(
        "Agile/Scrum",
        "Iterative delivery with sprints, ceremonies, and cross-functional teams.",
      ),
      sk(
        "Kanban",
        "Flow-based work management limiting WIP and visualizing bottlenecks.",
      ),
      sk(
        "Git",
        "Distributed version control for branching, review, and release history.",
      ),
      sk("GitHub", "Git hosting with PRs, Actions CI, and open-source collaboration."),
      sk(
        "GitLab",
        "DevOps platform combining Git, CI/CD, and integrated security scanning.",
      ),
      sk(
        "Gerrit",
        "Code review system with patch sets, often used in large enterprise flows.",
      ),
      sk("Bitbucket", "Atlassian Git hosting integrated with Jira and CI pipelines."),
      sk(
        "Jira",
        "Issue tracker for agile planning, backlogs, and delivery visibility.",
      ),
      sk(
        "Confluence",
        "Team wiki for specs, runbooks, and project documentation.",
      ),
    ],
  },
];

/** Summary list for components that only need degree metadata. */
export const education: Education[] = educationRecords.map(
  ({ degree, school, location, period, detail }) => ({
    degree,
    school,
    location,
    period,
    detail,
  }),
);

export const projects: Project[] = [
  {
    title: "OSPA",
    description:
      "Go-based policy agent for OpenStack — scans resources against YAML rules, outputs audit findings, optional remediation.",
    stack: ["Go", "OpenStack", "YAML"],
    url: "https://github.com/aldokimi/OSPA",
  },
  {
    title: "MVCS",
    description:
      "Decentralized version control for small teams — simpler workflow than full Git for lightweight projects.",
    stack: ["Python"],
    url: "https://github.com/aldokimi/MVCS",
  },
  {
    title: "prompt-guard-MCP",
    description: "MCP server for prompt-guard patterns and tooling.",
    stack: ["TypeScript", "MCP"],
    url: "https://github.com/aldokimi/prompt-guard-MCP",
  },
  {
    title: "portfolio",
    description:
      "This site — Next.js on Cloudflare Workers, D1 blog, terminal-themed CV.",
    stack: ["Next.js", "D1", "OpenNext"],
    url: "https://github.com/aldokimi/portfolio",
  },
  {
    title: "API-Builder",
    description: "Creates interactive RESTful APIs from your data.",
    stack: ["Python"],
    url: "https://github.com/aldokimi/API-Builder",
  },
];
