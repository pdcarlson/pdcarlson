# Infrastructure

Everything outside the static bundle, as Terraform against real AWS.

```
infra/
├── contact-lambda/      # Lambda source for the contact form (one file, no build)
└── terraform/
    ├── modules/
    │   ├── site/        # S3 bucket for the site
    │   ├── site_cdn/    # CloudFront, ACM cert, Route 53 records
    │   ├── contact/     # Lambda, API Gateway, SES, IAM
    │   └── oidc/        # GitHub Actions OIDC provider and deploy role
    └── envs/prod/       # Puts the modules together (+ bootstrap/ for the state backend)
```

Needs Terraform 1.6 or newer and AWS credentials in the environment.

## Bootstrap (once per account)

The bootstrap root uses local state. It creates the S3 state bucket, the DynamoDB lock table, and the Route 53 hosted zone:

```bash
terraform -chdir=infra/terraform/envs/prod/bootstrap init
terraform -chdir=infra/terraform/envs/prod/bootstrap apply
```

Point the domain's nameservers at the `name_servers` output and wait for it to propagate.

## Apply

```bash
terraform -chdir=infra/terraform/envs/prod init
terraform -chdir=infra/terraform/envs/prod plan
terraform -chdir=infra/terraform/envs/prod apply
```

After the first apply, set the outputs as repo secrets:

- `AWS_DEPLOY_ROLE_ARN`: `deploy_role_arn`
- `SITE_BUCKET`: `site_bucket`
- `CF_DISTRIBUTION_ID`: `distribution_id`

## Cost

About $1 to $2 a month at portfolio traffic. The Route 53 hosted zone is $0.50 of that. S3 and CloudFront come in under $1, and the Lambda, API Gateway, SES, and the cert are free at this volume.
