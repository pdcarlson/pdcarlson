# Development

Dev workflow, Docker setup, Terraform, and CI for the [pdcarlson.dev](https://pdcarlson.dev) source.

## One command

```bash
docker compose up --build
```

Brings up:

| Service           | URL / role                                  | Notes                                                    |
| ----------------- | ------------------------------------------- | -------------------------------------------------------- |
| `localstack`      | `http://localhost:4566`                     | Local AWS surface. Healthchecked.                        |
| `lambda-builder`  | one-shot                                    | `npm install && zip` for the contact lambda.              |
| `bootstrap`       | one-shot                                    | `terraform init && apply` against LocalStack.            |
| `web`             | `http://localhost:3000`                     | Next.js dev server.                                      |

Order is wired through `depends_on` with `service_healthy` / `service_completed_successfully` conditions. The web container starts as soon as LocalStack is healthy; the bootstrap runs in parallel and the contact form starts working once it finishes.

Detached:

```bash
docker compose up --build -d
docker compose logs -f web
```

Tear down (preserve state):

```bash
docker compose down
```

Tear down and wipe LocalStack state:

```bash
docker compose down -v
# or
make reset
```

## Without Docker

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
lib/                      # Small utilities + build-time generated JSON
public/                   # Static assets (resume PDF, headshot, favicon)
scripts/                  # Build-time scripts (GitHub fetch)
docker/                   # nginx config for the prod stage
infra/
  contact-lambda/         # Node 20 Lambda source for /api/contact
  athena/                 # Hand-runnable Athena queries
  terraform/
    modules/              # site, site_cdn, contact, analytics, oidc
    envs/local/           # LocalStack composition
    envs/prod/            # Real AWS composition (+ bootstrap/ for state backend)
.github/workflows/        # deploy.yml, terraform.yml
```

## Stack

- Next.js 15 (App Router, static export)
- React 19 + TypeScript
- Tailwind v4
- Radix Dialog for the project drawer
- Lucide icons
- next/font for Newsreader + Inter + Abhaya Libre

## Content

Everything lives in typed TS under `content/`. No CMS, no DB.

- `content/site.ts` — name, role, bio, links
- `content/resume.ts` — skills, experience, education, leadership
- `content/projects/*.ts` — one file per project; drives both the list page and the side drawer
- `content/about.ts`, `content/accessibility.ts`

Add a project: drop a new `.ts` file in `content/projects/`, export a `Project` object, add it to `content/projects/index.ts`.

## Terraform

Two envs, same modules.

```bash
# local — runs against LocalStack endpoints, local state
make tf-plan-local
make tf-apply-local

# prod — runs against real AWS, S3 + DynamoDB state backend
make tf-plan-prod
make tf-apply-prod
```

First time on a fresh AWS account, run the bootstrap to create the state bucket + lock table:

```bash
docker compose --profile cli run --rm terraform \
  -chdir=infra/terraform/envs/prod/bootstrap init

docker compose --profile cli run --rm terraform \
  -chdir=infra/terraform/envs/prod/bootstrap apply
```

Then copy `infra/terraform/envs/prod/terraform.tfvars.example` → `terraform.tfvars` and fill in the values. `make tf-init-prod && make tf-apply-prod`.

After the first prod apply, push three outputs as repo secrets:

- `AWS_DEPLOY_ROLE_ARN` ← `deploy_role_arn`
- `SITE_BUCKET` ← `site_bucket`
- `CF_DISTRIBUTION_ID` ← `distribution_id`

## CI

Two workflows:

- `.github/workflows/deploy.yml` — on push to `main`. Builds via the Docker `builder` stage, extracts `out/`, syncs to S3 (immutable assets first), invalidates CloudFront. AWS auth via OIDC.
- `.github/workflows/terraform.yml` — on PRs touching `infra/terraform/**`. Runs `fmt -check` + `validate` for both envs without backend.

## Analytics

CloudFront access logs → S3 → Athena. The Glue table comes up via the analytics module. Hand-runnable queries live in `infra/athena/queries/`.

## Contact form

Form posts to `/api/contact`. CloudFront routes that path to API Gateway → Lambda → SES. Honeypot field on the form + per-stage throttling at API Gateway. Lambda source: `infra/contact-lambda/index.mjs`.

## Cost shape

At portfolio traffic, roughly $1–2/month against real AWS:

- S3 + CloudFront combined: under $1
- Route 53 hosted zone: $0.50
- ACM cert: free
- SES first 62k sends/mo: free
- Athena: cents per query
- Lambda + API Gateway: free tier
