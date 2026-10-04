"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/lib/profile";

const TICKS = [0, 5, 10, 15];
const MAX = TICKS[TICKS.length - 1];

export function SkillsBarChart({ categories }: { categories: SkillCategory[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const rows = categories
    .map((c) => ({ label: c.category, value: c.items.length }))
    .sort((a, b) => b.value - a.value);

  return (
    <div ref={ref} className="card-sharp h-full overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--card-muted)]">
          Skills inventory
        </p>
        <p className="font-mono text-[10px] text-[var(--card-muted)]">by category</p>
      </div>

      <div className="px-5 py-5">
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={row.label} className="group flex items-center gap-3">
              <span className="w-36 shrink-0 truncate font-mono text-[11px] text-[var(--card-muted)]">
                {row.label}
              </span>
              <div className="h-4 flex-1 overflow-hidden rounded-r-full bg-[var(--border)]/40">
                <motion.div
                  className="h-4 rounded-r-full bg-[var(--card-muted)] transition-colors duration-300 group-hover:bg-[var(--accent)]"
                  initial={reduce ? false : { width: 0 }}
                  animate={inView ? { width: `${(row.value / MAX) * 100}%` } : {}}
                  transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.06, ease: "easeOut" }}
                />
              </div>
              <span className="w-5 shrink-0 text-right font-mono text-[11px] text-[var(--card-fg)]">
                {row.value}
              </span>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-1">
            <span className="w-36 shrink-0" aria-hidden="true" />
            <div className="flex flex-1 justify-between font-mono text-[9px] text-[var(--card-muted)]">
              {TICKS.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <span className="w-5 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
