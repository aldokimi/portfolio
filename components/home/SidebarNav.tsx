"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "stats", label: "Stats" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
];

const TRACK_SPRING = { type: "spring" as const, stiffness: 160, damping: 22 };

// This nav only renders (visibly) at lg+ — below that, the aside is CSS-hidden and
// SectionNavDots owns section navigation instead. Still, this component stays mounted
// (display:none has no effect on React), so guard its "active" effects the same way
// SectionNavDots guards its own, or the two would double up on the same hash/keys.
function isActiveHere(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
}

export function SidebarNav() {
  const [active, setActive] = useState(0);
  const [markerTop, setMarkerTop] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasHandledInitialHash = useRef(false);

  const measure = useCallback((idx: number) => {
    const rail = railRef.current;
    const el = itemRefs.current[SECTIONS[idx].id];
    if (!rail || !el) return;
    const railRect = rail.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setMarkerTop(elRect.top - railRect.top + elRect.height / 2);
  }, []);

  useLayoutEffect(() => {
    measure(active);
  }, [active, measure]);

  useEffect(() => {
    const onResize = () => measure(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, measure]);

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, SECTIONS.length - 1));
    document.getElementById(SECTIONS[clamped].id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${SECTIONS[clamped].id}`);
  }, []);

  // Deep link: land directly on the section named in the URL hash on load.
  useEffect(() => {
    if (hasHandledInitialHash.current || !isActiveHere()) return;
    hasHandledInitialHash.current = true;
    const hash = window.location.hash.replace("#", "");
    const idx = SECTIONS.findIndex((s) => s.id === hash);
    if (idx !== -1) requestAnimationFrame(() => goTo(idx));
  }, [goTo]);

  useEffect(() => {
    if (!isActiveHere()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) {
              setActive(idx);
              history.replaceState(null, "", `#${SECTIONS[idx].id}`);
            }
          }
        }
      },
      { threshold: 0.5 }
    );
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isActiveHere()) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setActive((current) => {
          const next = Math.min(current + 1, SECTIONS.length - 1);
          goTo(next);
          return next;
        });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setActive((current) => {
          const prev = Math.max(current - 1, 0);
          goTo(prev);
          return prev;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  return (
    <nav aria-label="Page navigation" className="mt-10">
      <div ref={railRef} className="relative pl-5">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[var(--border)]" />
        <motion.div
          className="absolute left-0 top-0 w-[2px] rounded-full bg-[var(--accent)]"
          animate={{ height: markerTop }}
          transition={TRACK_SPRING}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
          animate={{ top: markerTop }}
          transition={TRACK_SPRING}
        />
        <ul className="space-y-3">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                ref={(el) => {
                  itemRefs.current[s.id] = el;
                }}
                type="button"
                onClick={() => {
                  setActive(i);
                  goTo(i);
                }}
                aria-current={i === active}
                className={`block py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 ${
                  i === active
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
