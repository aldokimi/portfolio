import { BlogFeed } from "@/components/BlogFeed";
import { listPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  let entries;
  try {
    entries = await listPublishedPosts();
  } catch {
    return (
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
        <p className="font-mono text-sm text-red-400">Blog temporarily unavailable. Try again later.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl flex-1 space-y-8 px-4 py-12">
      <header className="space-y-2">
        <p className="mono-label">Blog</p>
        <h1 className="h2-section text-[var(--fg)]">Writing</h1>
        <p className="text-sm text-[var(--muted)]">
          Notes on security, platform engineering, and whatever else is worth writing down.
        </p>
      </header>
      <BlogFeed entries={entries} />
    </main>
  );
}
