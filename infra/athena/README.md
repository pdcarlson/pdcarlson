# Athena analytics

CloudFront access logs → S3 → Athena. The whole pipeline is essentially free at portfolio traffic levels.

## One-time setup

1. **Enable standard CloudFront logging** on the distribution. Send to a dedicated bucket (e.g. `s3://pdcarlson-logs/`). Include cookies = off.
2. **Athena**: pick a workgroup, set a results bucket (`s3://pdcarlson-athena-results/`) in workgroup settings.
3. Run `ddl.sql` once. Edit the two placeholders first:
   - `<YOUR-LOGS-BUCKET>`: the bucket from step 1
   - `<DISTRIBUTION-ID>`: the CloudFront distribution ID
4. Lifecycle policy on the logs bucket: move to `STANDARD_IA` after 30 days, expire after 365.

## Queries

Open Athena, paste any file from `queries/`, run. Partition projection means you don't have to `MSCK REPAIR TABLE` or manage partitions manually.

- `top-pages.sql`: most-visited paths in the last 30d
- `daily-visitors.sql`: unique IPs per day over 60d
- `referrers.sql`: external referrers
- `resume-downloads.sql`: PDF download counts

## Cost

CloudFront logging adds nothing to the CF bill. S3 storage is pennies. Athena charges $5/TB scanned. A portfolio's worth of logs is well under a GB even after a year, so every query costs a fraction of a cent.
