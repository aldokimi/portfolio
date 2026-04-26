# GitHub Issues → Cloudflare Pages (Worker + Deploy Hook)

[Pages Deploy Hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/) accept a **POST** and start a **new build** of your Git-connected project. This Worker verifies GitHub’s **`issues`** webhook signature, then POSTs to your hook so only real GitHub events trigger deploys.

**Simpler alternative:** In GitHub → **Webhooks**, you can POST **directly** to the Deploy Hook URL (no Worker). That works, but anyone who learns the hook URL can spam builds—treat the URL like a password. This Worker keeps the hook URL off GitHub and verifies **HMAC**.

Repo docs: [`../../docs/README.md`](../../docs/README.md).

## 1. Cloudflare Pages (Git) — one-time

1. **Workers & Pages** → **Create** → **Pages** → Connect **GitHub** → select this repo.
2. **Settings → Builds:**
   - **Production branch:** `main` (or your default).
   - **Build command:** `npm ci && npm run build` — if installs fail, use  
     `npm install --no-audit --no-fund && npm run build` (see [`../../docs/deployment-and-ci.md`](../../docs/deployment-and-ci.md)).
   - **Build output directory:** `out`
3. **Settings → Environment variables** (Production):
   - **`NODE_VERSION`** = `22.12.0` (matches [`.nvmrc`](../../.nvmrc)).
   - **`PORTFOLIO_REPO`** = `owner/repo` for Issues (often same as this repo).
   - **`GITHUB_TOKEN`** — PAT with **Issues: read** ([`../../docs/github-token.md`](../../docs/github-token.md)).
4. Run one successful deploy from the dashboard so the project is live.

## 2. Create a Deploy Hook

1. Same Pages project → **Settings** → **Builds** → **Deploy hooks** → **Add deploy hook**.
2. Name it (e.g. `github-issues`), branch **`main`**.
3. Copy the **full hook URL** (keep it secret).

## 3. Deploy this Worker

```bash
cd workers/github-issue-deploy-hook
npx wrangler@4 deploy
npx wrangler@4 secret put GITHUB_WEBHOOK_SECRET   # long random string; same as GitHub webhook secret
npx wrangler@4 secret put PAGES_DEPLOY_HOOK_URL   # paste the Deploy Hook URL from step 2
```

Use `wrangler login` (or `CLOUDFLARE_API_TOKEN` in env) if deploy fails with auth errors.

## 4. GitHub webhook

**Repo** → **Settings** → **Webhooks** → **Add webhook**:

- **Payload URL:** your Worker URL (`https://github-issue-deploy-hook.<subdomain>.workers.dev`).
- **Content type:** `application/json`.
- **Secret:** same value as `GITHUB_WEBHOOK_SECRET`.
- **Events:** **Let me select** → **Issues** only.

Save and check **Recent Deliveries** for HTTP 200.

## 5. Flow

`Issue opened/edited/…` → GitHub POSTs to Worker → signature OK → Worker POSTs Deploy Hook → Cloudflare clones repo and runs **build command** → new static site with updated `/logs`.
