output "workgroup_name" {
  value = one(aws_athena_workgroup.site[*].name)
}

output "database_name" {
  value = one(aws_glue_catalog_database.site[*].name)
}

output "results_bucket" {
  value = aws_s3_bucket.results.bucket
}
