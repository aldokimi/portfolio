"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SpringReveal({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`snap-section flex flex-col justify-center px-4 py-16 sm:px-6 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 48, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 120, damping: 16, mass: 0.6 }
      }
    >
      {children}
    </motion.section>
  );
}
