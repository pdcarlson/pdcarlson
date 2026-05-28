# pdcarlson.dev

My portfolio. Static Next.js, hosted on S3 + CloudFront.

## Run it

```bash
npm install
npm run dev
```

## Stack

- Next.js 15 (App Router, static export)
- TypeScript, Tailwind v4
- Radix Dialog for the project drawer
- Lucide for icons

## Content

Everything lives in `content/` as typed TS — no CMS, no DB.

- `content/site.ts` — name, role, bio, links
- `content/resume.ts` — skills, experience, education, leadership
- `content/projects/*.ts` — one file per project (also drives the side drawer)
- `content/about.ts`, `content/accessibility.ts`

## Deploy

GitHub Actions on push to `main`: build → `aws s3 sync out/ s3://...` → CloudFront invalidate. AWS auth via OIDC, no long-lived keys.

## Contact form

Static page posts to `/api/contact`, which CloudFront routes to an API Gateway → Lambda → SES path. Honeypot field + throttling at the gateway.

## Analytics

CloudFront access logs to S3, queried with Athena. DDL and saved queries live in `infra/athena/`.
