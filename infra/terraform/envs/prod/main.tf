locals {
  tags = {
    Project = "pdcarlson-portfolio"
    Env     = "prod"
    Owner   = var.github_owner
  }
}

module "site" {
  source           = "../../modules/site"
  site_bucket_name = var.site_bucket_name
  logs_bucket_name = var.logs_bucket_name
  tags             = local.tags
}

module "contact" {
  source          = "../../modules/contact"
  lambda_zip_path = "${path.root}/../../../contact-lambda/contact-lambda.zip"
  mail_from       = var.mail_from
  mail_to         = var.mail_to
  ses_domain      = var.domain_name
  tags            = local.tags
}

module "cdn" {
  source                      = "../../modules/site_cdn"
  domain_name                 = var.domain_name
  aliases                     = ["www.${var.domain_name}"]
  site_bucket_regional_domain = module.site.site_bucket_regional_domain
  site_bucket_arn             = module.site.site_bucket_arn
  logs_bucket_domain          = module.site.logs_bucket_domain
  contact_api_invoke_url      = module.contact.api_invoke_domain
  route53_zone_id             = var.route53_zone_id
  tags                        = local.tags
}

module "analytics" {
  source                     = "../../modules/analytics"
  logs_bucket_name           = var.logs_bucket_name
  cloudfront_distribution_id = module.cdn.distribution_id
  tags                       = local.tags
}

module "oidc" {
  source           = "../../modules/oidc"
  github_owner     = var.github_owner
  github_repo      = var.github_repo
  site_bucket_arn  = module.site.site_bucket_arn
  distribution_arn = module.cdn.distribution_arn
  tags             = local.tags
}

output "distribution_id" {
  value = module.cdn.distribution_id
}

output "distribution_domain" {
  value = module.cdn.distribution_domain
}

output "site_bucket" {
  value = module.site.site_bucket_name
}

output "contact_api" {
  value = module.contact.api_endpoint
}

output "deploy_role_arn" {
  value       = module.oidc.role_arn
  description = "Configure this as the AWS_DEPLOY_ROLE_ARN GitHub secret"
}
