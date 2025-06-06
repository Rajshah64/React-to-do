# Todo Backend Application

A dockerized fullstack todo application that uses a Node.js backend, Supabase database, Prisma ORM, and JWT Authentication. This project demonstrates CI/CD pipeline implementation with GitHub Actions, Docker containerization, and Kubernetes orchestration.

# React-to-do

This is the first react project I created . Its a basic to-do page understanding basic react properties like props and hooks.
Many more to go .

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: JWT
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Orchestration**: Kubernetes
- **Container Registry**: Docker Hub

## Features

- User registration and authentication
- JWT-based session management
- CRUD operations for todos
- Responsive web interface
- Automated CI/CD pipeline
- Kubernetes deployment with health checks
- Multi-environment support (local/production)



PRISMA
to create a prisma enviroment
--> first install prisma in your pc
e.g-->npm install prisma @prisma/client pg

-->Create the prisma folder and file to create database
e.g-->npx prisma init

--> Then create the prismaClient.js where you have to create a prisma client only.
{
import { PrismaClient, prismaClient } from "@prisma/client";  
const prisma = new PrismaClient();
export default prisma;
}
-->Now import it where-ever you want to use the database with the help of prisma.

-->I think this a very basic implementation of prisma and will surely explore more about it when I actually work on it with next.js

## Docker

-->What docker does is it takes a snapshot of your package.json and when the software is containerised, it downloads all the dependencies, by recalling that snapshot is what I have understood.

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- Docker Desktop
- kubectl (for Kubernetes deployment)

### Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/your-username/backend-todo-app.git
cd backend-todo-app
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Generate the Prisma Client:**

```bash
npx prisma generate
```

### Local Development

#### Option 1: Local PostgreSQL (Recommended for development)

```bash
# Build your docker images:
docker compose build

# Create PostgreSQL migrations and apply them:
docker compose run app npx prisma migrate dev --name init

# Also - to run/apply migrations if necessary:
docker-compose run app npx prisma migrate deploy

# Boot up 2x docker containers:
docker compose up

# or run in detached mode:
docker compose up -d
```

#### Option 2: Using Supabase

```bash
# Run with Supabase database:
docker compose -f docker-compose.supabase.yaml up
```

### Database Management

**To login to docker PostgreSQL database** (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database:

```bash
docker exec -it postgres-db psql -U postgres -d todoapp
```

**To stop Docker containers:**

```bash
docker compose down
```

**To delete all docker containers:**

```bash
docker system prune
```

### Kubernetes Deployment

1. **Apply Kubernetes manifests:**

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

2. **Check deployment status:**

```bash
kubectl get pods
kubectl get services
```

3. **Access the application:**

```bash
kubectl port-forward service/todo-backend-service 8080:80
```

Access the App:
Open http://localhost:5003 (or localhost:3000 if changed) in your browser to see the frontend. You can register, log in, and manage your todo list from there.

## CI/CD Pipeline

This project includes a complete CI/CD pipeline using GitHub Actions that:

1. **Builds** the Docker image on every push to main
2. **Runs** Prisma client generation
3. **Pushes** the image to Docker Hub
4. **Tags** images with git commit hashes
5. **Supports** multiple environments

The pipeline is defined in `.github/workflows/docker-build.yml`.

## Project Structure

```
├── src/
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Main application file
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── k8s/
│   ├── deployment.yaml  # Kubernetes deployment
│   └── service.yaml     # Kubernetes service
├── public/              # Static frontend files
├── .github/workflows/   # CI/CD pipeline
├── Dockerfile           # Container configuration
└── docker-compose.yaml # Local development setup
```

## Environment Variables

Create a `.env` file for local development:

```
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-jwt-secret"
NODE_ENV="development"
PORT=5000
```

## Health Monitoring
The application includes health check endpoints:
- `/health` - Application health status
- `/metrics` - Application metrics

# Pipeline test Fri, Jun 6, 2025 3:28:16 PM
# Live demo Sat, Jun  7, 2025  1:00:41 AM
