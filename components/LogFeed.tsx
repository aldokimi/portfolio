import Link from "next/link";
import type { LogEntry } from "@/lib/github-issues";

function formatTs(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function LogFeed({ entries }: { entries: LogEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="font-mono text-sm text-slate-500">
        No published logs yet. Add the{" "}
        <code className="text-cyan-400/90">published</code> label to a GitHub
        Issue in this repo, then let CI rebuild.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li
          key={entry.number}
          className="rounded-lg border border-slate-800/80 bg-slate-900/40 px-4 py-3 font-mono text-[13px] shadow-inner shadow-black/20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11px] uppercase tracking-widest text-slate-500">
            <span>
              <span className="text-cyan-500/90">log</span>{" "}
              <span className="text-slate-400">#{entry.number}</span>{" "}
              <span className="text-emerald-400/80">
                {entry.kind === "note" ? "note" : "article"}
              </span>
            </span>
            <time dateTime={entry.updatedAt} className="text-slate-500">
              {formatTs(entry.updatedAt)}
            </time>
          </div>
          <h2 className="mt-2 text-sm font-semibold text-slate-100">
            {entry.title}
          </h2>
          {entry.kind === "note" ? (
            <p className="mt-2 whitespace-pre-wrap text-slate-300">{entry.body}</p>
          ) : (
            <div className="mt-2 space-y-3 text-slate-300">
              <p className="whitespace-pre-wrap">{entry.excerpt}</p>
              <Link
                href={`/logs/${entry.number}/`}
                className="inline-flex text-xs font-semibold uppercase tracking-widest text-cyan-400 hover:text-cyan-300"
              >
                Read more →
              </Link>
            </div>
          )}
          <a
            href={entry.htmlUrl}
            className="mt-3 inline-block text-[11px] text-slate-500 underline-offset-2 hover:text-slate-400"
          >
            View on GitHub
          </a>
        </li>
      ))}
    </ul>
  );
}
