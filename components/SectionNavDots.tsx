"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const sections = [
  { id: "stats", label: "Stats" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
];

// lg+ hands section nav off to the pinned sidebar's SidebarNav — avoid two components
// independently writing the URL hash / listening for the same arrow keys at once.
function isHandledBySidebarNav(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
}

export function SectionNavDots() {
  const [active, setActive] = useState(0);
  const hasHandledInitialHash = useRef(false);

  const goTo = useCallback((idx: number, updateHash = true) => {
    const clamped = Math.max(0, Math.min(idx, sections.length - 1));
    document.getElementById(sections[clamped].id)?.scrollIntoView({ behavior: "smooth" });
    if (updateHash) {
      history.replaceState(null, "", `#${sections[clamped].id}`);
    }
  }, []);

  // Deep link: land directly on the section named in the URL hash on load.
  useEffect(() => {
    if (hasHandledInitialHash.current || isHandledBySidebarNav()) return;
    hasHandledInitialHash.current = true;
    const hash = window.location.hash.replace("#", "");
    const idx = sections.findIndex((s) => s.id === hash);
    if (idx !== -1) {
      requestAnimationFrame(() => goTo(idx, false));
    }
  }, [goTo]);

  useEffect(() => {
    if (isHandledBySidebarNav()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) {
              setActive(idx);
              history.replaceState(null, "", `#${sections[idx].id}`);
            }
          }
        }
      },
      { threshold: 0.5 }
    );
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isHandledBySidebarNav()) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col sm:flex lg:hidden"
    >
      {sections.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Go to ${s.label}`}
          aria-current={i === active}
          className="group relative flex h-6 w-6 items-center justify-center"
        >
          <span
            className={`block h-2 w-2 rounded-full border transition-all duration-300 ${
              i === active
                ? "scale-125 border-[var(--accent)] bg-[var(--accent)]"
                : "border-[var(--border)] bg-transparent group-hover:border-[var(--accent)]"
            }`}
            style={{ transitionTimingFunction: "var(--ease-bounce)" }}
          />
          <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-1 font-mono text-[10px] text-[var(--fg)] opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
        </button>
      ))}
      <span className="mt-1 text-center font-mono text-[9px] text-[var(--muted)]">↑↓</span>
    </nav>
  );
}
