output "backend_url" {
  description = "Backend API URL (via CloudFront)"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "frontend_url" {
  description = "Frontend CloudFront URL"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "s3_bucket_name" {
  description = "S3 bucket name for frontend"
  value       = aws_s3_bucket.frontend.bucket
}

output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.backend.id
}

output "ssh_connection_string" {
  description = "SSH connection command"
  value       = "aws secretsmanager get-secret-value --secret-id ${aws_secretsmanager_secret.ssh_key.name} --query SecretString --output text > key.pem && chmod 600 key.pem && ssh -i key.pem ec2-user@${aws_eip.backend.public_ip}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.frontend.id
}

output "backend_public_ip" {
  description = "Public IP of the backend EC2 (EIP) - for SSH only"
  value       = aws_eip.backend.public_ip
}

output "cloudfront_domain" {
  description = "CloudFront domain name (use this for all requests)"
  value       = aws_cloudfront_distribution.frontend.domain_name
}
