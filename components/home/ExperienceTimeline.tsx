"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import type { ExperienceEntry } from "@/lib/profile";

const CARD_WIDTH = 300;
const GAP = 20;
const STEP = CARD_WIDTH + GAP;
const AUTOPLAY_INTERVAL_MS = 4000;
const TRACK_SPRING = { type: "spring" as const, stiffness: 160, damping: 22 };

function startYear(period: string): string {
  return period.match(/\d{4}/)?.[0] ?? "";
}

export function ExperienceTimeline({ roles }: { roles: ExperienceEntry[] }) {
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const maxIndex = roles.length - 1;
  const minX = -maxIndex * STEP;
  const travelPercent = maxIndex === 0 ? 0 : (index / maxIndex) * 100;

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(i, maxIndex));
    setIndex(clamped);
    animate(x, -clamped * STEP, TRACK_SPRING);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !inView || hovered || userInteracted) return;
    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = current >= maxIndex ? 0 : current + 1;
        animate(x, -next * STEP, TRACK_SPRING);
        return next;
      });
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, inView, hovered, userInteracted, maxIndex, x]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    setUserInteracted(true);
    const predicted = x.get() + info.velocity.x * 0.2;
    goTo(Math.round(-predicted / STEP));
  };

  return (
    <div
      ref={containerRef}
      className="space-y-8"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Travelling timeline rail */}
      <div className="relative mx-auto h-12 w-full max-w-xl px-1">
        <div className="absolute left-0 right-0 top-[13px] h-[2px] rounded-full bg-[var(--border)]" />
        <motion.div
          className="absolute left-0 top-[13px] h-[2px] rounded-full bg-[var(--accent)]"
          animate={{ width: `${travelPercent}%` }}
          transition={TRACK_SPRING}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-[13px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
          animate={{ left: `${travelPercent}%` }}
          transition={TRACK_SPRING}
        />
        {roles.map((role, i) => {
          const left = maxIndex === 0 ? 0 : (i / maxIndex) * 100;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => {
                setUserInteracted(true);
                goTo(i);
              }}
              aria-label={`Show ${role.company}`}
              style={{ left: `${left}%` }}
              className="absolute top-2 flex -translate-x-1/2 flex-col items-center gap-2"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full border-2 transition-colors duration-300 ${
                  i <= index
                    ? "border-[var(--accent)] bg-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--bg)]"
                }`}
              />
              <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-wide text-[var(--muted)]">
                {startYear(role.period)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex cursor-grab gap-5 active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          {roles.map((role, i) => (
            <motion.article
              key={role.id}
              style={{ width: CARD_WIDTH }}
              animate={{
                opacity: i === index ? 1 : 0.5,
                scale: i === index ? 1 : 0.97,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="card-sharp relative shrink-0 overflow-hidden px-6 py-5"
            >
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)] opacity-20" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="h3-card text-[var(--card-fg)]">{role.company}</h3>
                <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--accent)] uppercase font-semibold shrink-0">
                  {role.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--card-muted)]">{role.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--card-muted)]">{role.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {role.stack.slice(0, 5).map((tech) => (
                  <span key={tech} className="tag-sharp text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
        {roles[index].company} · {index + 1} / {roles.length}
      </p>
    </div>
  );
}
