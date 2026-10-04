"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/lib/profile";

const RADIUS = 130;
const DURATION = 90;

function shortCode(category: string) {
  return category.split(" ")[0].slice(0, 5).toUpperCase();
}

export function SkillsOrbit({ categories }: { categories: SkillCategory[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const size = RADIUS * 2 + 64;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx={center} cy={center} r={RADIUS} fill="none" stroke="var(--border)" strokeWidth={1} />
        </svg>

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: RADIUS * 2,
            height: RADIUS * 2,
            marginLeft: -RADIUS,
            marginTop: -RADIUS,
            animation: reduce ? undefined : `orbit-cw ${DURATION}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {categories.map((cat, i) => {
            const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2;
            const x = RADIUS + RADIUS * Math.cos(angle);
            const y = RADIUS + RADIUS * Math.sin(angle);
            const isActive = i === active;
            return (
              <button
                key={cat.category}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                aria-label={`Show ${cat.category} skills`}
                aria-pressed={isActive}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: x,
                  top: y,
                  animation: reduce ? undefined : `orbit-ccw ${DURATION}s linear infinite`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border font-mono text-[9px] font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "scale-110 border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--card-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                  style={{ transitionTimingFunction: "var(--ease-bounce)" }}
                >
                  {shortCode(cat.category)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
          <span className="h-2 w-2 rotate-45 bg-[var(--accent)]" />
          <span className="mono-label">Skills</span>
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-3 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--fg)]">
          {categories[active].category}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {categories[active].items.map((item) => (
            <span key={item.name} className="tag-sharp" title={item.description}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
