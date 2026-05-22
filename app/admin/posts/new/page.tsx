import { PostEditor } from "@/components/PostEditor";
import { createPostAction } from "@/app/admin/actions";

export const metadata = { title: "New post" };

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12">
      <PostEditor mode="create" saveAction={createPostAction} />
    </main>
  );
}
