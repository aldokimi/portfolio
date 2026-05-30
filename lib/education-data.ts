/**
 * Education records and ELTE PTI BSc curriculum (2018 English track).
 * Curriculum aligned with:
 * https://www.inf.elte.hu/dstore/document/225452/PTI_BSc_angol_h%C3%A1l%C3%B3_honlapra%20%202026%20m%C3%A1rcius.pdf
 */

export type EducationRecord = {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  detail?: string;
  summary?: string;
  highlights?: string[];
  url?: string;
  /** When set, the Education tab shows the interactive curriculum explorer. */
  curriculumId?: string;
};

export type CurriculumSemester = 1 | 2 | 3 | 4 | 5 | 6 | "thesis";

export type CurriculumCategory = "core" | "math" | "cs" | "thesis";

export type CurriculumSubject = {
  id: string;
  code: string;
  name: string;
  semester: CurriculumSemester;
  /** Weekly contact hours (lecture + practice + lab + consultation). */
  schedule: string;
  category: CurriculumCategory;
  description: string;
  prerequisites?: string[];
};

export const ELTE_BSC_CURRICULUM_URL =
  "https://www.elte.hu/en/computer-science-bsc";

export const DEBRECEN_FOUNDATION_URL =
  "https://edu.unideb.hu/p/international-foundation-year";

export const educationRecords: EducationRecord[] = [
  {
    id: "elte-bsc",
    degree: "BSc in Computer Science",
    school: "Eötvös Loránd University (ELTE)",
    location: "Budapest, Hungary",
    period: "Feb 2020 – Feb 2023",
    detail: "GPA: 4.54/5",
    summary:
      "Computer Science BSc (2018 curriculum, English). Six-semester program covering programming, systems, databases, and theory.",
    url: ELTE_BSC_CURRICULUM_URL,
    curriculumId: "elte-pti-bsc-2018",
  },
  {
    id: "debrecen-foundation",
    degree: "International Foundation Year (Engineering track)",
    school: "University of Debrecen",
    location: "Debrecen, Hungary",
    period: "Sep 2019 – Feb 2020",
    detail: "GPA: 4/5",
    summary:
      "Preparatory semester bridging high school and university-level engineering, with intensive English and science foundations.",
    url: DEBRECEN_FOUNDATION_URL,
    highlights: [
      "Mathematics, physics, chemistry, and biology foundations",
      "IT skills and academic English",
      "Hungarian language for foreign students",
      "Information Technology specialization toward engineering programs",
    ],
  },
  {
    id: "highschool",
    degree: "High school diploma",
    school: "Jamal Abdulnaser High School for Outstanding Students",
    location: "Sana'a, Yemen",
    period: "2015 – 2018",
    detail: "GPA: 96.57%",
    summary:
      "Graduated among the top students nationally from a selective high school for outstanding students.",
    highlights: [
      "Selective national program for high-achieving students",
      "Graduated in the top tier nationally (96.57% GPA)",
    ],
  },
];

/** ELTE Faculty of Informatics — Computer Science BSc (2018, English). */
export const elteBscCurriculum: CurriculumSubject[] = [
  {
    id: "szgreg",
    code: "IP-18fSZGREG",
    name: "Computer systems",
    semester: 1,
    schedule: "2+0+2+1",
    category: "core",
    description:
      "Hardware and system-level view of computers: architecture, memory, I/O, and how software interacts with the machine.",
  },
  {
    id: "progeg",
    code: "IP-18fPROGEG",
    name: "Programming",
    semester: 1,
    schedule: "2+0+3+1",
    category: "cs",
    description:
      "Foundations of programming: problem solving, control flow, data types, and introductory algorithms.",
  },
  {
    id: "improgeg",
    code: "IP-18fIMPROGEG",
    name: "Imperative programming",
    semester: 1,
    schedule: "2+0+3+0",
    category: "cs",
    description:
      "Imperative programming in C: pointers, memory management, modular design, and low-level programming habits.",
  },
  {
    id: "funpeg",
    code: "IP-18fFUNPEG",
    name: "Functional programming",
    semester: 1,
    schedule: "2+0+2+1",
    category: "cs",
    description:
      "Functional paradigm: recursion, higher-order functions, immutability, and declarative problem solving.",
  },
  {
    id: "matag",
    code: "IP-18fMATAG",
    name: "Basic Mathematics",
    semester: 1,
    schedule: "0+4+0+0",
    category: "math",
    description:
      "Mathematical foundations for CS: logic, sets, combinatorics, and introductory calculus concepts.",
  },
  {
    id: "tmkg",
    code: "IP-18fTMKG",
    name: "Learning Methodology",
    semester: 1,
    schedule: "0+1+0+0",
    category: "core",
    description:
      "Study skills, academic writing, and learning strategies for university-level informatics.",
  },
  {
    id: "ivmeg",
    code: "IP-18fIVMEG",
    name: "Business fundamentals",
    semester: 1,
    schedule: "1+2+0+0",
    category: "core",
    description:
      "Introduction to business concepts relevant to IT projects and software industry context.",
  },
  {
    id: "pnyeg",
    code: "IP-18fPNYEG",
    name: "Programming languages",
    semester: 2,
    schedule: "2+0+2+2",
    category: "cs",
    description:
      "Comparative study of programming paradigms and language features across multiple languages.",
    prerequisites: ["IP-18fIMPROGEG"],
  },
  {
    id: "oeprogeg",
    code: "IP-18fOEPROGEG",
    name: "Object-oriented programming",
    semester: 2,
    schedule: "2+0+3+1",
    category: "cs",
    description:
      "OOP principles: encapsulation, inheritance, polymorphism, and design patterns in practice.",
    prerequisites: ["IP-18fPROGEG"],
  },
  {
    id: "wf1eg",
    code: "IP-18fWF1EG",
    name: "Web development",
    semester: 2,
    schedule: "1+0+2+0",
    category: "cs",
    description:
      "Front-end and web fundamentals: HTML, CSS, client-side scripting, and basic web architecture.",
    prerequisites: ["IP-18fSZGREG"],
  },
  {
    id: "aa1",
    code: "IP-18fAA1",
    name: "Algorithms and data structures I",
    semester: 2,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "cs",
    description:
      "Core data structures (lists, trees, graphs) and algorithmic analysis; lecture and practice tracks.",
    prerequisites: ["IP-18fPROGEG", "IP-18fIMPROGEG"],
  },
  {
    id: "dm1",
    code: "IP-18fDM1",
    name: "Discrete mathematics I",
    semester: 2,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "math",
    description:
      "Discrete structures: proofs, combinatorics, graphs, and foundations for algorithms and theory.",
    prerequisites: ["IP-18fMATAG"],
  },
  {
    id: "an1",
    code: "IP-18fAN1",
    name: "Analysis I",
    semester: 2,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "math",
    description:
      "Real analysis basics: limits, continuity, differentiation, and integration for CS applications.",
    prerequisites: ["IP-18fMATAG"],
  },
  {
    id: "aa2",
    code: "IP-18fAA2",
    name: "Algorithms and data structures II",
    semester: 3,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "cs",
    description:
      "Advanced algorithms: sorting, searching, dynamic programming, and complexity analysis.",
    prerequisites: ["IP-18fAA1"],
  },
  {
    id: "wpeg",
    code: "IP-18fWPEG",
    name: "Web programming",
    semester: 3,
    schedule: "1+0+2+1",
    category: "cs",
    description:
      "Server-side web development, HTTP, sessions, and building dynamic web applications.",
    prerequisites: ["IP-18fWF1EG"],
  },
  {
    id: "progteg",
    code: "IP-18fPROGTEG",
    name: "Programming technology",
    semester: 3,
    schedule: "2+0+2+1",
    category: "cs",
    description:
      "Software construction: testing, build tools, version control, and team development practices.",
    prerequisites: ["IP-18fOEPROGEG"],
  },
  {
    id: "an2",
    code: "IP-18fAN2",
    name: "Analysis II",
    semester: 3,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "math",
    description:
      "Continuation of analysis: series, multivariate concepts, and applications in modeling.",
    prerequisites: ["IP-18fAN1"],
  },
  {
    id: "dmag",
    code: "IP-18fDMAG",
    name: "Application of discrete models",
    semester: 3,
    schedule: "0+0+2+1",
    category: "math",
    description:
      "Applying discrete mathematics to CS problems: modeling, counting, and graph applications.",
    prerequisites: ["IP-18fDM1"],
  },
  {
    id: "opreg",
    code: "IP-18fOPREG",
    name: "Operating systems",
    semester: 4,
    schedule: "1+0+1+1",
    category: "core",
    description:
      "Processes, scheduling, memory management, file systems, and concurrency in modern OSes.",
    prerequisites: ["IP-18fSZGREG"],
  },
  {
    id: "ab1",
    code: "IP-18fAB1",
    name: "Databases I",
    semester: 4,
    schedule: "2+0+0+0 / 0+0+2+0",
    category: "cs",
    description:
      "Relational databases: SQL, schema design, normalization, and query optimization basics.",
    prerequisites: ["IP-18fAA1"],
  },
  {
    id: "szteg",
    code: "IP-18fSZTEG",
    name: "Software technology",
    semester: 4,
    schedule: "2+0+2+1",
    category: "cs",
    description:
      "Software engineering lifecycle: requirements, design, implementation, and quality assurance.",
    prerequisites: ["IP-18fPROGTEG"],
  },
  {
    id: "szea1",
    code: "IP-18fSZEA1",
    name: "Fundamentals of theory of computation I",
    semester: 4,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "cs",
    description:
      "Automata, formal languages, grammars, and introductory computability concepts.",
    prerequisites: ["IP-18fDM1"],
  },
  {
    id: "nm1",
    code: "IP-18fNM1",
    name: "Numerical methods",
    semester: 4,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "math",
    description:
      "Numerical algorithms for solving mathematical problems with computational methods.",
    prerequisites: ["IP-18fAN2"],
  },
  {
    id: "kprogeg",
    code: "IP-18fKPROGEG",
    name: "Concurrent programming",
    semester: 5,
    schedule: "2+0+2+1",
    category: "cs",
    description:
      "Threads, synchronization, deadlocks, and parallel programming patterns.",
    prerequisites: ["IP-18fOEPROGEG"],
  },
  {
    id: "tkheg",
    code: "IP-18fTKHEG",
    name: "Telecommunication networks",
    semester: 5,
    schedule: "2+0+2+1",
    category: "core",
    description:
      "Network layers, protocols, routing, and fundamentals of distributed communication.",
  },
  {
    id: "ab2",
    code: "IP-18fAB2",
    name: "Databases II",
    semester: 5,
    schedule: "2+0+0+0 / 0+0+2+0",
    category: "cs",
    description:
      "Advanced database topics: transactions, indexing strategies, and enterprise data design.",
    prerequisites: ["IP-18fAB1"],
  },
  {
    id: "szea2",
    code: "IP-18fSZEA2",
    name: "Fundamentals of theory of computation II",
    semester: 5,
    schedule: "2+0+0+0 / 0+2+0+1",
    category: "cs",
    description:
      "Complexity theory, decidability, and limits of computation.",
    prerequisites: ["IP-18fSZEA1"],
  },
  {
    id: "valt",
    code: "IP-18fVALT",
    name: "Probability and statistics",
    semester: 5,
    schedule: "2+0+2+1",
    category: "math",
    description:
      "Probability, distributions, estimation, and statistical methods for data and CS applications.",
    prerequisites: ["IP-18fMATAG"],
  },
  {
    id: "thesis",
    code: "IP-24fSZD",
    name: "Thesis consultation",
    semester: "thesis",
    schedule: "20 credits",
    category: "thesis",
    description:
      "BSc thesis research and writing under faculty supervision (final degree project).",
  },
];

export const curricula: Record<string, CurriculumSubject[]> = {
  "elte-pti-bsc-2018": elteBscCurriculum,
};
