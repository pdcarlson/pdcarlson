# Development

Dev workflow, Terraform, and CI for the [pdcarlson.dev](https://pdcarlson.dev) source.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # writes out/
```

## Layout

```
app/                      # Next.js App Router pages
components/               # React components
content/                  # All copy + data, typed TS, no CMS
lib/                      # Small utilities
public/                   # Static assets (resume PDF, headshot, favicon)
infra/
  contact-lambda/         # Node 20 Lambda source for /api/contact
  athena/                 # Hand-runnable Athena queries
  terraform/
    modules/              # site, site_cdn, contact, analytics, oidc
    envs/prod/            # Real AWS composition (+ bootstrap/ for state backend)
.github/workflows/        # ci.yml, deploy.yml
```

## Stack

- Next.js 15 (App Router, static export)
- React 19 + TypeScript
- Tailwind v4
- Radix Dialog for the project case-study sheet
- Lucide icons
- next/font for Newsreader + Inter + Abhaya Libre

## Content

Everything lives in typed TS under `content/`. No CMS, no DB.

- `content/site.ts`: name, role, bio, links
- `content/resume.ts`: skills, experience, education, leadership
- `content/projects/*.ts`: one file per project; drives both the list page and the case-study sheet
- `content/about.ts`, `content/accessibility.ts`

Add a project: drop a new `.ts` file in `content/projects/`, export a `Project` object, add it to `content/projects/index.ts`.

## Terraform

Real AWS, S3 + DynamoDB state backend. See [`infra/README.md`](../infra/README.md) for the bootstrap and apply steps.

```bash
make tf-plan     # read-only, builds the lambda zip first
make tf-apply
```

## CI

- `CI` (`ci.yml`) runs on every PR: typecheck, static build, and terraform `fmt -check` + prod `validate`.
- `CD` (`deploy.yml`) runs on push to `main`: builds `out/`, syncs to S3 (immutable assets first), invalidates CloudFront. AWS auth via OIDC.

## Analytics

CloudFront access logs → S3 → Athena. The Glue table comes up via the analytics module. Hand-runnable queries live in `infra/athena/queries/`.

## Contact form

Form posts to `/api/contact`. CloudFront routes that path to API Gateway → Lambda → SES. Honeypot field on the form + per-stage throttling at API Gateway. Lambda source: `infra/contact-lambda/index.mjs`.

## Cost shape

At portfolio traffic, roughly $1-2/month against real AWS:

- S3 + CloudFront combined: under $1
- Route 53 hosted zone: $0.50
- ACM cert: free
- SES first 62k sends/mo: free
- Athena: cents per query
- Lambda + API Gateway: free tier
