pipeline{
    agent any 

    environment {
        FRONTEND_IMAGE = 'tejasbi/frontend-app'
        BACKEND_IMAGE = 'tejasbi/backend-app'
        IMAGE_TAG = "latest-${env.BUILD_NUMBER}" // Use build number as a unique tag
        KUBECONFIG = credentials('kubeconfig-credentials')
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
                    bat """
                    docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
                    """
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                script {
                    bat """
                    docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend
                    """
                }
            }
        }
        stage('Push Frontend Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        bat """
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
                        bat """
                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                        """
                    }
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                script {
                    bat 'kubectl apply -f frontend/Deployment.yaml'
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                script {
                    bat 'kubectl apply -f backend/Deployment.yaml'
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                script {
                    bat 'kubectl get pods'
                    bat 'kubectl get svc'
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
            echo 'Application successfully deployed on Kubernetes!'
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
    }    
}