# How to deploy a private Xio instance on DigitalOcean using Terraform

With a DigitalOcean account, you can easily deploy a private **Xio** instance using Terraform. This will create an accessible URL (HTTP only) to your own private containerized LLM UI.

This single instance will run on your own keys, which are **not** exposed by default. If you'd like to secure the interface, it is highly recommended that you set a password once setup is complete.

The output of this Terraform configuration will be:
- 1 DigitalOcean Droplet
- A public IP address to access your deployed Xio instance

---

## Requirements

- A DigitalOcean account with billing enabled
- Terraform installed on your local machine  
  → [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)

---

## Deployment Steps

1. Open your terminal and navigate to the `docker` folder in the Xio repository.
2. Create a `.env` file by duplicating `.env.example` in the same directory.
3. Navigate into the `digitalocean/terraform` folder.
4. Open `main.tf` and **replace** the placeholder value in the `provider "digitalocean"` block with your actual **DigitalOcean API token**.

```hcl
provider "digitalocean" {
  token = "your_digitalocean_api_token_here"
}
```

5. Run the following commands in your terminal:

```bash
terraform init  
terraform plan  
terraform apply  
```

6. Type `yes` when prompted to confirm the infrastructure changes.

7. Once complete, Terraform will output the **public IP address** of your new droplet.

8. Open your browser and navigate to:  
   `http://<your_droplet_ip>:3001`

---

## Destroying the Deployment

To clean up and delete all created resources, run:

```bash
terraform destroy
```

---

## Please Read Before Submitting Issues

>  **Note:** Your Xio instance may take 5–10 minutes to fully boot.

To view deployment logs and monitor progress:

1. Go to [DigitalOcean Droplets](https://cloud.digitalocean.com/droplets)
2. Open a browser-based SSH session with your instance.
3. Run the following to stream setup output:

```bash
sudo tail -f /var/log/cloud-init-output.log
```

Once setup is complete, you will see Docker confirm the container is up and running.

---

By using this Terraform setup, you agree to take full responsibility for **any infrastructure costs** incurred through your DigitalOcean account.
