variable "name_prefix" {
  type    = string
  default = "portfolio-deploy"
}

variable "github_owner" {
  type        = string
  description = "GitHub user or org that owns the repo"
}

variable "github_repo" {
  type    = string
  default = "pdcarlson"
}

variable "site_bucket_arn" {
  type = string
}

variable "distribution_arn" {
  type = string
}

variable "branches" {
  type    = list(string)
  default = ["main"]
}

variable "tags" {
  type    = map(string)
  default = {}
}
