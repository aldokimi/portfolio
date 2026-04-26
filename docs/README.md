# Portfolio documentation

| Doc | What it covers |
|-----|----------------|
| [Environment variables](environment-variables.md) | Local `.env.local` and **Cloudflare Pages** / **Worker** secrets. |
| [Deployment & CI](deployment-and-ci.md) | **Cloudflare Pages** Git build, Deploy Hooks, Issue-triggered rebuilds, domain, troubleshooting. |
| [Logs from GitHub Issues](logs-from-github-issues.md) | Labels, card types, rebuilds, code pointers. |
| [GitHub personal access token](github-token.md) | Creating a PAT for builds. |

**Issue → new deploy:** optional Worker [`../workers/github-issue-deploy-hook/`](../workers/github-issue-deploy-hook/README.md) + [Pages Deploy Hook](https://developers.cloudflare.com/pages/configuration/deploy-hooks/).

Design spec (architecture): `../docs/superpowers/specs/2026-04-26-portfolio-website-design.md` at the monorepo root, or copy into this repo’s `docs/` if you prefer.
