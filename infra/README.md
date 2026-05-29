# Infrastructure

Everything that lives outside the static bundle, defined as code against real AWS.

## Layout

```
infra/
├── contact-lambda/      # Node 20 Lambda source for the contact form
├── athena/              # Saved Athena queries (hand-runnable)
└── terraform/
    ├── modules/
    │   ├── site/           # S3 site bucket + logs bucket + lifecycle
    │   ├── site_cdn/       # CloudFront + ACM + Route53
    │   ├── contact/        # IAM + Lambda + API Gateway + SES
    │   ├── analytics/      # Athena workgroup + Glue table
    │   └── oidc/           # GitHub Actions OIDC provider + deploy role
    └── envs/
        └── prod/           # Real AWS composition (+ bootstrap/ for state backend)
```

Needs Terraform >= 1.6 and AWS creds in the environment.

## Bootstrap (one-time, per account)

The bootstrap root uses local state and creates the S3 state bucket, the DynamoDB lock table, and the Route 53 hosted zone:

```bash
terraform -chdir=infra/terraform/envs/prod/bootstrap init
terraform -chdir=infra/terraform/envs/prod/bootstrap apply
```

Point the domain's nameservers at the `name_servers` output, then wait for delegation to propagate.

## Apply

```bash
make tf-init
make tf-plan
make tf-apply
```

`tf-plan`/`tf-apply` build the lambda zip first. After the first apply, push the outputs as repo secrets:

- `AWS_DEPLOY_ROLE_ARN` — `deploy_role_arn` output
- `SITE_BUCKET` — `site_bucket` output
- `CF_DISTRIBUTION_ID` — `distribution_id` output

## CI

- `CD` (`deploy.yml`) — on push to `main`: builds the static site, syncs to S3, invalidates CloudFront. AWS auth via OIDC.
- `CI` (`terraform.yml`) — on PRs touching `infra/terraform/**`: `fmt -check` + `validate`.

## Cost shape at portfolio traffic

- S3 + CloudFront: under $1/mo combined
- Route 53 hosted zone: $0.50/mo
- ACM cert: free
- SES: free for the first 62k sends/mo
- Athena: cents per query, ~free
- Lambda + API Gateway: well inside free tier

Roughly $1-2/mo steady state.
