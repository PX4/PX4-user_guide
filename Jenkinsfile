pipeline {
  agent any
  stages {
    stage('Build') {
      environment {
        HOME = "${WORKSPACE}"
      }
      agent {
        docker {
          image 'px4io/px4-docs:1.0'
        }
      }
      steps {
        sh 'gitbook install'
        sh 'gitbook build'
        // publish html
        publishHTML target: [
          reportTitles: 'PX4 User Guide',
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: '_book',
          reportFiles: '*',
          reportName: 'PX4 User Guide'
        ]
      }
    }
  }
}
