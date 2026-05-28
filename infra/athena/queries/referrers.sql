-- Where visits are coming from, excluding self.
SELECT cs_referer AS referrer,
       COUNT(*) AS hits
FROM cloudfront_logs
WHERE date >= current_date - interval '30' day
  AND sc_status = 200
  AND cs_referer <> '-'
  AND cs_referer NOT LIKE '%pdcarlson.dev%'
  AND cs_uri_stem NOT LIKE '/_next/%'
  AND cs_uri_stem NOT LIKE '/assets/%'
GROUP BY cs_referer
ORDER BY hits DESC
LIMIT 50;
