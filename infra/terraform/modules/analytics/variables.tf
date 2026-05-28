variable "name_prefix" {
  type    = string
  default = "portfolio-analytics"
}

variable "logs_bucket_name" {
  type        = string
  description = "Bucket holding CloudFront access logs"
}

variable "cloudfront_distribution_id" {
  type        = string
  description = "Distribution id used as the prefix inside the logs bucket. Use a placeholder for local."
}

variable "localstack" {
  type        = bool
  default     = false
  description = "Skip Athena/Glue resources LocalStack's community edition doesn't implement"
}

variable "tags" {
  type    = map(string)
  default = {}
}
