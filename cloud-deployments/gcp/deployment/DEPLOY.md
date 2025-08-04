# How to deploy a private Xio instance on GCP

With a GCP account you can deploy a private Xio instance on Google Cloud Platform. This creates a URL accessible from any browser over HTTP (HTTPS not supported). The instance runs using your own keys — they will not be exposed. For access control, it's strongly recommended to set a password once setup is complete.

The output of this deployment will be:
- 1 GCP VM
- 1 Security Group with 0.0.0.0/0 access on ports 22 and 3001
- 1 GCP VM Volume `gb2` of 10GiB minimum

**Requirements**
- A GCP account with billing enabled

## How to deploy on GCP

Open your terminal.

1. Log into your GCP account:
```bash
gcloud auth login
```

2. Create the deployment using the Deployment Manager CLI:
```bash
gcloud deployment-manager deployments create xio-deployment --config gcp/deployment/gcp_deploy_xio.yaml
```

You can monitor deployment status and output via the Google Cloud Console or CLI:

```bash
gcloud compute instances get-serial-port-output xio-instance
```

SSH into the instance:
```bash
gcloud compute ssh xio-instance
```

To delete the deployment:
```bash
gcloud deployment-manager deployments delete xio-deployment
```

## Please read before submitting issues about deployment

**Note:**  
The instance may take 5–10 minutes to fully boot up depending on size.

To monitor boot status:

1. Go to [your deployed instances](https://console.cloud.google.com/compute/instances)
2. SSH into the instance from the browser
3. Run:
```bash
sudo tail -f /var/log/cloud-init-output.log
```

You’ll know the Docker container is live once it reaches the final setup logs.

⚠️ You are responsible for any GCP resource costs resulting from this deployment.
