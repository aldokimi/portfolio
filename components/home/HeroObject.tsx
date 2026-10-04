"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export function HeroObject() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
      className="absolute inset-0 z-0 flex items-center justify-center [perspective:800px]"
    >
      <motion.svg
        viewBox="0 0 200 220"
        style={{ rotateX, rotateY }}
        className="h-[260px] w-[260px] text-[var(--accent)] opacity-[0.14] sm:h-[360px] sm:w-[360px]"
      >
        <motion.path
          d="M100 8 L188 40 V110 C188 165 150 200 100 212 C50 200 12 165 12 110 V40 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="104"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
          style={{ transformOrigin: "100px 104px" }}
          animate={{ rotate: reduce ? 0 : 360 }}
          transition={reduce ? { duration: 0 } : { duration: 40, ease: "linear", repeat: Infinity }}
        />
        <motion.circle
          cx="100"
          cy="104"
          r="72"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 10"
          style={{ transformOrigin: "100px 104px" }}
          animate={{ rotate: reduce ? 0 : -360 }}
          transition={reduce ? { duration: 0 } : { duration: 65, ease: "linear", repeat: Infinity }}
        />
        <motion.g
          style={{ transformOrigin: "100px 104px" }}
          animate={{ rotate: reduce ? 0 : 360 }}
          transition={reduce ? { duration: 0 } : { duration: 26, ease: "linear", repeat: Infinity }}
        >
          <circle cx="100" cy="32" r="2.5" fill="currentColor" />
          <circle cx="155" cy="135" r="2.5" fill="currentColor" />
          <circle cx="56" cy="150" r="2.5" fill="currentColor" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
