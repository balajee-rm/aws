
# Installing the CodeDeploy agent on EC2
```
sudo yum update -y
sudo yum install -y ruby wget
wget https://aws-codedeploy-eu-west-1.s3.eu-west-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
```


# create a bucket and enable versioning
```
aws s3 mb s3://balajee-aws-devops --region us-west-2 --profile aws-devops
aws s3api put-bucket-versioning --bucket balajee-aws-devops --versioning-configuration Status=Enabled --region us-west-2 --profile aws-devops
```

# deploy the files into S3
```
aws deploy push --application-name CodeDeployDemo --s3-location s3://balajee-aws-devops/codedeploy-demo/app.zip --ignore-hidden-files --region us-west-2 --profile aws-devops
```