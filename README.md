# Portfolio (static Next.js)

Cloud-native terminal-themed portfolio with a **Logs** feed backed by **GitHub Issues** (`published` label), static-exported and deployed to **Cloudflare Pages** via GitHub Actions.

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

Output is written to `out/`. For Cloudflare Pages (`*.pages.dev` or a custom domain at `/`), **do not** set `NEXT_PUBLIC_BASE_PATH` unless you truly serve the app under a subpath.

## Cloudflare Pages (GitHub Actions)

Workflow: [`.github/workflows/cloudflare-pages.yml`](.github/workflows/cloudflare-pages.yml) — runs on `push` to `main`, `workflow_dispatch`, and **issues** events (same triggers as before) so new/edited Issues rebuild the site.

### One-time setup

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → create a project whose name matches what you will set in GitHub (e.g. `portfolio`). You can use **Direct Upload** as the source if all builds come from GitHub Actions.
2. **Account ID**: Dashboard → **Workers & Pages** → your project → **Settings** (or from the URL: `dash.cloudflare.com/<account_id>/...`).
3. **API token**: [My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → **Custom token** with **Account** → **Cloudflare Pages** → **Edit** (and **Account** → **Account Settings** → **Read** if the wizard recommends it). Some setups use a user token with Pages edit on the right account.
4. In the GitHub repo → **Settings → Secrets and variables → Actions**:
   - **Secrets**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
   - **Variables** (repository **Variables** tab): `CLOUDFLARE_PAGES_PROJECT_NAME` = the exact Cloudflare Pages **project name** (not necessarily the repo name).

### Custom domain

In Cloudflare: **Workers & Pages** → your project → **Custom domains** → add your domain and follow DNS prompts. Keep `NEXT_PUBLIC_BASE_PATH` unset so assets resolve at `/`.

### Writing logs

1. Open a GitHub Issue in this repo.
2. Add labels: **`published`** (required). Optionally **`note`** or **`article`**; otherwise length rules infer the card type (see spec).
3. When the issue is saved, **Actions** rebuilds and uploads `out/` to Cloudflare Pages.

## Labels

| Label        | Role                                      |
| ------------ | ----------------------------------------- |
| `published`  | Issue appears on the site                 |
| `note`       | Short “log line” card (no detail page)   |
| `article`    | Excerpt + **Read more** → `/logs/<number>/` |

## Empty `article` list

`app/logs/[id]/page.tsx` sets `export const revalidate = 0` so `next build` with `output: 'export'` succeeds when there are zero `article` issues (Next otherwise treats an empty `generateStaticParams` as invalid). This is intentional; see Next error **E87** in the build source.
