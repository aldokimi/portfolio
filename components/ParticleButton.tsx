"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Particle = { id: number; x: number; y: number };

function Burst({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

export function ParticleButton({
  href,
  external = false,
  className = "",
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = () => {
    const batch = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120,
    }));
    setParticles(batch);
    window.setTimeout(() => setParticles([]), 600);
  };

  const inner = (
    <span className="relative inline-flex items-center justify-center">
      {children}
      <Burst particles={particles} />
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        rel="noreferrer"
        target="_blank"
        onClick={burst}
        className={`relative overflow-visible ${className}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} onClick={burst} className={`relative overflow-visible ${className}`}>
      {inner}
    </Link>
  );
}
