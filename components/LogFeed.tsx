import Link from "next/link";
import type { Post } from "@/lib/types/post";

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

export function LogFeed({ entries }: { entries: Post[] }) {
  if (entries.length === 0) {
    return (
      <p className="font-mono text-sm text-slate-500">No published logs yet.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="rounded-lg border border-slate-800/80 bg-slate-900/40 px-4 py-3 font-mono text-[13px] shadow-inner shadow-black/20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11px] uppercase tracking-widest text-slate-500">
            <span>
              <span className="text-cyan-500/90">log</span>{" "}
              <span className="text-emerald-400/80">article</span>
            </span>
            <time
              dateTime={entry.publishedAt ?? entry.updatedAt}
              className="text-slate-500"
            >
              {formatTs(entry.publishedAt ?? entry.updatedAt)}
            </time>
          </div>
          <h2 className="mt-2 text-sm font-semibold text-slate-100">
            {entry.title}
          </h2>
          <div className="mt-2 space-y-3 text-slate-300">
            <p className="whitespace-pre-wrap">{entry.excerpt}</p>
            <Link
              href={`/logs/${entry.slug}/`}
              className="inline-flex text-xs font-semibold uppercase tracking-widest text-cyan-400 hover:text-cyan-300"
            >
              Read more →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
