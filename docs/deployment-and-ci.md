# Deployment & CI (Cloudflare Pages)

The app is a **Next.js static export** (`output: 'export'`). Production output is **`out/`**, hosted on **Cloudflare Pages** with **Git-connected builds**. There is **no CircleCI** in this repo.

---

## 1. Connect the repository to Pages

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → GitHub → authorize → select **this repository**.
2. **Production branch:** `main` (or your default branch).

### Build settings

| Field | Value |
|-------|--------|
| **Root directory** | `/` (repo root) |
| **Build command** | **`npm run pages:build`** (uses `npm install` + `next build`; more reliable on Cloudflare than `npm ci`). Use `npm ci && npm run build` only if you prefer strict lockfile installs and your builder has enough RAM. |
| **Build output directory** | `out` |

### Environment variables (Production)

See [environment-variables.md](environment-variables.md#cloudflare-pages). At minimum:

- **`NODE_VERSION`** = `22.14.0` — **required in the Pages dashboard**. If the build log still shows `nodejs@22.12.0`, an old **`NODE_VERSION`** (or the default before `.nvmrc` is applied) is winning; **change or add** `NODE_VERSION` to `22.14.0`, save, redeploy. Dashboard vars override [`.nvmrc`](../.nvmrc) for the install step.
- **`PORTFOLIO_REPO`** = `owner/repo` for GitHub Issues.
- **`GITHUB_TOKEN`** — PAT with **Issues: read** ([github-token.md](github-token.md)).

Save and **Save and Deploy** (or trigger a build).

---

## 2. Rebuild when Issues change (Deploy Hook)

Git pushes rebuild automatically; **Issues** do not. Use a **[Deploy Hook](https://developers.cloudflare.com/pages/configuration/deploy-hooks/)**:

1. Pages project → **Settings** → **Builds** → **Deploy hooks** → **Add deploy hook**.
2. Pick a name and branch **`main`** (same as production).
3. Copy the **hook URL** — it is a secret (anyone with it can trigger builds).

**Option A — Worker (recommended):** deploy [`workers/github-issue-deploy-hook/`](../workers/github-issue-deploy-hook/) so GitHub sends webhooks to the Worker; the Worker verifies **HMAC** and POSTs to the hook. Steps: [Worker README](../workers/github-issue-deploy-hook/README.md).

**Option B — Direct:** GitHub **Webhooks** → POST **directly** to the Deploy Hook URL (no Worker). Simpler, but the hook URL must stay private.

---

## 3. Custom domain

**Workers & Pages** → project → **Custom domains** → add apex / `www` and apply DNS. Leave **`NEXT_PUBLIC_BASE_PATH`** unset when serving at `/`.

---

## 4. Manual deploy (no Git build)

```bash
npm run build
npx wrangler@4 pages deploy out --project-name=YOUR_PAGES_PROJECT_NAME
```

Needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment.

---

## Troubleshooting

| Symptom | Check |
|--------|--------|
| `/logs` empty after build | `GITHUB_TOKEN` / `PORTFOLIO_REPO`; Issues have **`published`** label. |
| `npm warn EBADENGINE` … `eslint-visitor-keys` … `^22.13.0` | Set **`NODE_VERSION`** to **22.14.0** (or any **≥ 22.13.0**) in Pages and match [`.nvmrc`](../.nvmrc). **22.12.0 is too old** for current eslint deps. |
| Cloudflare: `Exit handler never called` during `npm ci` | Set build command to **`npm run pages:build`** (see [package.json](../package.json) `pages:build`). That avoids `npm clean-install`, which often dies on **low RAM** builders after several minutes. |
| Worker returns 401 | GitHub webhook **secret** matches Worker `GITHUB_WEBHOOK_SECRET`. |
| Deploy hook returns error | Hook URL correct; branch exists; Pages Git integration still connected. |
| Wrangler deploy fails | API token has **Pages → Edit**; account id and project name correct. |
