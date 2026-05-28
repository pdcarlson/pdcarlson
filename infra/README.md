# Infrastructure

Everything that lives outside the static bundle. Defined as code, runnable locally against LocalStack and against real AWS from the same modules.

## Layout

```
infra/
├── contact-lambda/      # Node 20 Lambda source for the contact form
├── athena/              # Saved Athena queries (hand-runnable)
└── terraform/
    ├── modules/
    │   ├── site/           # S3 site bucket + logs bucket + lifecycle
    │   ├── site_cdn/       # CloudFront + ACM + Route53 (prod only)
    │   ├── contact/        # IAM + Lambda + API Gateway + SES
    │   ├── analytics/      # Athena workgroup + Glue table
    │   └── oidc/           # GitHub Actions OIDC provider + deploy role
    └── envs/
        ├── local/          # LocalStack composition
        └── prod/           # Real AWS composition (+ bootstrap/ for state backend)
```

## Local stack (LocalStack)

`docker compose up -d` brings up Next on `:3000` and LocalStack on `:4566`. Then:

```bash
make lambda-build       # produces infra/contact-lambda/contact-lambda.zip
make tf-init-local
make tf-apply-local
make awslocal-check
```

CloudFront, ACM, and Route 53 are skipped in the local env (LocalStack community doesn't cover them). The bucket, Lambda, API Gateway, SES sandbox, Athena workgroup, and Glue table all come up against LocalStack.

## Prod (real AWS)

One-time bootstrap (state backend):

```bash
docker compose run --rm terraform -chdir=infra/terraform/envs/prod/bootstrap init
docker compose run --rm terraform -chdir=infra/terraform/envs/prod/bootstrap apply
```

Copy `envs/prod/terraform.tfvars.example` → `envs/prod/terraform.tfvars`, fill the values, then:

```bash
make tf-init-prod
make tf-plan-prod
make tf-apply-prod
```

After apply, push the GitHub repo secrets surfaced as outputs:

- `AWS_DEPLOY_ROLE_ARN` — `deploy_role_arn` output
- `SITE_BUCKET` — `site_bucket` output
- `CF_DISTRIBUTION_ID` — `distribution_id` output

## CI

- `.github/workflows/deploy.yml` — on push to `main`, builds via the Docker `builder` stage, extracts `/app/out`, syncs to S3, invalidates CloudFront.
- `.github/workflows/terraform.yml` — on PRs touching `infra/terraform/**`, runs `fmt` + `validate` for both envs.

## Cost shape at portfolio traffic

- S3 + CloudFront: under $1/mo combined
- Route 53 hosted zone: $0.50/mo
- ACM cert: free
- SES: free for the first 62k sends/mo
- Athena: cents per query, ~free
- Lambda + API Gateway: well inside free tier

Roughly $1-2/mo steady state.
