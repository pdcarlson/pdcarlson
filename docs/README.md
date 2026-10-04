# Development

How the [pdcarlson.dev](https://pdcarlson.dev) source is laid out and how it ships.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # writes out/
```

`npm run typecheck` and `npm run lint` are the other two checks CI runs.

## Layout

```
app/                      # Next.js App Router pages
components/               # React components
content/                  # All copy and data, typed TS, no CMS
lib/                      # Metadata and social card helpers
assets/fonts/             # TTFs for the social cards, build time only
public/                   # Resume PDF, screenshots, icons
infra/
  contact-lambda/         # Lambda behind /api/contact
  terraform/
    modules/              # site, site_cdn, contact, oidc
    envs/prod/            # The real AWS setup (+ bootstrap/ for the state backend)
.github/workflows/        # ci.yml, deploy.yml
```

## Stack

- Next.js 15 (App Router, static export)
- React 19 and TypeScript
- Tailwind v4
- Fraunces and Inter through next/font

## Content

Everything lives in typed TS under `content/`.

- `site.ts`: name, role, links
- `home.ts`: hero, about, and contact copy
- `projects/*.ts`: one file per project. Each one drives a row in the home work index and its `/projects/[slug]` case study
- `resume.ts`: the resume page
- `accessibility.ts`: the accessibility page

To add a project, add a file in `content/projects/` that exports a `Project` and list it in `content/projects/index.ts`.

## Design tokens

Colors, type sizes, and motion are defined once in `app/globals.css`. Type is named by role (`text-case-body`, `text-hero-display`) instead of by size. The link underline, the outline button, and the grain live in the same file.

## Social cards

Each page gets its own card, drawn by `lib/og.tsx` from an `opengraph-image.tsx` next to the page. Next writes these to `out/` with no file extension, so `deploy.yml` uploads them in a separate pass with the content type spelled out.

## CI and deploy

- `ci.yml` runs on every PR: typecheck, lint, build, and a terraform format check and validate.
- `deploy.yml` runs on push to `main`: builds `out/`, syncs it to S3, and invalidates CloudFront. AWS auth is OIDC, no stored keys.

## Infra

S3 and CloudFront for the site, and a Lambda behind API Gateway that sends the contact form through SES. See [`infra/README.md`](../infra/README.md).
