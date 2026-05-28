variable "site_bucket_name" {
  type        = string
  description = "S3 bucket holding the static site"
}

variable "logs_bucket_name" {
  type        = string
  description = "S3 bucket receiving CloudFront access logs"
}

variable "localstack" {
  type        = bool
  default     = false
  description = "Skip the S3 lifecycle configuration LocalStack's community edition can't converge on"
}

variable "tags" {
  type    = map(string)
  default = {}
}
