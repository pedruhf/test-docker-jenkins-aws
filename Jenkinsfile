pipeline {
  agent any

  tools {
    nodejs "my-nodejs"
  }

  environment {
    IMAGE_NAME = "pedruhf/dinheirow-test:1.0"
  }

  stages {
    stage("increment version") {
      steps {
        script {
          echo "Incrementing the app version..."
          def packageJSON = readJSON file: "./package.json"
          def appVersion = packageJSON.version
          echo "APP PACKAGE: ${packageJSON}"
        }
      }
    }

    // stage("build image") {
    //   steps {
    //     script {
    //       echo "Building the docker image..."
    //       withCredentials([usernamePassword(credentialsId: "docker-hub", passwordVariable: "PASS", usernameVariable: "USER")]) {
    //         sh "docker build -t pedruhf/dinheirow-test:1.0 ."
    //         sh "echo $PASS | docker login -u $USER --password-stdin"
    //         sh "docker push pedruhf/dinheirow-test:1.0"
    //       }
    //     }
    //   }
    // }

    stage("deploy") {
      steps {
        script {
          echo "Deploying docker image in AWS EC2..."
          // def dockerCmd = "docker run -p 3000:3000 -d ${IMAGE_NAME}"
          // sshagent(['ec2-server-key']) {
          //   sh "ssh -o StrictHostKeyChecking=no ec2-user@18.234.60.100 ${dockerCmd}"
        }
      }
    }
  }
}