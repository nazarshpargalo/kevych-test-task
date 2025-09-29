# EC2 Instance
resource "aws_instance" "backend" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.main.key_name
  vpc_security_group_ids = [aws_security_group.backend.id]
  availability_zone      = "us-east-1a"

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    db_password = var.db_password
    jwt_secret  = var.jwt_secret
    environment = var.environment
  }))

  tags = {
    Name = "train-${var.environment}-backend"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Elastic IP for consistent backend address
resource "aws_eip" "backend" {
  instance = aws_instance.backend.id
  domain   = "vpc"

  tags = {
    Name = "train-${var.environment}-backend-eip"
  }
}
