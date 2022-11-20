pipeline {
  agent any

  stages {
    stage("test") {
      steps {
        script {
          echo "Testing the app..."
        }
      }
    }

    stage("build") {
      steps {
        script {
          echo "Building the app..."
        }
      }
    }

    stage("deploy") {
      steps {
        script {
          def dockerCmd = "docker run -p 3000:3000 -d pedruhf/dinheirow-test:1.0"
          sshagent(['ec2-server-key']) {
            sh "ssh -o StrictHostKeyChecking=no ec2-user@18.234.60.100 ${dockerCmd}"
          }
        }
      }
    }
  }
}