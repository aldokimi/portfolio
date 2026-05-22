"use server";

import { createPost, deletePost, updatePost } from "@/lib/posts";
import type { PostStatus } from "@/lib/types/post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const body = String(formData.get("body") ?? "");
  const intent = String(formData.get("intent") ?? "draft");
  const status: PostStatus = intent === "publish" ? "published" : "draft";

  const result = await createPost({ title, slug, body }, status);
  if (!result.ok) return { error: result.error };

  revalidatePath("/logs");
  revalidatePath("/admin");
  redirect(`/admin/posts/${result.post.id}/edit/`);
}

export async function updatePostAction(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const body = String(formData.get("body") ?? "");
  const intent = String(formData.get("intent") ?? "draft");

  let status: PostStatus = "draft";
  if (intent === "publish") status = "published";
  if (intent === "unpublish") status = "draft";

  const result = await updatePost(id, { title, slug, body }, status);
  if (!result.ok) return { error: result.error };

  revalidatePath("/logs");
  revalidatePath(`/logs/${result.post.slug}/`);
  revalidatePath("/admin");
  revalidatePath(`/admin/posts/${id}/edit/`);
  return { ok: true as const };
}

export async function deletePostAction(id: number) {
  const result = await deletePost(id);
  if (!result.ok) return { error: result.error };

  revalidatePath("/logs");
  revalidatePath("/admin");
  redirect("/admin/");
}
