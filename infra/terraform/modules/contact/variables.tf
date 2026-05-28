variable "name_prefix" {
  type    = string
  default = "portfolio-contact"
}

variable "lambda_zip_path" {
  type        = string
  description = "Path to the built lambda zip (e.g. infra/contact-lambda/contact-lambda.zip)"
}

variable "mail_from" {
  type        = string
  description = "Verified SES sender identity"
}

variable "mail_to" {
  type        = string
  description = "Recipient inbox"
}

variable "ses_domain" {
  type        = string
  description = "Domain to verify in SES (e.g. pdcarlson.dev). Empty string skips."
  default     = ""
}

variable "throttle_burst" {
  type    = number
  default = 10
}

variable "throttle_rate" {
  type    = number
  default = 5
}

variable "localstack" {
  type        = bool
  default     = false
  description = "Skip the API Gateway v2 resources LocalStack's community edition doesn't implement"
}

variable "tags" {
  type    = map(string)
  default = {}
}
