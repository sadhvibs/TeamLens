# TeamLens
Task collaboration System

Overview
This application is a Task & Project Management System where team leads can create projects, assign tasks to members, and manage project workflows. Users can view their assigned tasks and track progress.

Features include:
    - JWT-based authentication with roles (Team Lead, Member)
    - Role-based route guards
    - Project creation and task assignment
    - Viewing all projects and tasks
    - Angular frontend

Tech Stack
    -Frontend: Angular 16, TypeScript, HTML, CSS
    - Backend: Node.js, Express.js
    - Database: MongoDB
    - Authentication: JWT, bcrypt for password hashing
    - Other Tools: Angular Material for UI components, Socket.io (if implemented), REST APIs

Setup Instructions
Prerequisites
    -Node.js (v18+)
    - Angular CLI (v19+)
    - MongoDB (local or Atlas)
    - Git

<!-- backend setup -->
Intialise the project 
npm init -y

Setup 
npm install express mongoose dotenv cors bcrypt jsonwebtoken express-validator socket.io

npm install nodemon --save-dev

Create a .env file in the backend folder with the following keys:
PORT=3000
MONGO_URI=<mongodb-connection-string>
JWT_SECRET=<secret-key>

Start the Angular app:
ng serve

Frontend will run on http://localhost:4200


Access the App
Open http://localhost:4200 in your browser.
Use the registration/login to access features.


Project Architecture

frontend/                --> Angular project
  src/
    app/
      components/
        dashboard/
        all-projects/
        all-tasks/
      services/
        project.service.ts
        task.service.ts
      interceptors/
        auth.interceptor.ts
backend/                 --> Node.js + Express API
  controllers/
    authController.js
    projectController.js
    taskController.js
  middleware/
    authMiddleware.js
    roleMiddleware.js
  models/
    User.js
    Project.js
    Task.js
  routes/
    authRoutes.js
    projectRoutes.js
    taskRoutes.js
  server.js


Frontend: Component-driven architecture, services for API calls, route guards for authorization.

Backend: MVC pattern with controllers handling logic, middleware for authentication and role-based access, Mongoose models for data.


Database Design

User
| Field    | Type   | Notes               |
| -------- | ------ | ------------------- |
| name     | String | Required            |
| email    | String | Unique, required    |
| password | String | Hashed with bcrypt  |
| role     | String | TEAM_LEAD or MEMBER |


Project
| Field       | Type            | Notes                         |
| ----------- | --------------- | ----------------------------- |
| name        | String          | Required                      |
| description | String          | Optional                      |
| createdBy   | ObjectId (User) | Populated when fetched        |
| members     | [ObjectId]      | Users assigned to the project |


Task
| Field       | Type              | Notes                      |
| ----------- | ----------------- | -------------------------- |
| title       | String            | Required                   |
| description | String            | Optional                   |
| project     | ObjectId(Project) | Required                   |
| assignedTo  | ObjectId(User)    | Required                   |
| createdBy   | ObjectId(User)    | Required                   |
| status      | String            | To-Do / In-Progress / Done |
| dueDate     | Date              | Optional                   |


Scalability and Trade-offs

Scalability
    - Separate frontend and backend allows horizontal scaling.
    - MongoDB document-based schema supports large datasets.
    - JWT authentication is stateless, reducing server load.

Trade-offs
    - No caching implemented — could use Redis for frequent queries.
    - Simple role-based access — may need more fine-grained permissions for larger teams.
    - Currently tasks are fetched by project — for very large datasets, pagination or query optimization is recommended.
