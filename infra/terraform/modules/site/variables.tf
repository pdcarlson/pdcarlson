variable "site_bucket_name" {
  type        = string
  description = "S3 bucket holding the static site"
}

variable "tags" {
  type    = map(string)
  default = {}
}
