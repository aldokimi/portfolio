import { PostEditor } from "@/components/PostEditor";
import { deletePostAction, updatePostAction } from "@/app/admin/actions";
import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) return { title: "Edit post" };
  return { title: `Edit · ${post.title}` };
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const num = Number(id);
  if (!Number.isFinite(num)) notFound();

  const post = await getPostById(num);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12">
      <PostEditor
        key={post.id}
        mode="edit"
        post={post}
        saveAction={updatePostAction}
        deleteAction={deletePostAction}
      />
    </main>
  );
}
