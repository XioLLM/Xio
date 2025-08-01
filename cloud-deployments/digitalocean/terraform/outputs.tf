output "ip_address" {
  value       = digitalocean_droplet.xio_instance.ipv4_address
  description = "The public IP address of your Xio droplet application."
}
