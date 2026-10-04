export type PostStatus = "draft" | "published";

export type Post = {
  id: number;
  slug: string;
  title: string;
  body: string;
  status: PostStatus;
  excerpt: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type PostInput = {
  title: string;
  slug: string;
  body: string;
};
