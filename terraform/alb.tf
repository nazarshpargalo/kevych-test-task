# Application Load Balancer
resource "aws_lb" "backend" {
  name               = "train-${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = data.aws_subnets.default.ids

  tags = {
    Name = "train-${var.environment}-backend-alb"
  }
}

# ALB Target Group
resource "aws_lb_target_group" "backend" {
  name     = "train-${var.environment}-backend-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    path                = "/api"
    matcher             = "200,404"
  }

  tags = {
    Name = "train-${var.environment}-backend-tg"
  }
}

# Attach EC2 to Target Group
resource "aws_lb_target_group_attachment" "backend" {
  target_group_arn = aws_lb_target_group.backend.arn
  target_id        = aws_instance.backend.id
  port             = 3000
}

# ALB Listener - HTTP only
resource "aws_lb_listener" "backend_http" {
  load_balancer_arn = aws_lb.backend.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
}
