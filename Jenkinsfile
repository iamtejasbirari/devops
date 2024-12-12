pipeline{
    agent any 

    eenvironment {
        FRONTEND_IMAGE = 'tejasbi/frontend-app'
        BACKEND_IMAGE = 'tejasbi/backend-app'
        IMAGE_TAG = "latest" // Use build number as a unique tag
    }

    stages{
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/iamtejasbirari/devops.git'
            }
        }
        stage('Build Frontend Image') {
            steps {
                script {
                    sh """
                    docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
                    """
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                script {
                    sh """
                    docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend
                    """
                }
            }
        }
        stage('Push Frontend Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        sh """
                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                        """
                    }
                }
            }
        }
        stage('Push Backend Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        sh """
                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                        """
                    }
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline execution completed."
        }
        success {
            echo "Docker images pushed successfully: "
            echo "Frontend: ${FRONTEND_IMAGE}:${IMAGE_TAG}"
            echo "Backend: ${BACKEND_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
    }    
}