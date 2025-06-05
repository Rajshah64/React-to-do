What is an ORM ??
-->

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

Docker
-->What docker does is it takes a snapshot of your package.json and when the software is containerised, it downloads all the dependencies, by recalling that snapshot is what I have understood.




Getting Started
Install Docker Desktop

Clone the Repository:

git clone https://github.com/your-username/backend-todo-app.git
cd backend-todo-app
Generate the Prisma Client:
npx prisma generate

Build your docker images:
docker compose build

Create PostgreSQL migrations and apply them:
docker compose run app npx prisma migrate dev --name init

Also - to run/apply migrations if necessary:

docker-compose run app npx prisma migrate deploy

Boot up 2x docker containers:
docker compose up

or

docker compose up -d

If you want to boot it up without it commandeering your terminal (you'll have to stop if via Docker Desktop though).

To login to docker PostgreSQL database (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database!:
docker exec -it postgres-db psql -U postgres -d todoapp

To stop Docker containers:
docker compose down

To delete all docker containers:
docker system prune

Access the App:
Open http://localhost:5003 (or localhost:3000 if changed) in your browser to see the frontend. You can register, log in, and manage your todo list from there.