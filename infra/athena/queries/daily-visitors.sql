-- Unique visitors per day for the last 60 days.
-- "Unique" here = distinct IP, which over-counts on shared NAT and undercounts on rotating IPs.
SELECT date,
       COUNT(DISTINCT c_ip) AS unique_visitors,
       COUNT(*) AS hits
FROM cloudfront_logs
WHERE date >= current_date - interval '60' day
  AND sc_status = 200
  AND cs_uri_stem NOT LIKE '/_next/%'
  AND cs_uri_stem NOT LIKE '/assets/%'
GROUP BY date
ORDER BY date DESC;
