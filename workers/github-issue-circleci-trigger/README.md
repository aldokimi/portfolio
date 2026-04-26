# GitHub Issues → CircleCI trigger (Cloudflare Worker)

GitHub does not call CircleCI’s API directly. This **Worker** receives GitHub **`issues`** webhooks, verifies the signature, then **POSTs** to [CircleCI’s pipeline API](https://circleci.com/docs/api/v2/index.html#tag/Pipeline/operation/triggerPipelineByProject) with `issue_refresh: true` so the workflow `build_on_issue_webhook` in `.circleci/config.yml` runs.

## 1. Prerequisites

- Repo **followed** on [CircleCI](https://app.circleci.com/) (green **Follow Project**), default branch **`main`**.
- CircleCI **project environment variables** (Project → **Project Settings** → **Environment Variables**):
  - `GITHUB_TOKEN` — PAT with **`issues: read`** (and `repo` / public read as needed) for the Issues API at build time.
  - `CLOUDFLARE_API_TOKEN` — Cloudflare API token with **Account → Cloudflare Pages → Edit**.
  - `CLOUDFLARE_ACCOUNT_ID` — from Cloudflare dashboard.
  - `CLOUDFLARE_PAGES_PROJECT_NAME` — Pages project name (e.g. `portfolio-dhs`).

## 2. CircleCI personal API token (for the Worker)

1. CircleCI → **User Settings** → **Personal API Tokens** → create a token.
2. Deploy the Worker, then run:

   ```bash
   cd workers/github-issue-circleci-trigger
   npx wrangler@4 secret put CIRCLE_API_TOKEN
   ```

   Paste that token when prompted.

## 3. Configure `wrangler.toml`

Edit `[vars]`:

- `GH_ORG` / `GH_REPO` — GitHub owner and repo name (case as in the URL).
- `BUILD_BRANCH` — branch CircleCI should build (usually `main`).

## 4. Webhook secret

```bash
npx wrangler@4 secret put GITHUB_WEBHOOK_SECRET
```

Use a long random string; you will paste the **same** value in GitHub (webhook **Secret**).

## 5. Deploy the Worker

```bash
cd workers/github-issue-circleci-trigger
npx wrangler@4 deploy
```

Note the **Worker URL** (e.g. `https://github-issue-circleci-trigger.<your-subdomain>.workers.dev`).

## 6. GitHub webhook

In the **GitHub repo** → **Settings** → **Webhooks** → **Add webhook**:

- **Payload URL:** your Worker URL (HTTPS).
- **Content type:** `application/json`.
- **Secret:** same value as `GITHUB_WEBHOOK_SECRET`.
- **Events:** choose **Let me select individual events** → enable **Issues** only (or **Issues** + **Issue comment** if you extend the Worker later).
- Active → **Add webhook**.

Use **Recent Deliveries** to confirm `200` responses.

## Security

- Rotate `GITHUB_WEBHOOK_SECRET` and `CIRCLE_API_TOKEN` if leaked.
- The Worker only accepts **POST** with valid **HMAC** and only forwards **`issues`** events with actions: opened, edited, deleted, labeled, unlabeled.
