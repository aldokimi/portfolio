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

export function BlogFeed({ entries }: { entries: Post[] }) {
  if (entries.length === 0) {
    return <p className="font-mono text-sm text-[var(--muted)]">No published posts yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {entries.map((entry) => (
        <li key={entry.id} className="card-sharp px-5 py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent)]">
              Blog
            </span>
            <time dateTime={entry.publishedAt ?? entry.updatedAt} className="font-mono text-[10px] text-[var(--card-muted)]">
              {formatTs(entry.publishedAt ?? entry.updatedAt)}
            </time>
          </div>
          <h2 className="mt-2 h3-card text-[var(--card-fg)]">{entry.title}</h2>
          <div className="mt-2 space-y-3">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--card-muted)]">{entry.excerpt}</p>
            <Link
              href={`/blog/${entry.slug}/`}
              className="inline-flex text-xs font-semibold uppercase tracking-widest text-[var(--accent)] hover:text-[var(--card-fg)] transition-colors"
            >
              Read more →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
