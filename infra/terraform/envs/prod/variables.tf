variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "domain_name" {
  type    = string
  default = "pdcarlson.dev"
}

variable "site_bucket_name" {
  type    = string
  default = "pdcarlson-site"
}

variable "logs_bucket_name" {
  type    = string
  default = "pdcarlson-logs"
}

variable "mail_from" {
  type    = string
  default = "no-reply@pdcarlson.dev"
}

variable "mail_to" {
  type    = string
  default = "pdcarlson06@gmail.com"
}

variable "github_owner" {
  type    = string
  default = "pdcarlson"
}

variable "github_repo" {
  type    = string
  default = "pdcarlson"
}
