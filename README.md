# Portfolio (static Next.js)

Cloud-native terminal-themed portfolio with a **Logs** feed from **GitHub Issues** (`published` label), **Next.js static export** to **`out/`**, and **Cloudflare Pages** (Git-connected builds). Optional **Worker** + **Deploy Hook** rebuilds the site when Issues change: [`workers/github-issue-deploy-hook/README.md`](workers/github-issue-deploy-hook/README.md).

## Documentation

| | |
|--|--|
| **Index** | [`docs/README.md`](docs/README.md) |
| **Cloudflare setup & deploy** | [`docs/deployment-and-ci.md`](docs/deployment-and-ci.md) |
| **Env vars** | [`docs/environment-variables.md`](docs/environment-variables.md) |
| **Logs / Issues** | [`docs/logs-from-github-issues.md`](docs/logs-from-github-issues.md) |
| **GitHub PAT** | [`docs/github-token.md`](docs/github-token.md) |

Design spec: `../docs/superpowers/specs/2026-04-26-portfolio-website-design.md` in the parent workspace (or copy into `docs/` here).

---

## Local development

```bash
npm install
cp .env.example .env.local
# PORTFOLIO_REPO=owner/repo — see docs/environment-variables.md
npm run dev
```

Open **http://localhost:3000**.

## Build

```bash
export PORTFOLIO_REPO=your-username/portfolio
npm run build
```

Output: **`out/`**. Leave **`NEXT_PUBLIC_BASE_PATH`** unset on Pages at `/` ([details](docs/environment-variables.md)).

## Hosting summary

| Path | Use when |
|------|----------|
| **Cloudflare Pages + Git** | Default: build on push; add **Deploy Hook** + optional **Worker** for Issue-driven rebuilds ([guide](docs/deployment-and-ci.md)). |
| **Manual** | `npm run build` then `npx wrangler@4 pages deploy out --project-name=…`. |

## Labels (Logs)

| Label | Role |
|-------|------|
| `published` | Issue appears on the site |
| `note` | Short card in feed |
| `article` | Excerpt + **Read more** → `/logs/<number>/` |

Details: [`docs/logs-from-github-issues.md`](docs/logs-from-github-issues.md).

## Empty `article` list

[`app/logs/[id]/page.tsx`](app/logs/[id]/page.tsx) uses `export const revalidate = 0` so static export succeeds with zero article routes (Next **E87**).
