locals {
  tags = {
    Project = "pdcarlson-portfolio"
    Env     = "local"
  }
}

module "site" {
  source           = "../../modules/site"
  site_bucket_name = "pdcarlson-site-local"
  logs_bucket_name = "pdcarlson-logs-local"
  localstack       = true
  tags             = local.tags
}

module "contact" {
  source          = "../../modules/contact"
  lambda_zip_path = "${path.root}/../../../contact-lambda/contact-lambda.zip"
  mail_from       = "no-reply@example.test"
  mail_to         = "you@example.test"
  localstack      = true
  tags            = local.tags
}

module "analytics" {
  source                     = "../../modules/analytics"
  logs_bucket_name           = module.site.logs_bucket_domain
  cloudfront_distribution_id = "local-stub-distribution"
  localstack                 = true
  tags                       = local.tags
}

output "web_url" {
  value = "http://localhost:3000"
}

output "site_bucket" {
  value = module.site.site_bucket_name
}

output "contact_api" {
  value = module.contact.api_endpoint
}
