resource "aws_s3_bucket" "results" {
  bucket = "${var.name_prefix}-results"
  tags   = var.tags
}

resource "aws_s3_bucket_public_access_block" "results" {
  bucket                  = aws_s3_bucket.results.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_athena_workgroup" "site" {
  count = var.localstack ? 0 : 1
  name  = var.name_prefix
  tags  = var.tags

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://${aws_s3_bucket.results.bucket}/"
    }
  }
}

resource "aws_glue_catalog_database" "site" {
  count = var.localstack ? 0 : 1
  name  = replace(var.name_prefix, "-", "_")
}

resource "aws_glue_catalog_table" "cloudfront_logs" {
  count         = var.localstack ? 0 : 1
  name          = "cloudfront_logs"
  database_name = aws_glue_catalog_database.site[0].name
  table_type    = "EXTERNAL_TABLE"

  parameters = {
    EXTERNAL                    = "TRUE"
    "projection.enabled"        = "true"
    "projection.year.type"      = "integer"
    "projection.year.range"     = "2026,2035"
    "projection.year.digits"    = "4"
    "projection.month.type"     = "integer"
    "projection.month.range"    = "1,12"
    "projection.month.digits"   = "2"
    "projection.day.type"       = "integer"
    "projection.day.range"      = "1,31"
    "projection.day.digits"     = "2"
    "storage.location.template" = "s3://${var.logs_bucket_name}/${var.cloudfront_distribution_id}/$${year}/$${month}/$${day}"
    "skip.header.line.count"    = "2"
  }

  partition_keys {
    name = "year"
    type = "string"
  }
  partition_keys {
    name = "month"
    type = "string"
  }
  partition_keys {
    name = "day"
    type = "string"
  }

  storage_descriptor {
    location      = "s3://${var.logs_bucket_name}/${var.cloudfront_distribution_id}/"
    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      serialization_library = "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe"
      parameters = {
        "field.delim"          = "\t"
        "serialization.format" = "\t"
      }
    }

    dynamic "columns" {
      for_each = local.columns
      content {
        name = columns.value.name
        type = columns.value.type
      }
    }
  }
}

locals {
  columns = [
    { name = "date", type = "date" },
    { name = "time", type = "string" },
    { name = "x_edge_location", type = "string" },
    { name = "sc_bytes", type = "bigint" },
    { name = "c_ip", type = "string" },
    { name = "cs_method", type = "string" },
    { name = "cs_host", type = "string" },
    { name = "cs_uri_stem", type = "string" },
    { name = "sc_status", type = "int" },
    { name = "cs_referer", type = "string" },
    { name = "cs_user_agent", type = "string" },
    { name = "cs_uri_query", type = "string" },
    { name = "cs_cookie", type = "string" },
    { name = "x_edge_result_type", type = "string" },
    { name = "x_edge_request_id", type = "string" },
    { name = "x_host_header", type = "string" },
    { name = "cs_protocol", type = "string" },
    { name = "cs_bytes", type = "bigint" },
    { name = "time_taken", type = "float" },
    { name = "x_forwarded_for", type = "string" },
    { name = "ssl_protocol", type = "string" },
    { name = "ssl_cipher", type = "string" },
    { name = "x_edge_response_result_type", type = "string" },
    { name = "cs_protocol_version", type = "string" },
    { name = "fle_status", type = "string" },
    { name = "fle_encrypted_fields", type = "int" },
    { name = "c_port", type = "int" },
    { name = "time_to_first_byte", type = "float" },
    { name = "x_edge_detailed_result_type", type = "string" },
    { name = "sc_content_type", type = "string" },
    { name = "sc_content_len", type = "bigint" },
    { name = "sc_range_start", type = "bigint" },
    { name = "sc_range_end", type = "bigint" },
  ]
}
