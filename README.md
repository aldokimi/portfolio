# Portfolio (static Next.js)

Cloud-native terminal-themed portfolio with a **Logs** feed backed by **GitHub Issues** (`published` label), static-exported and deployed to **GitHub Pages**.

Design spec (source of truth): `../docs/superpowers/specs/2026-04-26-portfolio-website-design.md` in the parent workspace, or copy it into this repo if you prefer docs colocated.

## Local development

```bash
npm install
cp .env.example .env.local
# Set PORTFOLIO_REPO=owner/repo matching this repository.
npm run dev
```

## Build (static export)

```bash
export PORTFOLIO_REPO=your-username/portfolio
# Optional: export GITHUB_TOKEN=... for higher rate limits
npm run build
```

Output is written to `out/`.

## GitHub Pages

1. Repo **Settings → Pages**: set **Source** to **GitHub Actions**.
2. Default workflow sets `NEXT_PUBLIC_BASE_PATH` to `/<repository-name>` for project pages (`https://<user>.github.io/<repo>/`).
3. If you use a **user site** repo (`<user>.github.io`) or a **custom domain** with the site at `/`, remove `NEXT_PUBLIC_BASE_PATH` from `.github/workflows/pages.yml` and from `next.config.ts` usage (leave unset).

## Writing logs

1. Open a GitHub Issue in this repo.
2. Add labels: **`published`** (required). Optionally **`note`** or **`article`**; otherwise length rules infer the card type (see spec).
3. When the issue is saved, **Actions** rebuilds the site so `/logs/` updates.

## Labels

| Label        | Role                                      |
| ------------ | ----------------------------------------- |
| `published`  | Issue appears on the site                 |
| `note`       | Short “log line” card (no detail page)   |
| `article`    | Excerpt + **Read more** → `/logs/<number>/` |

## Empty `article` list

`app/logs/[id]/page.tsx` sets `export const revalidate = 0` so `next build` with `output: 'export'` succeeds when there are zero `article` issues (Next otherwise treats an empty `generateStaticParams` as invalid). This is intentional; see Next error **E87** in the build source.
