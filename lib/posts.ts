import { excerptFromBody, slugify, validatePostInput } from "./post-utils";
import { getDb } from "./db";
import type { Post, PostInput, PostStatus } from "./types/post";

type PostRow = {
  id: number;
  slug: string;
  title: string;
  body: string;
  status: PostStatus;
  excerpt: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

function mapRow(row: PostRow): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    body: row.body,
    status: row.status,
    excerpt: row.excerpt,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}

async function uniqueSlug(
  base: string,
  excludeId?: number,
): Promise<string> {
  const db = await getDb();
  const root = slugify(base) || "untitled";
  let candidate = root;
  let n = 2;

  while (true) {
    const row = await db
      .prepare("SELECT id FROM posts WHERE slug = ?")
      .bind(candidate)
      .first<{ id: number }>();
    if (!row || (excludeId !== undefined && row.id === excludeId)) {
      return candidate;
    }
    candidate = `${root}-${n++}`;
  }
}

export async function listPublishedPosts(): Promise<Post[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(
      "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC",
    )
    .all<PostRow>();
  return (results ?? []).map(mapRow);
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | null> {
  const db = await getDb();
  const row = await db
    .prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published'")
    .bind(slug)
    .first<PostRow>();
  return row ? mapRow(row) : null;
}

export async function listAllPosts(): Promise<Post[]> {
  const db = await getDb();
  const { results } = await db
    .prepare("SELECT * FROM posts ORDER BY updated_at DESC")
    .all<PostRow>();
  return (results ?? []).map(mapRow);
}

export async function getPostById(id: number): Promise<Post | null> {
  const db = await getDb();
  const row = await db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .bind(id)
    .first<PostRow>();
  return row ? mapRow(row) : null;
}

export async function createPost(
  input: PostInput,
  status: PostStatus,
): Promise<{ ok: true; post: Post } | { ok: false; error: string }> {
  const err = validatePostInput(input, status);
  if (err) return { ok: false, error: err };

  const db = await getDb();
  const slug = await uniqueSlug(input.slug || input.title);
  const excerpt = excerptFromBody(input.body);
  const now = new Date().toISOString();
  const publishedAt = status === "published" ? now : null;

  const result = await db
    .prepare(
      `INSERT INTO posts (slug, title, body, status, excerpt, created_at, updated_at, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      slug,
      input.title.trim(),
      input.body,
      status,
      excerpt,
      now,
      now,
      publishedAt,
    )
    .run();

  const id = result.meta.last_row_id;
  const post = await getPostById(Number(id));
  if (!post) return { ok: false, error: "Failed to create post." };
  return { ok: true, post };
}

export async function updatePost(
  id: number,
  input: PostInput,
  status: PostStatus,
): Promise<{ ok: true; post: Post } | { ok: false; error: string }> {
  const existing = await getPostById(id);
  if (!existing) return { ok: false, error: "Post not found." };

  const err = validatePostInput(input, status);
  if (err) return { ok: false, error: err };

  const db = await getDb();
  const slug = input.slug.trim()
    ? await uniqueSlug(input.slug, id)
    : existing.slug;
  const excerpt = excerptFromBody(input.body);
  const now = new Date().toISOString();
  const publishedAt =
    status === "published"
      ? (existing.publishedAt ?? now)
      : existing.publishedAt;

  await db
    .prepare(
      `UPDATE posts SET slug = ?, title = ?, body = ?, status = ?, excerpt = ?,
       updated_at = ?, published_at = ? WHERE id = ?`,
    )
    .bind(
      slug,
      input.title.trim(),
      input.body,
      status,
      excerpt,
      now,
      publishedAt,
      id,
    )
    .run();

  const post = await getPostById(id);
  if (!post) return { ok: false, error: "Failed to update post." };
  return { ok: true, post };
}

export async function deletePost(
  id: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const existing = await getPostById(id);
  if (!existing) return { ok: false, error: "Post not found." };

  const db = await getDb();
  await db.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
  return { ok: true };
}
