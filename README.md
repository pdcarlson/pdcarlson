# pdcarlson.dev

My portfolio. Static Next.js, hosted on S3 + CloudFront. Whole stack runs locally against LocalStack, deploys to real AWS via Terraform + GitHub Actions.

## Run it

```bash
docker compose up -d            # web on :3000, localstack on :4566
make logs                       # follow the dev server
```

Or without Docker:

```bash
npm install
npm run dev
```

## Build the static site

```bash
make build                      # docker build --target builder, copies out/
# or:
npm run build
```

## Stack

- Next.js 15 (App Router, static export)
- TypeScript, Tailwind v4
- Radix Dialog for the project drawer
- Lucide for icons
- next/font for Newsreader + Inter + Abhaya Libre

## Content

`content/` holds typed TS — no CMS, no DB.

- `content/site.ts` — name, role, bio, links
- `content/resume.ts` — skills, experience, education, leadership
- `content/projects/*.ts` — one file per project, drives both the list and the side drawer
- `content/about.ts`, `content/accessibility.ts`

## Infrastructure

`infra/` is the IaC layer.

- `infra/contact-lambda/` — Node 20 Lambda source for the contact form
- `infra/athena/` — saved Athena queries for the CloudFront access-log table
- `infra/terraform/modules/` — `site`, `site_cdn`, `contact`, `analytics`, `oidc`
- `infra/terraform/envs/local/` — composition that runs against LocalStack
- `infra/terraform/envs/prod/` — composition that runs against real AWS

```bash
make lambda-build               # zip the contact lambda
make tf-init-local
make tf-apply-local             # apply against localstack
make tf-plan-prod               # dry-run against real aws
```

See `infra/README.md` for the full setup, including the one-time state-backend bootstrap.

## Deploy

GitHub Actions on push to `main`:

1. `.github/workflows/deploy.yml` builds via the Docker `builder` stage, extracts `out/`, syncs to S3, invalidates CloudFront.
2. `.github/workflows/terraform.yml` runs `terraform fmt` + `validate` on PRs that touch infra.

AWS auth via OIDC — no long-lived keys in repo or secrets.

## Analytics

CloudFront access logs → S3 → Athena. Queries live in `infra/athena/queries/`. The Glue table comes up via the analytics Terraform module.
