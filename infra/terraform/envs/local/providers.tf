provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3           = "http://localstack:4566"
    lambda       = "http://localstack:4566"
    apigateway   = "http://localstack:4566"
    apigatewayv2 = "http://localstack:4566"
    iam          = "http://localstack:4566"
    sts          = "http://localstack:4566"
    ses          = "http://localstack:4566"
    logs         = "http://localstack:4566"
    athena       = "http://localstack:4566"
    glue         = "http://localstack:4566"
    route53      = "http://localstack:4566"
    cloudfront   = "http://localstack:4566"
  }
}
