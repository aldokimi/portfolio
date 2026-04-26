/** Label on GitHub Issues required for an item to appear on /logs */
export const PUBLISHED_LABEL = "published";

export const NOTE_LABEL = "note";

export const ARTICLE_LABEL = "article";

/** When neither `note` nor `article` is set, infer `note` if body length ≤ this (chars, trimmed). */
export const INFER_NOTE_MAX_CHARS = 320;

/** Fallback excerpt cap when the first paragraph has no break. */
export const EXCERPT_MAX_CHARS = 280;
