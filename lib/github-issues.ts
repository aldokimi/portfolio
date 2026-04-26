import {
  ARTICLE_LABEL,
  EXCERPT_MAX_CHARS,
  INFER_NOTE_MAX_CHARS,
  NOTE_LABEL,
  PUBLISHED_LABEL,
} from "./config";

export type LogKind = "note" | "article";

export type LogEntry = {
  number: number;
  title: string;
  body: string;
  kind: LogKind;
  excerpt: string | null;
  updatedAt: string;
  htmlUrl: string;
};

type GithubLabel = { name?: string };

type GithubIssue = {
  number: number;
  title: string;
  body: string | null;
  labels?: GithubLabel[] | unknown;
  updated_at: string;
  html_url: string;
  pull_request?: unknown;
};

function labelNames(labels: GithubIssue["labels"]): string[] {
  if (!Array.isArray(labels)) return [];
  return labels
    .map((l) => (typeof l === "object" && l && "name" in l ? String(l.name) : ""))
    .filter(Boolean);
}

function hasLabel(names: string[], target: string): boolean {
  const t = target.toLowerCase();
  return names.some((n) => n.toLowerCase() === t);
}

export function excerptFromBody(body: string): string {
  const trimmed = body.trim();
  const firstBlock = (trimmed.split(/\n\n+/)[0] ?? trimmed).trim();
  if (firstBlock.length <= EXCERPT_MAX_CHARS) return firstBlock;
  return `${firstBlock.slice(0, EXCERPT_MAX_CHARS).trimEnd()}…`;
}

export function normalizeGithubIssue(raw: GithubIssue): LogEntry | null {
  if (raw.pull_request) return null;

  const names = labelNames(raw.labels);
  if (!hasLabel(names, PUBLISHED_LABEL)) return null;

  const body = (raw.body ?? "").trim();
  if (!body) {
    console.warn(
      `[portfolio] Skipping issue #${raw.number}: empty body while labeled "${PUBLISHED_LABEL}"`,
    );
    return null;
  }

  let kind: LogKind;
  if (hasLabel(names, NOTE_LABEL)) kind = "note";
  else if (hasLabel(names, ARTICLE_LABEL)) kind = "article";
  else kind = body.length <= INFER_NOTE_MAX_CHARS ? "note" : "article";

  return {
    number: raw.number,
    title: raw.title.trim() || `Issue #${raw.number}`,
    body,
    kind,
    excerpt: kind === "article" ? excerptFromBody(body) : null,
    updatedAt: raw.updated_at,
    htmlUrl: raw.html_url,
  };
}

function repoSlug(): string | null {
  return process.env.PORTFOLIO_REPO ?? process.env.GITHUB_REPOSITORY ?? null;
}

async function fetchIssuesPage(
  repo: string,
  page: number,
  token: string | undefined,
): Promise<GithubIssue[]> {
  const url = new URL(`https://api.github.com/repos/${repo}/issues`);
  url.searchParams.set("labels", PUBLISHED_LABEL);
  url.searchParams.set("state", "all");
  url.searchParams.set("per_page", "50");
  url.searchParams.set("page", String(page));

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url.toString(), {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `GitHub issues fetch failed (${res.status}): ${text.slice(0, 200)}`,
    );
  }

  return (await res.json()) as GithubIssue[];
}

/** Fetches published issues from the configured repo (build-time / CI). */
export async function fetchPublishedLogEntries(): Promise<LogEntry[]> {
  const repo = repoSlug();
  if (!repo) {
    console.warn(
      "[portfolio] Set PORTFOLIO_REPO (e.g. in .env.local) or GITHUB_REPOSITORY in CI; Logs feed is empty.",
    );
    return [];
  }

  const token = process.env.GITHUB_TOKEN;
  const merged: LogEntry[] = [];
  const seen = new Set<number>();

  for (let page = 1; page <= 10; page += 1) {
    const batch = await fetchIssuesPage(repo, page, token);
    if (batch.length === 0) break;

    for (const raw of batch) {
      const entry = normalizeGithubIssue(raw);
      if (!entry || seen.has(entry.number)) continue;
      seen.add(entry.number);
      merged.push(entry);
    }

    if (batch.length < 50) break;
  }

  merged.sort(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );

  return merged;
}
