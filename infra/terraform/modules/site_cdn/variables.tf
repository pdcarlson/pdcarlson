variable "domain_name" {
  type        = string
  description = "Primary domain (e.g. pdcarlson.dev)"
}

variable "aliases" {
  type        = list(string)
  description = "Subject alternative names (e.g. www.pdcarlson.dev)"
  default     = []
}

variable "site_bucket_regional_domain" {
  type = string
}

variable "site_bucket_arn" {
  type = string
}

variable "logs_bucket_domain" {
  type = string
}

variable "contact_api_invoke_url" {
  type        = string
  description = "API Gateway invoke URL hostname for the contact form"
}

variable "route53_zone_id" {
  type        = string
  description = "Existing Route53 hosted zone id for the domain"
}

variable "tags" {
  type    = map(string)
  default = {}
}
