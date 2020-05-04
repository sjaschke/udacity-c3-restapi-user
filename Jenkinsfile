#!groovy
pipeline {
    agent any
    environment {
        JWT_SECRET = "super_secret"
    }
    stages {
        stage('clean') {
            steps {
                sh 'npm run clean'
                sh 'npm cache clean --force'
            }
        }
        stage('init') {
            steps {
                sh 'npm install'
            }
        }
        stage('build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('build docker image') {
            steps {
                script {
                    latestTag = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()
                    sh 'docker build -t saja/udacity-restapi-user:${latestTag} .'
                }
            }
        }

        stage("SonarQube analysis") {
            steps {
                script {
                    try {
                        def projectKey = env.JOB_NAME + "_" + env.BRANCH_NAME
                        projectKey = URLDecoder.decode(projectKey, "UTF-8").replaceAll('/', ':').replaceAll('#', '').replaceAll('%2F', ':')
                        withSonarQubeEnv('sonar') {
                            sh "/opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=${projectKey}"
                        }
                    } catch (ignore) {
                    }
                }
            }
        }
        stage("wait for analyzing") {
            steps {
                sleep 30
            }
        }
        stage("Quality Gate") {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
    post {
        always {
            junit 'reports/*.xml'
        }
    }
}
