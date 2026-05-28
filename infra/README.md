# Infrastructure

How this site is deployed and observed. One-time AWS setup, then everything runs from `git push`.

## Buckets and certs

- **Site bucket** — `pdcarlson-site` (or whatever). Block all public access; CloudFront reaches it via Origin Access Control (OAC).
- **Logs bucket** — `pdcarlson-logs`. Receives standard CloudFront access logs. Lifecycle rule: STANDARD_IA after 30d, delete after 365d.
- **Athena results bucket** — `pdcarlson-athena-results`. Just the workgroup output bucket.
- **ACM certificate** for `pdcarlson.dev` (and `www.pdcarlson.dev`) — must be issued in `us-east-1` for CloudFront. DNS-validated through Route 53.

## CloudFront distribution

- Origin 1: the site S3 bucket, accessed via OAC. Default behavior with `Managed-CachingOptimized`.
- Origin 2: the contact API Gateway invoke URL. Behavior with path pattern `/api/*`, `Managed-CachingDisabled`, `Managed-AllViewerExceptHostHeader`.
- Default root object: `index.html`.
- Custom error responses: 403/404 → `/404/index.html` with status 404.
- Standard logging on, target = logs bucket.

## Route 53

- A/AAAA alias records for `pdcarlson.dev` and `www.pdcarlson.dev` → the CloudFront distribution.

## OIDC + deploy role

GitHub Actions deploys with a short-lived role assumed via OIDC (no long-lived keys in repo).

1. **IAM identity provider**: GitHub Actions (`token.actions.githubusercontent.com`).
2. **IAM role** (`portfolio-deploy`) trusting that provider, scoped to `repo:pdcarlson/pdcarlson:ref:refs/heads/main`.
3. Inline policy on the role:
   - `s3:ListBucket`, `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` on the site bucket
   - `s3:PutObjectAcl` (only if needed)
   - `cloudfront:CreateInvalidation` on the distribution ARN

Store the role ARN as the `AWS_DEPLOY_ROLE_ARN` repo secret. Bucket name → `SITE_BUCKET`, distribution id → `CF_DISTRIBUTION_ID`.

## Contact form

See `contact-lambda/README.md`. Lambda + API Gateway + SES, hooked into CloudFront under `/api/*`.

## Analytics

See `athena/README.md`. Standard CloudFront logs into S3, queried from Athena.

## Estimated monthly cost

At single-digit-hundred visitors per month:

- S3 storage + transfer: under $0.50
- CloudFront: under $1 (likely free-tier)
- Route 53 hosted zone: $0.50
- ACM cert: free
- SES (one verified identity, single-digit sends): free-tier
- Athena: pennies per query

Call it $1–2/month at portfolio traffic. Free if you stay inside the AWS free tier for the first 12 months on a new account.
