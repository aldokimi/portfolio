# Environment variables

Values are read at **`npm run build`** (static export). Do not commit secrets.

---

## Local (`.env.local`)

Copy from [`.env.example`](../.env.example).

| Variable | Required | Description |
|----------|----------|-------------|
| `PORTFOLIO_REPO` | Yes for `/logs` | `owner/repo` whose **Issues** feed the site. |
| `GITHUB_TOKEN` | No | PAT; higher API limits and needed for private issue sources. |
| `NEXT_PUBLIC_BASE_PATH` | Rarely | Only if the site is under a **subpath** (unusual on `*.pages.dev` / apex domain). |

---

## Cloudflare Pages (dashboard → project → Settings → Variables)

Used when **Cloudflare builds from Git**.

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_VERSION` | Recommended | e.g. `22.14.0` — matches [`.nvmrc`](../.nvmrc). Must be **≥ 22.13.0** (eslint / Next toolchain); older 22.x causes `EBADENGINE` on Cloudflare. |
| `PORTFOLIO_REPO` | Yes | `owner/repo` for the GitHub Issues API. |
| `GITHUB_TOKEN` | Recommended | PAT with **Issues: read** on that repo. |

---

## Worker `github-issue-deploy-hook`

See [`../workers/github-issue-deploy-hook/README.md`](../workers/github-issue-deploy-hook/README.md).

**Secrets** (`wrangler secret put`):

| Secret | Description |
|--------|-------------|
| `GITHUB_WEBHOOK_SECRET` | Same secret as in the GitHub webhook configuration. |
| `PAGES_DEPLOY_HOOK_URL` | Full **Deploy Hook** URL from Pages → **Settings** → **Builds** → **Deploy hooks**. |

No plain `[vars]` are required for the minimal Worker.
