import { DokictlTerminal } from "@/components/DokictlTerminal";
import { Suspense } from "react";

export const metadata = {
  title: "Terminal",
  description: "Interactive dokictl shell for portfolio CV data.",
};

export default function TerminalPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-12">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
          /terminal
        </p>
        <h1 className="font-mono text-2xl text-slate-50">dokictl shell</h1>
        <p className="text-sm text-slate-400">
          The only available command is{" "}
          <span className="font-mono text-cyan-300/90">dokictl</span>. Explore
          certs, roles, skills, and projects from your CV data.
        </p>
      </header>
      <Suspense
        fallback={
          <div className="rounded-xl border border-cyan-500/25 bg-slate-950/80 px-4 py-8 font-mono text-sm text-slate-500">
            Loading shell…
          </div>
        }
      >
        <DokictlTerminal />
      </Suspense>
    </main>
  );
}
