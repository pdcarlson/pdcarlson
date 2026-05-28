-- Resume PDF download count by day.
SELECT date,
       COUNT(*) AS downloads
FROM cloudfront_logs
WHERE date >= current_date - interval '90' day
  AND cs_uri_stem LIKE '/assets/Paul-Carlson-Resume%'
  AND sc_status IN (200, 206)
GROUP BY date
ORDER BY date DESC;
