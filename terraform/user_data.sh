#!/bin/bash
set -e

# Log all output for debugging
exec > >(tee -a /var/log/user-data.log)
exec 2>&1

echo "Starting user data script at $(date)"

# Update system
yum update -y

# Install Docker
amazon-linux-extras install docker -y
systemctl start docker
systemctl enable docker

# Install Docker Compose
DOCKER_COMPOSE_VERSION="2.23.0"
curl -L "https://github.com/docker/compose/releases/download/v$${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Install Git
yum install -y git

# Add ec2-user to docker group
usermod -a -G docker ec2-user

# Create application directory
mkdir -p /home/ec2-user/app
cd /home/ec2-user/app

# Create environment file
cat > .env << 'EOF'
NODE_ENV=production
DB_USERNAME=trainuser
DB_PASSWORD=${db_password}
DB_NAME=traindb
JWT_SECRET=${jwt_secret}
JWT_EXPIRES_IN=24h
EOF

# Set permissions
chown -R ec2-user:ec2-user /home/ec2-user/app
chmod 600 /home/ec2-user/app/.env

# Create systemd service for Docker Compose
cat > /etc/systemd/system/train-app.service << 'EOF'
[Unit]
Description=Train Management Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ec2-user/app
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
User=ec2-user
Group=ec2-user

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable train-app

echo "User data script completed at $(date)"