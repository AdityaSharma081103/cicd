pipeline {
    agent any

    environment {
        PROJECT_ID = 'jenkins-cicd-demo-465510'
    }

    stages {
        stage('Pull Code') {
            steps {
                 git branch: 'main', url: 'https://github.com/AdityaSharma081103/cicd.git'
            }
        }

        stage('Install Packages') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to GCP') {
            steps {
                withCredentials([file(credentialsId: 'gcp-key', variable: 'GCLOUD_KEY')]) {
                    sh '''
                    gcloud auth activate-service-account --key-file=$GCLOUD_KEY
                    gcloud config set project $PROJECT_ID
                    gcloud app deploy --quiet
                    '''
                }
            }
        }
    }
}
