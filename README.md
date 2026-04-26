# Portfolio (static Next.js)

Cloud-native terminal-themed portfolio with a **Logs** feed backed by **GitHub Issues** (`published` label), static-exported and deployed to **Cloudflare Pages**. CI is **CircleCI** (see [`.circleci/config.yml`](.circleci/config.yml)); **GitHub Issues** can trigger deploys via the optional **Worker** in [`workers/github-issue-circleci-trigger/`](workers/github-issue-circleci-trigger/README.md).

Design spec (source of truth): `../docs/superpowers/specs/2026-04-26-portfolio-website-design.md` in the parent workspace, or copy it into this repo if you prefer docs colocated.

## Local development

```bash
npm install
cp .env.example .env.local
# Set PORTFOLIO_REPO=owner/repo matching this repository.
npm run dev
```

Open **http://localhost:3000**.

## Build (static export)

```bash
export PORTFOLIO_REPO=your-username/portfolio
# Optional: export GITHUB_TOKEN=... for higher rate limits
npm run build
```

Output is written to `out/`. For Cloudflare Pages (`*.pages.dev` or a custom domain at `/`), **do not** set `NEXT_PUBLIC_BASE_PATH` unless you truly serve the app under a subpath.

## Deploying to Cloudflare Pages

### C) CircleCI (build + deploy + Issues webhook)

1. Sign in at [CircleCI](https://app.circleci.com/) and **Follow** this GitHub project (default branch **`main`**).
2. **Project Settings → Environment Variables** (add as **masked** where possible):
   - **`GITHUB_TOKEN`** — GitHub PAT with **`issues: read`** on this repo (for `npm run build` to load Issues).
   - **`CLOUDFLARE_API_TOKEN`** — Cloudflare token with **Pages → Edit**.
   - **`CLOUDFLARE_ACCOUNT_ID`**
   - **`CLOUDFLARE_PAGES_PROJECT_NAME`** — your Pages project name.
3. Push to **`main`** — workflow **`build_on_push`** runs: `npm ci` → `npm run build` → `wrangler pages deploy out`.
4. **Issue-triggered deploys:** GitHub cannot call CircleCI directly. Deploy the small Worker in [`workers/github-issue-circleci-trigger/`](workers/github-issue-circleci-trigger/README.md), then add a GitHub **Issues** webhook pointing at the Worker URL (full steps in that README).

### A) Cloudflare builds from Git (no CircleCI)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → connect your **Git** provider and this repository.
2. Configure build:
   - **Build command:** `npm ci && npm run build` (or `npm run build` if install is separate)
   - **Build output directory:** `out`
   - **Root directory:** `/` (repo root), unless the app lives in a subfolder.
3. Under **Settings → Environment variables** for the Pages project, add (at least for **Production**):
   - **`PORTFOLIO_REPO`** = `owner/repo` of the GitHub repo that holds your Issues (often the same as this repo).
   - **`GITHUB_TOKEN`** = a GitHub PAT with permission to **read issues** on that repo (treat as secret).
4. **Production branch:** e.g. `main`. Cloudflare will rebuild on **pushes** to that branch.

**Note:** GitHub **Issues** do not trigger Cloudflare’s Git builds. After you publish or edit an Issue, either **push a commit** (e.g. empty commit) to trigger a rebuild, or use **Workers & Pages** → your project → **Deployments** → **Retry deployment** / create a new deployment from the UI.

### B) Local build + Wrangler (no CI)

```bash
npm run build
npx wrangler pages deploy out --project-name=YOUR_CLOUDFLARE_PAGES_PROJECT_NAME
```

Use a Wrangler/API token with **Cloudflare Pages → Edit** on your account. Set `CLOUDFLARE_ACCOUNT_ID` in the environment if Wrangler asks for it.

### Custom domain

**Workers & Pages** → your project → **Custom domains** → add the domain and follow DNS. Keep `NEXT_PUBLIC_BASE_PATH` unset for serving at `/`.

## Writing logs

1. Open a GitHub Issue in the repo referenced by **`PORTFOLIO_REPO`**.
2. Add labels: **`published`** (required). Optionally **`note`** or **`article`**; otherwise length rules infer the card type (see spec).
3. Trigger a new Cloudflare build (push to production branch, dashboard retry, or manual `wrangler pages deploy` as above) so `/logs/` picks up the change.

## Labels

| Label        | Role                                      |
| ------------ | ----------------------------------------- |
| `published`  | Issue appears on the site                 |
| `note`       | Short “log line” card (no detail page)   |
| `article`    | Excerpt + **Read more** → `/logs/<number>/` |

## Empty `article` list

`app/logs/[id]/page.tsx` sets `export const revalidate = 0` so `next build` with `output: 'export'` succeeds when there are zero `article` issues (Next otherwise treats an empty `generateStaticParams` as invalid). This is intentional; see Next error **E87** in the build source.
