import { PostList } from "@/components/PostList";
import { listAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const posts = await listAllPosts();

  return (
    <main className="mx-auto max-w-4xl flex-1 space-y-8 px-4 py-12">
      <PostList posts={posts} />
    </main>
  );
}
