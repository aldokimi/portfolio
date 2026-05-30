"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const SCRIPT = [
  "$ whoami",
  "Mohammed Al-Dokimi — software engineer (Go, Python, cloud-native)",
  "$ kubectl get certs --namespace career",
  "RHCA · RHCE · OpenShift · Containers (Red Hat)",
  "$ kubectl get roles --namespace career",
  "genesys (current) · redhat · nokia · elte (teaching / research)",
  "$ open logs --follow",
  "Write-ups on /logs — this site runs on Cloudflare Workers + D1.",
];

export function TerminalHero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = SCRIPT[lineIndex] ?? "";
  const done = lineIndex >= SCRIPT.length;

  const visibleLines = useMemo(() => {
    return SCRIPT.slice(0, lineIndex).map((line, i) => (
      <motion.div
        key={`${i}-${line.slice(0, 12)}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-slate-200"
      >
        {line}
      </motion.div>
    ));
  }, [lineIndex]);

  useEffect(() => {
    if (done) return;
    const id = window.setTimeout(
      () => {
        if (charIndex < currentLine.length) {
          setCharIndex((c) => c + 1);
        } else {
          setLineIndex((l) => l + 1);
          setCharIndex(0);
        }
      },
      charIndex === 0 ? 120 : currentLine.startsWith("$") ? 18 : 10,
    );
    return () => window.clearTimeout(id);
  }, [charIndex, currentLine, done, lineIndex]);

  return (
    <div className="rounded-xl border border-cyan-500/25 bg-slate-950/80 shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]">
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          cloud-native shell
        </span>
      </div>
      <div className="space-y-2 px-4 py-5">
        {visibleLines}
        {!done ? (
          <div className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-cyan-100/95">
            {currentLine.slice(0, charIndex)}
            <span className="inline-block w-2 animate-pulse text-cyan-400">▍</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
