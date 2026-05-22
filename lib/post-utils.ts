import { EXCERPT_MAX_CHARS } from "./config";
import type { PostInput, PostStatus } from "./types/post";

export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "untitled";
}

export function excerptFromBody(body: string): string {
  const trimmed = body.trim();
  const firstBlock = (trimmed.split(/\n\n+/)[0] ?? trimmed).trim();
  if (firstBlock.length <= EXCERPT_MAX_CHARS) return firstBlock;
  return `${firstBlock.slice(0, EXCERPT_MAX_CHARS).trimEnd()}…`;
}

export function validatePostInput(
  input: PostInput,
  targetStatus: PostStatus = "draft",
): string | null {
  if (!input.title.trim()) return "Title is required.";
  if (!input.slug.trim()) return "Slug is required.";
  if (targetStatus === "published" && !input.body.trim()) {
    return "Body is required to publish.";
  }
  return null;
}
