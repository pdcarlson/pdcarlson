-- CloudFront access logs table with partition projection (date-based).
-- Run this in Athena once. After it exists, queries are free of MSCK and
-- partition management. Athena projects the partitions from the S3 prefix.
--
-- Prereqs:
--   1. CloudFront is logging to s3://<your-logs-bucket>/<dist-id>/
--   2. You're querying from an Athena workgroup with a results bucket set.
--
-- Replace the two placeholders below before running.

CREATE EXTERNAL TABLE IF NOT EXISTS cloudfront_logs (
  `date` DATE,
  `time` STRING,
  `x_edge_location` STRING,
  `sc_bytes` BIGINT,
  `c_ip` STRING,
  `cs_method` STRING,
  `cs_host` STRING,
  `cs_uri_stem` STRING,
  `sc_status` INT,
  `cs_referer` STRING,
  `cs_user_agent` STRING,
  `cs_uri_query` STRING,
  `cs_cookie` STRING,
  `x_edge_result_type` STRING,
  `x_edge_request_id` STRING,
  `x_host_header` STRING,
  `cs_protocol` STRING,
  `cs_bytes` BIGINT,
  `time_taken` FLOAT,
  `x_forwarded_for` STRING,
  `ssl_protocol` STRING,
  `ssl_cipher` STRING,
  `x_edge_response_result_type` STRING,
  `cs_protocol_version` STRING,
  `fle_status` STRING,
  `fle_encrypted_fields` INT,
  `c_port` INT,
  `time_to_first_byte` FLOAT,
  `x_edge_detailed_result_type` STRING,
  `sc_content_type` STRING,
  `sc_content_len` BIGINT,
  `sc_range_start` BIGINT,
  `sc_range_end` BIGINT
)
PARTITIONED BY (`year` STRING, `month` STRING, `day` STRING)
ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
LOCATION 's3://<YOUR-LOGS-BUCKET>/<DISTRIBUTION-ID>/'
TBLPROPERTIES (
  'skip.header.line.count' = '2',
  'projection.enabled' = 'true',
  'projection.year.type' = 'integer',
  'projection.year.range' = '2026,2035',
  'projection.year.digits' = '4',
  'projection.month.type' = 'integer',
  'projection.month.range' = '1,12',
  'projection.month.digits' = '2',
  'projection.day.type' = 'integer',
  'projection.day.range' = '1,31',
  'projection.day.digits' = '2',
  'storage.location.template' = 's3://<YOUR-LOGS-BUCKET>/<DISTRIBUTION-ID>/${year}/${month}/${day}'
);
