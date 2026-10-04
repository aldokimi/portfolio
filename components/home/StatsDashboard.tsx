"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { certifications, experience, projects } from "@/lib/profile";

function earliestYear(): number {
  const years = experience
    .map((e) => e.period.match(/\d{4}/)?.[0])
    .filter((y): y is string => Boolean(y))
    .map(Number);
  return years.length ? Math.min(...years) : new Date().getFullYear();
}

const LINES = [
  { prompt: "whoami", output: "mohammed al-dokimi — security engineer, budapest" },
  { prompt: "status", output: "shipping ai-assisted platform tooling @ genesys" },
  { prompt: "availability", output: "open to consulting & platform engineering work" },
];

const BOOT_MS = 650;
const LINE_STEP_MS = 280;

export function StatsDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [booted, setBooted] = useState(false);
  const [revealCount, setRevealCount] = useState(0);

  const totalSteps = LINES.length;
  const effectiveBooted = reduce ? true : booted;
  const effectiveReveal = reduce ? totalSteps : revealCount;
  const done = effectiveReveal >= totalSteps;

  useEffect(() => {
    if (!inView || reduce) return;
    const bootId = window.setTimeout(() => setBooted(true), BOOT_MS);
    return () => window.clearTimeout(bootId);
  }, [inView, reduce]);

  useEffect(() => {
    if (!inView || reduce || !booted || revealCount >= totalSteps) return;
    const id = window.setTimeout(() => setRevealCount((c) => c + 1), LINE_STEP_MS);
    return () => window.clearTimeout(id);
  }, [inView, reduce, booted, revealCount, totalSteps]);

  const yearsActive = new Date().getFullYear() - earliestYear();
  const stats = [
    { label: "years_in_field", value: `${yearsActive}+` },
    { label: "roles_held", value: `${experience.length}` },
    { label: "certifications", value: `${certifications.length}` },
    { label: "projects_shipped", value: `${projects.length}+` },
  ];

  return (
    <div ref={ref} className="w-full">
      <div className="card-sharp overflow-hidden p-0 h-full">
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]/70" />
          <span className="ml-2 font-mono text-[10px] text-[var(--card-muted)]">~/portfolio — zsh</span>
        </div>

        <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
          {!effectiveBooted ? (
            <div className="space-y-1.5">
              <p className="text-[var(--card-muted)]">booting session…</p>
              <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--border)]">
                <motion.div
                  className="h-1 rounded-full bg-[var(--accent)]"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: BOOT_MS / 1000, ease: "easeInOut" }}
                />
              </div>
            </div>
          ) : (
            <>
              {LINES.map((line, i) => {
                if (i >= effectiveReveal) return null;
                const isLast = i === effectiveReveal - 1;
                return (
                  <motion.div
                    key={line.prompt}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <p className="text-[var(--accent)]">
                      <span className="text-[var(--card-muted)]">$ </span>
                      {line.prompt}
                    </p>
                    <p className="text-[var(--card-fg)]">
                      {line.output}
                      {isLast && !done ? <span className="cursor-blink">▌</span> : null}
                    </p>
                  </motion.div>
                );
              })}
              {done ? <span className="cursor-blink text-[var(--accent)]">▌</span> : null}
            </>
          )}

          {done ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.1 }}
              className="mt-2 space-y-1.5 border-t border-[var(--border)] pt-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.15 + i * 0.05 }}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="text-[var(--card-muted)]">$ {s.label}</span>
                  <span className="font-semibold text-[var(--accent)]">{s.value}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
