# contact-lambda

Node 20 Lambda behind an HTTP API Gateway. Receives a JSON POST from `/api/contact`, validates, sends via SES.

## Build the artifact

```bash
npm install
npm run package
# → contact-lambda.zip
```

Terraform reads `contact-lambda.zip` directly; `make tf-plan` and `make tf-apply` run `lambda-build` first.

## Env vars (set by Terraform)

- `MAIL_FROM` — verified SES sender
- `MAIL_TO` — destination inbox
- `AWS_REGION` — inherited from the runtime

## Spam guard

- Honeypot field (`company`) on the form — populated requests get a silent 204.
- Length caps in `index.mjs`: name 200, email 320, message 5000.
- API Gateway throttling on the stage (`throttling_rate_limit = 5`, `throttling_burst_limit = 10`).

## Test a deployed endpoint

```bash
curl -s -H 'content-type: application/json' \
  -X POST https://pdcarlson.dev/api/contact \
  -d '{"name":"x","email":"x@example.com","message":"hi","honeypot":""}'
```
