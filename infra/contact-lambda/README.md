# contact-lambda

Tiny Lambda behind API Gateway that takes a JSON POST from the contact form and forwards it via SES.

## Build

```bash
npm install
npm run package
# produces contact-lambda.zip
```

## Deploy (one-time, by hand)

1. **SES**: verify both the from-address and the to-address (sandbox mode is fine for a portfolio). Region `us-east-1`.
2. **Lambda**: Node 20 runtime, handler `index.handler`, upload `contact-lambda.zip`. Env vars:
   - `MAIL_FROM` — e.g. `no-reply@pdcarlson.dev` (must be SES-verified)
   - `MAIL_TO` — your inbox
   - `AWS_REGION` — `us-east-1`
3. **IAM role** for the Lambda: attach a policy with `ses:SendEmail` on the verified identity ARN.
4. **API Gateway (HTTP API)**: create one route `POST /contact`, integration target = the Lambda. Set throttling on the stage (e.g. 5 req/min/IP via a per-IP rate limit, or rely on CloudFront's overall stage throttling).
5. **CloudFront**: add an origin pointing at the API Gateway invoke URL, then add a behavior with path pattern `/api/*` routing to that origin. Origin path = the stage name. Cache policy: `Managed-CachingDisabled`. Origin request policy: `Managed-AllViewerExceptHostHeader`.
6. **Test**: `curl -i -X POST https://pdcarlson.dev/api/contact -d '{"name":"x","email":"x@example.com","message":"hello"}'`

## Spam guard

- `honeypot` field on the form (`name="company"`) — populated requests get 204'd silently
- Input length caps in `index.mjs`
- API Gateway throttling at the stage level
- (Optional) Add a Cloudflare Turnstile or AWS WAF rule if abuse becomes a problem
