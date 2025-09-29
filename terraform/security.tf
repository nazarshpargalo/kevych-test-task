# SSH Key Generation
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "main" {
  key_name   = "train-${var.environment}-key"
  public_key = tls_private_key.ssh_key.public_key_openssh

  tags = {
    Name = "train-app-${var.environment}-ssh-key"
  }
}

# Store SSH key
resource "aws_secretsmanager_secret" "ssh_key" {
  name                    = "train-app-${var.environment}-ssh-key"
  recovery_window_in_days = 0

  tags = {
    Name = "train-app-${var.environment}-ssh-key"
  }
}

resource "aws_secretsmanager_secret_version" "ssh_key" {
  secret_id     = aws_secretsmanager_secret.ssh_key.id
  secret_string = tls_private_key.ssh_key.private_key_pem
}

# Security Group for EC2
resource "aws_security_group" "backend" {
  name        = "train-${var.environment}-backend-sg"
  description = "Security group for Train Management backend"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH from allowed IPs"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ssh_ips
  }

  ingress {
    description     = "Backend API from ALB"
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "train-${var.environment}-backend-sg"
  }
}

# Security Group for ALB
resource "aws_security_group" "alb" {
  name        = "train-${var.environment}-alb-sg"
  description = "Security group for ALB"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "train-${var.environment}-alb-sg"
  }
}
