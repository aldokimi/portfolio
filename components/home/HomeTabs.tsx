"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

export type HomeTab =
  | "overview"
  | "experience"
  | "skills"
  | "certs"
  | "education"
  | "projects";

const TAB_HASHES: Record<HomeTab, string> = {
  overview: "top",
  experience: "experience",
  skills: "skills",
  certs: "certs",
  education: "education",
  projects: "projects",
};

const HASH_TO_TAB: Record<string, HomeTab> = {
  top: "overview",
  career: "experience",
  experience: "experience",
  skills: "skills",
  certs: "certs",
  education: "education",
  projects: "projects",
};

const TABS: { id: HomeTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certs" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
];

function tabFromHash(hash: string): HomeTab {
  const id = hash.replace(/^#/, "");
  return HASH_TO_TAB[id] ?? "overview";
}

type HomeTabsProps = {
  overview: ReactNode;
  experience: ReactNode;
  skills: ReactNode;
  certs: ReactNode;
  education: ReactNode;
  projects: ReactNode;
};

export function HomeTabs({
  overview,
  experience,
  skills,
  certs,
  education,
  projects,
}: HomeTabsProps) {
  const [tab, setTab] = useState<HomeTab>("overview");

  const selectTab = useCallback((next: HomeTab) => {
    setTab(next);
    const target = TAB_HASHES[next];
    window.history.replaceState(null, "", `/#${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const sync = () => {
      setTab(tabFromHash(window.location.hash));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const panels: Record<HomeTab, ReactNode> = {
    overview,
    experience,
    skills,
    certs,
    education,
    projects,
  };

  return (
    <div className="space-y-8">
      <div
        role="tablist"
        aria-label="Home sections"
        className="flex flex-wrap gap-1 border-b border-slate-800/90"
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            aria-controls={`home-tab-${id}`}
            id={`home-tab-btn-${id}`}
            onClick={() => selectTab(id)}
            className={`border-b-2 px-2.5 py-2 font-mono text-[10px] uppercase tracking-widest transition sm:px-3 sm:text-[11px] ${
              tab === id
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {TABS.map(({ id }) => (
        <div
          key={id}
          id={`home-tab-${id}`}
          role="tabpanel"
          aria-labelledby={`home-tab-btn-${id}`}
          hidden={tab !== id}
          className={tab !== id ? "hidden" : undefined}
        >
          {panels[id]}
        </div>
      ))}
    </div>
  );
}
