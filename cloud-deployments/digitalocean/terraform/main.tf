terraform {
  required_version = ">= 1.0.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  # Replace with your actual DigitalOcean API token
  token = "your_digitalocean_api_token"
}

resource "digitalocean_droplet" "xio_instance" {
  image  = "ubuntu-24-04-x64"
  name   = "xio-instance"
  region = "nyc3"
  size   = "s-2vcpu-2gb"

  user_data = templatefile("user_data.tp1", {
    env_content = local.formatted_env_content
  })
}

locals {
  env_content = file("../../../docker/.env")
  formatted_env_content = join("\n", [
    for line in split("\n", local.env_content) :
    line
    if !(
      substr(line, 0, 1) == "#" ||
      substr(line, 0, 3) == "UID" ||
      substr(line, 0, 3) == "GID" ||
      substr(line, 0, 11) == "CLOUD_BUILD" ||
      line == ""
    )
  ])
}
