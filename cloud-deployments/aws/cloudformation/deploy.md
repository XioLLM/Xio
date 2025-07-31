# How to deploy a private Xio instance on AWS

With an AWS account, you can easily deploy a private Xio instance on AWS. This will create a URL that you can access from any browser over HTTP (HTTPS not supported). The instance will run on your own local environment and keys, which are never exposed. To secure the instance, it is strongly recommended to set a password after deployment.

## Quick Launch (EASY)

1. Log in to your AWS account  
2. Open [CloudFormation](https://us-west-1.console.aws.amazon.com/cloudformation/home)  
3. Choose a geographic region closest to you to reduce latency  
4. Click `Create Stack`

![Create Stack](../../../images/screenshots/create_stack.png)

5. Use the file `cloudformation_create_xio.json` as your JSON template

![Upload Stack](../../../images/screenshots/upload.png)

6. Click Deploy  
7. Wait for stack events to finish and be marked as `Completed`  
8. Go to the `Outputs` tab

![Stack Output](../../../images/screenshots/cf_outputs.png)

9. Once all resources are provisioned, access your instance at `[InstanceIP]:3001`  
This process may take up to 10 minutes. See the note below if you want to watch the logs during setup.

### Outputs

- 1 EC2 Instance  
- 1 Security Group with 0.0.0.0/0 access on port 3001  
- 1 EC2 Volume (10 GiB minimum, customizable)

### Requirements

- An AWS account with billing enabled

---

### Deployment Notes

**This will take a few minutes.**  
Your instance will not be available immediately. Depending on the EC2 type you select, initial provisioning can take 5–10 minutes.

To monitor deployment progress:

1. Go to [your EC2 dashboard](https://us-west-1.console.aws.amazon.com/ec2/home)  
2. Open your new instance  
3. Click “Connect” and use the in-browser SSH tool  
4. Once inside, run:

```bash
sudo tail -f /var/log/cloud-init-output.log
