output "api_endpoint" {
  value = aws_apigatewayv2_api.contact.api_endpoint
}

output "api_invoke_domain" {
  value = replace(aws_apigatewayv2_api.contact.api_endpoint, "https://", "")
}

output "lambda_arn" {
  value = aws_lambda_function.contact.arn
}

output "lambda_name" {
  value = aws_lambda_function.contact.function_name
}
