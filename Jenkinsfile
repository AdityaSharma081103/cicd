pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'eu-north-1'  // Change to your region
        AWS_CREDENTIALS = 'aws-eb-creds' // Jenkins AWS creds ID
        APP_NAME = 'cicd'
        ENV_NAME = 'Cicd-env'
        ZIP_FILE = 'app.zip'
        S3_BUCKET = 'my-nodejs-app-bucket-aditya081103'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/AdityaSharma081103/cicd', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Zip Application') {
            steps {
                sh 'zip -r $ZIP_FILE *'
            }
        }

        stage('Deploy to Elastic Beanstalk') {
            steps {
                withAWS(credentials: "$AWS_CREDENTIALS", region: "$AWS_DEFAULT_REGION") {
                    sh '''
                        aws s3 cp $ZIP_FILE s3://$APP_NAME-bucket/$ZIP_FILE
                        aws elasticbeanstalk create-application-version --application-name $APP_NAME \
                          --version-label v-${BUILD_ID} \
                          --source-bundle S3Bucket=$APP_NAME-bucket,S3Key=$ZIP_FILE

                        aws elasticbeanstalk update-environment --environment-name $ENV_NAME \
                          --version-label v-${BUILD_ID}
                    '''
                }
            }
        }
    }
}
