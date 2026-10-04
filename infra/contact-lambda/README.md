# contact-lambda

Node 22 Lambda behind an HTTP API Gateway. Receives a JSON POST from `/api/contact`, validates it, and sends it through SES.

There is no build step. The handler is the one file here, the Lambda runtime already includes the AWS SDK, and Terraform zips `index.mjs` on its own during a plan or apply.

## Env vars (set by Terraform)

- `MAIL_FROM`: verified SES sender
- `MAIL_TO`: destination inbox
- `AWS_REGION`: inherited from the runtime

## Spam guard

- Honeypot field (`company`) on the form. A request that fills it in gets a silent 204.
- Length caps in `index.mjs`: name 200, email 320, message 5000.
- API Gateway throttling on the stage (`throttling_rate_limit = 5`, `throttling_burst_limit = 10`).

## Test a deployed endpoint

```bash
curl -s -H 'content-type: application/json' \
  -X POST https://pdcarlson.dev/api/contact \
  -d '{"name":"x","email":"x@example.com","message":"hi","honeypot":""}'
```
