/food-order-app
  /frontend
    Dockerfile-frontend
    index.html
  /backend
    Dockerfile-backend
    index.js
    package.json
  /database
    Dockerfile-database
    init.sql
  docker-compose.yml


name: Build and Push Docker Images to ECR

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Login to Amazon ECR
        id: login-ecr
        run: echo ${{ secrets.AWS_ACCESS_KEY_ID }} | docker login --username AWS --password-stdin ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com

      - name: Build and push frontend image
        working-directory: ./frontend
        run: |
          docker build -t frontend-image .
          docker tag frontend-image:latest ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/frontend:latest
          docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/frontend:latest

      - name: Build and push backend image
        working-directory: ./backend
        run: |
          docker build -t backend-image .
          docker tag backend-image:latest ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/backend:latest
          docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/backend:latest

      - name: Build and push database image
        working-directory: ./database
        run: |
          docker build -t database-image .
          docker tag database-image:latest ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/database:latest
          docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/database:latest



          800773404931.dkr.ecr.us-east-1.amazonaws.com/contianers:43b6d9ce7422125532c2e8d0c0cfcc90b5aa886a: not found