# Day 05 - Pagination API

## Goal

Build a standalone Pagination API from scratch.

The main goal is to understand page-based pagination at the database level using `LIMIT` and `OFFSET`.

This project is completely independent of Day 04.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod

## Project

Build a simple Product API with pagination.

The API should allow users to:

- Create products
- Get products
- Get products page by page

Examples:

```text
GET /products
GET /products?page=1&limit=10
GET /products?page=2&limit=10
GET /products?page=3&limit=20
```

## Database

Create a `products` table.

| Field | Type | Required |
|---|---|---|
| id | UUID / Serial | Yes |
| name | varchar | Yes |
| description | text | Yes |
| category | varchar | Yes |
| price | numeric | Yes |
| createdAt | timestamp | Yes |

## API Requirements

### 1. Create Product

```http
POST /products
```

Request body:

```json
{
  "name": "Mechanical Keyboard",
  "description": "RGB mechanical keyboard",
  "category": "electronics",
  "price": 2500
}
```

Validate the request body using Zod.

### 2. Get Products

```http
GET /products
```

Return products.

If no pagination parameters are provided, use sensible default values for `page` and `limit`.

### 3. Paginated Products

```http
GET /products?page=1&limit=10
```

Example response:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 50,
    "totalPages": 5
  }
}
```

## Pagination Logic

Main formula:

```text
offset = (page - 1) * limit
```

Example:

```text
page = 1
limit = 10
offset = 0
```

```text
page = 2
limit = 10
offset = 10
```

```text
page = 3
limit = 10
offset = 20
```

Use PostgreSQL's:

```text
LIMIT
OFFSET
```

to retrieve only the required records.

## Pagination Metadata

Return at minimum:

```json
{
  "page": 1,
  "limit": 10,
  "totalItems": 50,
  "totalPages": 5
}
```

Calculate:

```text
totalPages = ceil(totalItems / limit)
```

Example:

```text
totalItems = 47
limit = 10
totalPages = 5
```

## Validation

Use Zod to validate pagination query parameters.

### `page`

- Must be a number
- Must be greater than `0`
- Should be an integer

### `limit`

- Must be a number
- Must be greater than `0`
- Should be an integer
- Set a reasonable maximum limit, for example `100`

Handle invalid values such as:

```text
?page=0
?page=-1
?limit=0
?limit=-10
?limit=abc
```

## Architecture

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

### Controller

Responsible for:

- Reading query parameters
- Sending HTTP responses

### Service

Responsible for:

- Pagination-related business logic
- Calculating pagination values
- Calling the repository

### Repository

Responsible for:

- Fetching paginated records
- Applying `LIMIT`
- Applying `OFFSET`
- Getting the total record count

## Suggested Folder Structure

```text
day-05-pagination-api/
│
├── src/
│   ├── modules/
│   │   └── product/
│   │       ├── product.controller.ts
│   │       ├── product.service.ts
│   │       ├── product.repository.ts
│   │       ├── product.schema.ts
│   │       └── product.routes.ts
│   │
│   ├── db/
│   │   ├── schema/
│   │   │   └── product.schema.ts
│   │   └── index.ts
│   │
│   ├── middleware/
│   │
│   ├── app.ts
│   └── server.ts
│
├── drizzle/
├── .env
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

You can modify the structure if required by your architecture.

## Testing Checklist

### Product Creation

- [ ] Create a valid product
- [ ] Reject invalid product data

### Pagination

- [ ] Get first page
- [ ] Get second page
- [ ] Get third page
- [ ] Change the limit
- [ ] Request a page beyond the available pages
- [ ] Verify `totalItems`
- [ ] Verify `totalPages`

### Validation

- [ ] Reject `page=0`
- [ ] Reject negative page
- [ ] Reject `limit=0`
- [ ] Reject negative limit
- [ ] Reject non-numeric values
- [ ] Reject a limit greater than the maximum

### Database

- [ ] Verify `LIMIT` is applied
- [ ] Verify `OFFSET` is applied
- [ ] Verify all records are not fetched and then filtered in JavaScript

## What You Should Learn

By completing this project, you should understand:

1. What pagination is.
2. Why APIs need pagination.
3. How `LIMIT` works.
4. How `OFFSET` works.
5. How to calculate an offset.
6. How to calculate total pages.
7. How to validate pagination parameters.
8. How pagination should be handled at the database level.

## Do Not Add

Keep this project focused.

Do **not** add:

- Search
- Filtering
- Sorting
- Redis
- Caching
- Authentication
- RBAC
- Rate limiting
- Cursor pagination
- Elasticsearch
- Background jobs
- Microservices
- Infinite scroll
- Complex frontend UI

Those are separate concepts.

## Completion Criteria

Day 05 is complete when:

- [ ] Project runs successfully
- [ ] PostgreSQL connection works
- [ ] Product table is created
- [ ] Product creation works
- [ ] Product listing works
- [ ] `page` works
- [ ] `limit` works
- [ ] `LIMIT` is applied at database level
- [ ] `OFFSET` is applied at database level
- [ ] `totalItems` is returned
- [ ] `totalPages` is returned
- [ ] Pagination parameters are validated
- [ ] Edge cases are handled
- [ ] Controller → Service → Repository structure works

## Scope Rule

This is **one independent project**.

```text
Day 05
   ↓
Pagination API
   ↓
LIMIT + OFFSET
```

Do not modify Day 04.

Do not turn Day 05 into a complete search/filter/sort system.

Finish this project and move on to Day 06.
