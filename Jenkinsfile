pipeline {
  agent any

  tools {
    nodejs "my-nodejs"
  }

  stages {
    stage("get image version") {
      steps {
        script {
          echo "Incrementing the app version..."
          def packageJSON = readJSON file: "./package.json"
          def appVersion = packageJSON.version
          env.IMAGE_NAME = "$appVersion-$BUILD_NUMBER"
        }
      }
    }

    stage("build image") {
      steps {
        script {
          echo "Building the docker image..."
          withCredentials([usernamePassword(credentialsId: "docker-hub", passwordVariable: "PASS", usernameVariable: "USER")]) {
            sh "docker build -t pedruhf/dinheirow-test:${IMAGE_NAME} ."
            sh "echo $PASS | docker login -u $USER --password-stdin"
            sh "docker push pedruhf/dinheirow-test:${IMAGE_NAME}"
          }
        }
      }
    }

    stage("deploy") {
      steps {
        script {
          echo "Deploying docker image in AWS EC2..."
          def dockerComposeCmd = "docker-compose -f docker-compose.yaml up --detach"
          sshagent(['ec2-server-key']) {
            sh "scp docker-compose.yaml ec2-user@18.234.60.100:/home/ec2-user"
            sh "ssh -o StrictHostKeyChecking=no ec2-user@18.234.60.100 ${dockerComposeCmd}"
          }
        }
      }
    }
  }
}