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
      <p className="mono-label !text-red-400">/admin error</p>
      <h1 className="h3-card text-[var(--fg)]">Admin unavailable</h1>
      <p className="font-mono text-sm text-[var(--muted)]">{error.message}</p>
      {hint ? <p className="font-mono text-sm text-[var(--muted)]">{hint}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn-sharp">
          Retry
        </button>
        <Link href="/admin/" className="btn-sharp">
          Back to admin
        </Link>
      </div>
    </main>
  );
}
