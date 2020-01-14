pipeline {
    agent none
    options {
        // Skip default checkout behavior
        skipDefaultCheckout()
    }
    stages {
        stage('Checkout SCM') {
            agent { label "HELIO" }
            steps {
                checkout scm

                script {
                    echo "get COMMIT_ID"
                    sh 'echo -n $(git rev-parse --short HEAD) > ./commit-id'
                    commitId = readFile('./commit-id')
                }
                stash(name: 'ws', includes:'**,./commit-id')
            }
        }
        stage('Initialize') {
            parallel {
                stage("Agent: HELIO"){
                    agent {label "HELIO"}
                    steps{
                        cleanWs()
                    }
                }
            }
        }
        // stage('Unit Test') {
        //     agent {label "HELIO"}
        //     steps {
        //         unstash 'ws'
        //         sh 'vendor/bin/phpunit'
        //     }
        // }
        stage('SonarQube Analysis') {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                }
            }
            agent {label "HELIO"}
            steps {
                unstash 'ws'
                echo "Run SonarQube"
                script {
                    echo "defining sonar-scanner"
                    def scannerHome = tool 'SonarQube Scanner' ;
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Build to Development') {
            when {
                anyOf{
                    branch 'master'
                    branch 'develop'
                }
            }
            agent {label "HELIO"}
            steps {
                unstash 'ws'
                sh 'sudo ansible -i hosts -m ping all'
                // sh 'ansible -i hosts -m ping all --extra-vars "ansible_user=ubuntu ansible_password=telkomdev"'
                // sh 'ansible-playbook development.yaml -i hosts'
            }
        }
    }
}
