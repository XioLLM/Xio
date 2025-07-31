# How to Configure HTTPS for a Xio AWS Deployment

Instructions for enabling HTTPS on a private Xio instance deployed via AWS CloudFormation. This applies after deploying with the `aws_build_from_source_no_credentials.json` template.

Tested on:
- Firefox 119
- Chrome 118
- Edge 118

---

### Requirements

- AWS EC2 instance running Amazon Linux 2023 with the Xio Docker container active
- Admin access to:
  - Assign an Elastic IP
  - Modify Route 53 DNS records
  - Update EC2 security group rules

---

### Step 1: Assign an Elastic IP (EIP)

1. [Allocate a new Elastic IP](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating)  
2. [Associate the EIP with your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-associating)

---

### Step 2: Configure DNS A Record

Use a subdomain pointing to your EC2's EIP.  
Follow the guide to [route traffic to EC2 with Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html)

---

### Step 3: Install and Start NGINX

```bash
sudo yum install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

### Step 4: Install Certbot

```bash
sudo yum install -y augeas-libs
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot certbot-nginx
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```

---

### Step 5: Temporarily Open Port 80

Follow AWS instructions to [add an inbound rule for HTTP (port 80)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/working-with-security-groups.html#adding-security-group-rule)

---

### Step 6: Disable Default NGINX HTTP Block

```bash
sudo vi /etc/nginx/nginx.conf
```

Comment out the default block for port 80:

```
#    server {
#        listen       80;
#        listen       [::]:80;
#        server_name  _;
#        root         /usr/share/nginx/html;
#        include /etc/nginx/default.d/*.conf;
#        ...
#    }
```

Save and exit (`:wq`)

---

### Step 7: Add Custom NGINX Proxy Config

```bash
sudo vi /etc/nginx/conf.d/xio.conf
```

Paste:

```
server {
   location ~* ^/api/agent-invocation/(.*) {
      proxy_pass http://0.0.0.0:3001;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
   }

   listen 80;
   server_name [your.domain.com];

   location / {
      proxy_connect_timeout       605;
      proxy_send_timeout          605;
      proxy_read_timeout          605;
      send_timeout                605;
      keepalive_timeout           605;
      proxy_buffering off;
      proxy_cache off;
      proxy_pass  http://0.0.0.0:3001;
   }
}
```

Replace `[your.domain.com]` with your actual domain. Save and exit (`:wq`)

---

### Step 8: Test and Restart NGINX

```bash
sudo nginx -t
sudo systemctl restart nginx
```

Visit `http://your.domain.com` in a browser to verify proxying works.

---

### Step 9: Generate HTTPS Certificate

```bash
sudo certbot --nginx -d your.domain.com
```

Follow prompts:
- Enter your email
- Agree to terms
- Choose whether to share your email

---

### Step 10: Confirm HTTPS Setup

```bash
sudo cat /etc/nginx/conf.d/xio.conf
```

You should see updated HTTPS configuration and an automatic redirect from port 80.

Test in browser: `https://your.domain.com`

---

### Step 11 (Optional): Remove Port 80 Inbound Rule

[Delete the port 80 security group rule](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/working-with-security-groups.html#deleting-security-group-rule) if you don’t want to leave it exposed.

---

### Reminder

You are fully responsible for all AWS usage charges associated with this deployment.
