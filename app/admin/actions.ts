"use server";

import { createPost, deletePost, updatePost } from "@/lib/posts";
import type { PostStatus } from "@/lib/types/post";
import {
  checkPassword,
  createSessionToken,
  getAdminPassword,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

function intentToStatus(intent: string): PostStatus {
  return intent === "publish" ? "published" : "draft";
}

function readPostFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    body: String(formData.get("body") ?? ""),
    intent: String(formData.get("intent") ?? "draft"),
  };
}

export async function noopAction(): Promise<null> {
  return null;
}

function dbErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  if (message.includes("D1 binding DB is not configured")) {
    return "Database is not available. Run yarn d1:migrate:remote and redeploy, or use yarn preview locally.";
  }
  if (message.includes("no such table")) {
    return "Posts table is missing. Run yarn d1:migrate:remote (production) or yarn d1:migrate:local (dev).";
  }
  return message || "Something went wrong while saving.";
}

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  const password = String(formData.get("password") ?? "");

  let expected: string;
  try {
    expected = await getAdminPassword();
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Admin password is not configured." };
  }

  if (!checkPassword(password, expected)) {
    return { error: "Incorrect password." };
  }

  const token = await createSessionToken(expected);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin/");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login/");
}

export async function createPostAction(
  _prev: { error?: string; ok?: true } | null,
  formData: FormData,
): Promise<{ error?: string; ok?: true } | null> {
  const { title, slug, body, intent } = readPostFields(formData);
  const status = intentToStatus(intent);

  try {
    const result = await createPost({ title, slug, body }, status);
    if (!result.ok) return { error: result.error };

    revalidatePath("/blog");
    revalidatePath("/admin");
    redirect(`/admin/posts/${result.post.id}/edit/`);
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { error: dbErrorMessage(err) };
  }
}

export async function updatePostAction(
  _prev: { error?: string; ok?: true } | null,
  formData: FormData,
): Promise<{ error?: string; ok?: true } | null> {
  const id = Number(formData.get("postId"));
  if (!Number.isFinite(id)) return { error: "Invalid post id." };

  const { title, slug, body, intent } = readPostFields(formData);

  let status: PostStatus = "draft";
  if (intent === "publish") status = "published";
  if (intent === "unpublish") status = "draft";

  try {
    const result = await updatePost(id, { title, slug, body }, status);
    if (!result.ok) return { error: result.error };

    revalidatePath("/blog");
    revalidatePath(`/blog/${result.post.slug}/`);
    revalidatePath("/admin");
    revalidatePath(`/admin/posts/${id}/edit/`);
    return { ok: true };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { error: dbErrorMessage(err) };
  }
}

export async function deletePostAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  const id = Number(formData.get("postId"));
  if (!Number.isFinite(id)) return { error: "Invalid post id." };

  try {
    const result = await deletePost(id);
    if (!result.ok) return { error: result.error };

    revalidatePath("/blog");
    revalidatePath("/admin");
    redirect("/admin/");
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { error: dbErrorMessage(err) };
  }
}
