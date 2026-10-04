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

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mono-label">/admin</p>
          <h1 className="h2-section text-[var(--fg)]">Posts</h1>
        </div>
        <Link href="/admin/posts/new/" className="btn-sharp">
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-[var(--muted)]">No posts yet.</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="card-sharp flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div className="space-y-1">
                <Link
                  href={`/admin/posts/${post.id}/edit/`}
                  className="font-mono text-sm font-semibold text-[var(--card-fg)] hover:text-[var(--accent)] transition-colors"
                >
                  {post.title}
                </Link>
                <p className="font-mono text-[11px] text-[var(--card-muted)]">/blog/{post.slug}/</p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
                <span className={post.status === "published" ? "text-[var(--accent)]" : "text-amber-400"}>
                  {post.status}
                </span>
                <time dateTime={post.updatedAt} className="text-[var(--card-muted)]">
                  {formatTs(post.updatedAt)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
