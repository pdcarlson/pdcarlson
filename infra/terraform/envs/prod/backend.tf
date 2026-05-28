terraform {
  backend "s3" {
    bucket         = "pdcarlson-tf-state"
    key            = "portfolio/prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "pdcarlson-tf-locks"
    encrypt        = true
  }
}
