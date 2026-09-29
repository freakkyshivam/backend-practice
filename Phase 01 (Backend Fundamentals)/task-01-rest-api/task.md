# Build: Task Management API

Apply rest api fundametal in the code

## Basic resources:

- User
- Task

# Minimum requirements

- Create task
- Get all tasks
- Get single task
- Update task
- Delete task
- Filtering
- Pagination
- Proper HTTP status codes
- Request validation
- Centralized error handling
- Consistent API response structure


## 📌 Features

### 1. User Module

#### Register
`POST /users/register`

Request:
```json
{
  "name": "Shivam",
  "email": "shivam@example.com",
  "password": "password123"
}
```

Requirements:
- Validate input
- Check if email already exists
- Hash password using Argon2
- Store user in PostgreSQL
- Return created user

#### Login
`POST /users/login`

Request:
```json
{
  "email": "shivam@example.com",
  "password": "password123"
}
```

Requirements:
- Validate credentials
- Verify password
- Create authentication/session
- Return appropriate response

#### Current User
`GET /users/me`

Requirements:
- Read authenticated user
- Return current user's information

### 2. Task Module

#### Create Task
`POST /tasks`

Request:
```json
{
  "title": "Learn Drizzle ORM",
  "description": "Practice repository pattern"
}
```

Requirements:
- User must be authenticated
- Store task in database
- Associate task with user

#### Get Tasks
`GET /tasks`

Support:
- Pagination
- Basic filtering

Example:
`GET /tasks?page=1&limit=10`

#### Get Single Task
`GET /tasks/:id`

Requirements:
- Return task by ID
- User should only access their own task

#### Update Task
`PATCH /tasks/:id`

Request:
```json
{
  "title": "Learn Drizzle ORM deeply"
}
```

#### Delete Task
`DELETE /tasks/:id`

Requirements:
- Delete only the authenticated user's task

## 🗄️ Database

### users
- id
- name
- email
- password
- createdAt

### tasks
- id
- userId
- title
- description
- createdAt
- updatedAt

Relationship:

```text
User
 |
 | 1
 |
 | *
Task
```


# 🎤 Interview Questions

1. Why use a repository layer?
2. What is the difference between service and controller?
3. Why hash passwords?
4. Why use Argon2?
5. What is dependency injection?
6. How does authentication work?
7. How does pagination work?
8. How does a foreign key work?
9. Why use PostgreSQL?
10. Why use an ORM?

