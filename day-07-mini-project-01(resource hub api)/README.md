# Day 07 - Mini Project 1: Resource Hub API

## Goal

Build one small backend service that integrates the core concepts from Days 1-6 instead of learning a new major concept.

The project combines REST CRUD, file upload, search, pagination, URL shortening, and Redis-based rate limiting.

Keep the implementation focused. The goal is integration practice, not production polish.

## Limited Learning Objectives

1. Organize multiple backend features inside one service.
2. Maintain Controller -> Service -> Repository separation across modules.
3. Reuse search and pagination with real API data.
4. Handle a basic file-upload flow.
5. Generate and resolve short URLs.
6. Apply Redis-based rate limiting to API routes.
7. Understand how independent backend features interact.

Do not introduce a new major backend concept during this task.

## Tech Stack

Use the technologies already used in Days 1-6:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Redis
- Multer or equivalent multipart handling

## Project: Resource Hub

Build a **Resource Hub API** for notes, PDFs, study material, articles, or documentation links.

A resource should contain at least:

```text
id
title
description
type
url
filePath
createdAt
updatedAt
```

You may add only fields that are necessary for the implementation.

## Required APIs

### 1. Create Resource

```http
POST /api/resources
```

Example:

```json
{
  "title": "Redis Basics",
  "description": "Notes about Redis commands and TTL",
  "type": "note"
}
```

Requirements:

- Validate required fields.
- Store the resource in PostgreSQL.
- Return the created resource.

### 2. List Resources

```http
GET /api/resources
```

Support:

```text
?page=1&limit=10&search=redis
```

Requirements:

- Pagination must happen at the database level.
- Return `totalItems`.
- Return `totalPages`.
- Return `hasNextPage`.
- Return `hasPreviousPage`.
- Search title and description.

### 3. Get Single Resource

```http
GET /api/resources/:id
```

Return the resource or an appropriate not-found error.

### 4. Update Resource

```http
PATCH /api/resources/:id
```

Allow basic resource fields to be updated and update `updatedAt`.

### 5. Delete Resource

```http
DELETE /api/resources/:id
```

Delete the resource and handle the not-found case.

## 6. File Upload

```http
POST /api/resources/:id/file
```

Use `multipart/form-data`.

Requirements:

- Accept one file.
- Reject a missing file.
- Validate basic file type and size.
- Generate a unique filename.
- Store the file locally.
- Save the file path against the resource.

Do not build cloud storage.

 

 

## 8. Rate Limiting

Reuse the Day 06 Redis rate limiter.

Use a simple rule such as:

```text
30 requests per minute per client IP
```

Requirements:

- Count requests in Redis.
- Use TTL.
- Return `429 Too Many Requests` after the limit.

Do not redesign the rate limiter.

## Suggested Architecture

```text
src/
│
├── modules/
│   ├── resource/
│   │   ├── resource.controller.ts
│   │   ├── resource.service.ts
│   │   ├── resource.repository.ts
│   │   ├── resource.schema.ts
│   │   └── resource.routes.ts
│   
│
├── middleware/
│   ├── rateLimiter.ts
│   └── upload.ts
│
├── db/
├── redis/
├── app.ts
└── server.ts
```

You may change the structure if it fits your existing architecture better.

## Database

### resources

```text
id
title
description
type
url
filePath
createdAt
updatedAt
```


## Testing Checklist

### Resource CRUD

- [ ] Create resource
- [ ] Get resource
- [ ] Update resource
- [ ] Delete resource
- [ ] Handle non-existent resource

### Search

- [ ] Search by title
- [ ] Search by description
- [ ] Search with no results

### Pagination

- [ ] Page 1 works
- [ ] Page 2 works
- [ ] Different limits work
- [ ] `totalItems` is correct
- [ ] `totalPages` is correct
- [ ] Next/previous metadata is correct
- [ ] LIMIT/OFFSET is applied by the database

### File Upload

- [ ] Upload a valid file
- [ ] Reject missing file
- [ ] Reject invalid file type
- [ ] Reject oversized file
- [ ] File path is stored correctly

  