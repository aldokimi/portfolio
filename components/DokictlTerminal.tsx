"use client";

import { HELP_LINES, runDokictl } from "@/lib/dokictl";
import {
  WELCOME_LINES,
  clearTerminalSession,
  loadTerminalSession,
  saveTerminalSession,
  type TerminalLine,
} from "@/lib/dokictl-terminal-storage";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export function DokictlTerminal() {
  const searchParams = useSearchParams();
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES);
  const [value, setValue] = useState(
    () => searchParams.get("cmd")?.trim() ?? "",
  );
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const skipSaveRef = useRef(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = loadTerminalSession();
    if (saved) {
      setLines(saved.lines);
      setHistory(saved.history);
    }
    skipSaveRef.current = false;
  }, []);

  useEffect(() => {
    if (skipSaveRef.current) return;
    saveTerminalSession({ lines, history });
  }, [lines, history]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setLines((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);

    const result = runDokictl(cmd);
    if (result.kind === "error") {
      setLines((prev) => [...prev, { type: "error", text: result.message }]);
      return;
    }
    if (result.kind === "help") {
      setLines((prev) => [
        ...prev,
        { type: "help", text: result.lines.join("\n") },
      ]);
      return;
    }
    if (result.lines.length > 0) {
      setLines((prev) => [
        ...prev,
        { type: "output", text: result.lines.join("\n") },
      ]);
    }
  }, []);

  function clearTerminal() {
    clearTerminalSession();
    setLines(WELCOME_LINES);
    setHistory([]);
    setHistoryIndex(-1);
    setValue("");
    inputRef.current?.focus();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = value.trim();
    if (!cmd) return;
    setValue("");
    setHistoryIndex(-1);
    setHistory((h) => (h[h.length - 1] === cmd ? h : [...h, cmd]));
    runCommand(cmd);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next =
        historyIndex < 0
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(history[next] ?? "");
      }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (!value.trim()) {
        setValue("dokictl ");
        return;
      }
      const partial = value.trimEnd();
      const match = HELP_LINES.find(
        (l) =>
          l.startsWith("  dokictl") &&
          l.includes(partial.replace(/^dokictl\s*/, "")),
      );
      if (partial === "dokictl" || partial === "dokictl ") {
        setValue("dokictl get certs");
      } else if (!partial.startsWith("dokictl")) {
        setValue(`dokictl ${partial}`);
      } else if (match?.startsWith("  ")) {
        setValue(match.trim());
      }
    }
  }

  return (
    <div
      className="rounded-xl border border-cyan-500/25 bg-slate-950/80 shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]"
      onClick={() => inputRef.current?.focus()}
      role="presentation"
    >
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          dokictl shell
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            clearTerminal();
          }}
          className="ml-auto rounded border border-slate-700/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:border-slate-500 hover:text-slate-200"
        >
          Clear
        </button>
      </div>

      <div className="max-h-[min(28rem,60vh)] overflow-y-auto px-4 py-4">
        <div className="space-y-2">
          {lines.map((line, i) => (
            <pre
              key={`${i}-${line.type}-${line.text.slice(0, 24)}`}
              className={`whitespace-pre-wrap font-mono text-[13px] leading-relaxed ${
                line.type === "input"
                  ? "text-cyan-100/95"
                  : line.type === "error"
                    ? "text-red-300"
                    : line.type === "help"
                      ? "text-amber-200/90"
                      : "text-slate-200"
              }`}
            >
              {line.text}
            </pre>
          ))}
        </div>
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-slate-800 px-4 py-3"
      >
        <span className="shrink-0 font-mono text-[13px] text-cyan-400/90">$</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="dokictl command"
          placeholder="dokictl get certs"
          className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-slate-100 outline-none placeholder:text-slate-600"
        />
      </form>
    </div>
  );
}
