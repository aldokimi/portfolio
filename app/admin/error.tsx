"use client";

import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const hint =
    error.message.includes("D1") || error.message.includes("DB")
      ? "Check D1 migrations (yarn d1:migrate:remote) and that wrangler.jsonc has a valid database_id."
      : null;

  return (
    <main className="mx-auto max-w-2xl flex-1 space-y-4 px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-400/90">
        /admin error
      </p>
      <h1 className="font-mono text-xl text-slate-100">Admin unavailable</h1>
      <p className="font-mono text-sm text-slate-400">{error.message}</p>
      {hint ? (
        <p className="font-mono text-sm text-slate-500">{hint}</p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-slate-700 px-4 py-2 font-mono text-xs uppercase tracking-widest text-slate-300 hover:border-slate-500"
        >
          Retry
        </button>
        <Link
          href="/admin/"
          className="rounded-lg border border-cyan-500/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-300 hover:bg-cyan-500/10"
        >
          Back to admin
        </Link>
      </div>
    </main>
  );
}
