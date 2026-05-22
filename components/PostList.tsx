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
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
            /admin
          </p>
          <h1 className="font-mono text-2xl text-slate-50">Posts</h1>
        </div>
        <Link
          href="/admin/posts/new/"
          className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-300 hover:bg-cyan-500/20"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-slate-500">No posts yet.</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-900/40 px-4 py-3"
            >
              <div className="space-y-1">
                <Link
                  href={`/admin/posts/${post.id}/edit/`}
                  className="font-mono text-sm font-semibold text-slate-100 hover:text-cyan-300"
                >
                  {post.title}
                </Link>
                <p className="font-mono text-[11px] text-slate-500">
                  /logs/{post.slug}/
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
                <span
                  className={
                    post.status === "published"
                      ? "text-emerald-400/90"
                      : "text-amber-400/90"
                  }
                >
                  {post.status}
                </span>
                <time dateTime={post.updatedAt} className="text-slate-500">
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
