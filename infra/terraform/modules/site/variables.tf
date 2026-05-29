variable "site_bucket_name" {
  type        = string
  description = "S3 bucket holding the static site"
}

variable "logs_bucket_name" {
  type        = string
  description = "S3 bucket receiving CloudFront access logs"
}

variable "tags" {
  type    = map(string)
  default = {}
}
