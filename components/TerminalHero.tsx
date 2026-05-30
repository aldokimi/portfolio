"use client";

import { profile } from "@/lib/profile";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type ScriptLine =
  | { kind: "plain"; text: string }
  | {
      kind: "terminal-link";
      before: string;
      href: string;
      linkText: string;
      after: string;
    };

const SCRIPT: ScriptLine[] = [
  { kind: "plain", text: "$ whoami" },
  {
    kind: "plain",
    text: "Mohammed Al-Dokimi — software engineer (Go, Python, cloud-native)",
  },
  { kind: "plain", text: "$ dokictl get certs" },
  { kind: "plain", text: "RHCA · RHCE · OpenShift · Containers (Red Hat)" },
  { kind: "plain", text: "$ dokictl get roles" },
  {
    kind: "plain",
    text: "genesys (current) · redhat · nokia · elte (teaching / research)",
  },
  { kind: "plain", text: "$ dokictl shell" },
  {
    kind: "terminal-link",
    before: "Interactive control plane on ",
    href: "/terminal/",
    linkText: "/terminal/",
    after: " — try dokictl get profile",
  },
];

function lineLength(line: ScriptLine): number {
  if (line.kind === "plain") return line.text.length;
  return line.before.length + line.linkText.length + line.after.length;
}

function renderCompletedLine(line: ScriptLine): ReactNode {
  if (line.kind === "plain") {
    return line.text;
  }
  return (
    <>
      {line.before}
      <Link
        href={line.href}
        className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-300"
      >
        {line.linkText}
      </Link>
      {line.after}
    </>
  );
}

function renderTypingLine(line: ScriptLine, visibleChars: number): ReactNode {
  if (line.kind === "plain") {
    return line.text.slice(0, visibleChars);
  }

  const full = line.before + line.linkText + line.after;
  const slice = full.slice(0, visibleChars);
  const beforeEnd = line.before.length;
  const linkEnd = beforeEnd + line.linkText.length;

  if (visibleChars <= beforeEnd) {
    return slice;
  }
  if (visibleChars <= linkEnd) {
    return (
      <>
        {line.before}
        <span className="text-cyan-400/90">{slice.slice(beforeEnd)}</span>
      </>
    );
  }
  return (
    <>
      {line.before}
      <Link
        href={line.href}
        className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-300"
      >
        {line.linkText}
      </Link>
      {line.after.slice(0, visibleChars - linkEnd)}
    </>
  );
}

export function TerminalHero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = SCRIPT[lineIndex];
  const done = lineIndex >= SCRIPT.length;

  const visibleLines = useMemo(() => {
    return SCRIPT.slice(0, lineIndex).map((line, i) => (
      <motion.div
        key={`${i}-${line.kind}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-slate-200"
      >
        {renderCompletedLine(line)}
      </motion.div>
    ));
  }, [lineIndex]);

  useEffect(() => {
    if (done || !currentLine) return;
    const len = lineLength(currentLine);
    const isCommand =
      currentLine.kind === "plain" && currentLine.text.startsWith("$");
    const id = window.setTimeout(
      () => {
        if (charIndex < len) {
          setCharIndex((c) => c + 1);
        } else {
          setLineIndex((l) => l + 1);
          setCharIndex(0);
        }
      },
      charIndex === 0 ? 120 : isCommand ? 18 : 10,
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
        {!done && currentLine ? (
          <div className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-cyan-100/95">
            {renderTypingLine(currentLine, charIndex)}
            <span className="inline-block w-2 animate-pulse text-cyan-400">▍</span>
          </div>
        ) : null}
        <p className="border-t border-slate-800/80 pt-4 text-sm leading-relaxed text-slate-300">
          {profile.bio}
        </p>
      </div>
    </div>
  );
}
