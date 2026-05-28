# contact-lambda

Node 20 Lambda behind an HTTP API Gateway. Receives a JSON POST from `/api/contact`, validates, sends via SES.

## Build the artifact

```bash
npm install
npm run package
# → contact-lambda.zip
```

Terraform reads `contact-lambda.zip` directly. Both the local and prod envs depend on it; `make tf-apply-local` and `make tf-apply-prod` run `lambda-build` as a prerequisite.

## Env vars (set by Terraform)

- `MAIL_FROM` — verified SES sender
- `MAIL_TO` — destination inbox
- `AWS_REGION` — inherited from the runtime

## Spam guard

- Honeypot field (`company`) on the form — populated requests get a silent 204.
- Length caps in `index.mjs`: name 200, email 320, message 5000.
- API Gateway throttling on the stage (`throttling_rate_limit = 5`, `throttling_burst_limit = 10`).

## Run against LocalStack

```bash
docker compose up -d localstack
make lambda-build
make tf-apply-local

# fire a test invocation
curl -s -H 'content-type: application/json' \
  -X POST "$(make -s --no-print-directory awslocal-check >/dev/null; \
  docker compose run --rm terraform -chdir=infra/terraform/envs/local output -raw contact_api)/contact" \
  -d '{"name":"x","email":"x@example.com","message":"hi","honeypot":""}'
```
