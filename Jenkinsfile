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
          def imageVersion = "$appVersion-$BUILD_NUMBER"
          env.IMAGE_NAME = "pedruhf/dinheirow-test:${imageVersion}"
        }
      }
    }

    stage("build image") {
      steps {
        script {
          echo "Building the docker image..."
          withCredentials([usernamePassword(credentialsId: "docker-hub", passwordVariable: "PASS", usernameVariable: "USER")]) {
            sh "docker build -t ${IMAGE_NAME} ."
            sh "echo $PASS | docker login -u $USER --password-stdin"
            sh "docker push ${IMAGE_NAME}"
          }
        }
      }
    }

    stage("deploy") {
      steps {
        script {
          echo "Deploying docker image in AWS EC2..."

          def shellCmd = "bash ./server-cmds.sh ${IMAGE_NAME}"
          def ec2Instance = "ec2-user@18.234.60.100"

          sshagent(['ec2-server-key']) {
            sh "scp server-cmds.sh ${ec2Instance}:/home/ec2-user"
            sh "scp docker-compose.yaml ${ec2Instance}:/home/ec2-user"
            sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} ${shellCmd}"
          }
        }
      }
    }
  }
}