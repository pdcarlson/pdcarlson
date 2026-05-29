-- Top pages over the last 30 days, excluding asset hits.
SELECT cs_uri_stem AS path,
       COUNT(*) AS hits,
       COUNT(DISTINCT c_ip) AS unique_visitors
FROM cloudfront_logs
WHERE date >= current_date - interval '30' day
  AND sc_status = 200
  AND cs_uri_stem NOT LIKE '/_next/%'
  AND cs_uri_stem NOT LIKE '/assets/%'
  AND cs_uri_stem NOT LIKE '%.svg'
  AND cs_uri_stem NOT LIKE '%.png'
  AND cs_uri_stem NOT LIKE '%.jpg'
  AND cs_uri_stem NOT LIKE '%.jpeg'
  AND cs_uri_stem NOT LIKE '%.ico'
GROUP BY cs_uri_stem
ORDER BY hits DESC
LIMIT 50;
