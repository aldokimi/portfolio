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

export type SkillCategory = {
  category: string;
  items: string[];
};

export type Certification = {
  name: string;
  validUntil: string;
  highlight?: boolean;
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  period: string;
  detail?: string;
};

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
    title: "Software Engineer",
    location: "Budapest, Hungary",
    period: "Feb 2026 – present",
    summary:
      "Microservices, AI-assisted platform features, and cost-aware AWS architecture on the Genesys core platform.",
    stack: ["Go", "Java", "Python", "AWS", "Kubernetes"],
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
    title: "Software Developer",
    location: "Budapest, Hungary",
    period: "Jan 2024 – Feb 2026",
    summary:
      "Go/Python backends and automation against OpenStack & Kubernetes with IaC, CI/CD, and security hardening.",
    stack: ["Go", "Python", "Terraform", "OpenShift", "Jenkins"],
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
    title: "Software Developer",
    location: "Budapest, Hungary",
    period: "Aug 2021 – Jan 2024",
    summary:
      "Telco cloud security, Nokia CloudBand/NCS, and OpenStack/Kubernetes integration with automated CI/CD.",
    stack: ["Python", "Go", "Kubernetes", "OpenStack", "Jenkins"],
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
      "Python",
      "Go",
      "Java",
      "C/C++",
      "Rust",
      "JavaScript",
      "TypeScript",
      "Haskell",
      "PowerShell",
      "PHP",
      "Bash",
    ],
  },
  {
    category: "Backend & Frameworks",
    items: [
      "Spring Boot",
      "Gin",
      "Flask",
      "FastAPI",
      "Django",
      "Laravel",
      "Angular",
      "REST",
      "GraphQL",
      "gRPC",
      "MariaDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Microservices",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS",
      "GCP",
      "OpenStack",
      "Kubernetes",
      "OpenShift",
      "Docker",
      "Terraform",
      "Ansible",
      "RHEL",
      "Helm",
      "Kustomize",
      "K8s Operators",
      "Kubebuilder",
      "ArgoCD",
      "Velero",
    ],
  },
  {
    category: "Tools and Technologies",
    items: [
      "RabbitMQ",
      "Nginx",
      "HAProxy",
      "Load Balancers",
      "LDAP",
      "Apache",
      "OpenID Connect (OIDC)",
    ],
  },
  {
    category: "Security",
    items: [
      "Tenable",
      "Anchor",
      "Nmap",
      "Pen Testing",
      "Vulnerability Assessment",
      "IAM / IdM",
      "CIS-CAT",
      "Security Hardening",
      "HashiCorp Vault",
      "Firewalls",
    ],
  },
  {
    category: "AI/ML",
    items: [
      "TensorFlow",
      "PyTorch",
      "vLLM",
      "Red Hat AI",
      "llama.cpp",
      "MCP Servers",
      "AI Agents",
      "Kubeflow",
      "Hugging Face",
      "Ray",
      "InstructLab",
      "NVIDIA CUDA",
    ],
  },
  {
    category: "Collaboration & Methodologies",
    items: [
      "Agile/Scrum",
      "Kanban",
      "Git",
      "GitHub",
      "GitLab",
      "Gerrit",
      "Bitbucket",
      "Jira",
      "Confluence",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Red Hat Certified Architect in Infrastructure (RHCA)",
    validUntil: "May 2028",
    highlight: true,
  },
  {
    name: "Red Hat Certified Specialist in OpenShift Automation and Integration",
    validUntil: "Feb 2029",
  },
  {
    name: "Red Hat Certified Specialist in Windows Automation with Ansible",
    validUntil: "Feb 2029",
  },
  {
    name: "Red Hat Certified Specialist in OpenShift AI",
    validUntil: "Jan 2029",
  },
  {
    name: "Red Hat Certified Engineer (RHCE)",
    validUntil: "Feb 2029",
  },
  {
    name: "Red Hat Certified System Administrator (RHCSA)",
    validUntil: "Feb 2029",
  },
  {
    name: "Red Hat Certified OpenShift Administrator",
    validUntil: "Nov 2028",
  },
  {
    name: "Red Hat Certified Specialist in Containers",
    validUntil: "May 2028",
  },
];

export const education: Education[] = [
  {
    degree: "BSc in Computer Science",
    school: "Eötvös Loránd University (ELTE)",
    location: "Budapest, Hungary",
    period: "Feb 2020 – Feb 2023",
    detail: "GPA: 4.54/5",
  },
];

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
