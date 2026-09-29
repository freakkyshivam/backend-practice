# Day 04 - Search API

## Goal

Build a standalone Search API from scratch.

Focus only on:

- Query parameters
- Dynamic filtering
- Database-side filtering
- Case-insensitive search
- Combining optional filters

This project is completely independent of Day 03.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod

---

## Project

Build a Product Search API.

The API should allow users to:

- Create products
- Get all products
- Search products by name or description
- Filter products by category
- Filter products by minimum price
- Filter products by maximum price
- Combine multiple filters

Examples:

```text
GET /products?search=keyboard
GET /products?category=electronics
GET /products?minPrice=1000
GET /products?maxPrice=5000
GET /products?search=keyboard&category=electronics&minPrice=1000&maxPrice=5000
```

---

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

---

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

Return all products.

### 3. Search Products

```http
GET /products?search=keyboard
```

Search in both:

- `name`
- `description`

The search must be case-insensitive. PostgreSQL `ILIKE` can be used.

### 4. Filter by Category

```http
GET /products?category=electronics
```

Return only products in that category.

### 5. Filter by Minimum Price

```http
GET /products?minPrice=1000
```

Return products where:

```text
price >= 1000
```

### 6. Filter by Maximum Price

```http
GET /products?maxPrice=5000
```

Return products where:

```text
price <= 5000
```

### 7. Combine Filters

Multiple filters must work together.

Example:

```http
GET /products?search=keyboard&category=electronics&minPrice=1000&maxPrice=5000
```

The result must satisfy all provided filters.

---
 

## Query Parameters

The following parameters are optional:

```text
search
category
minPrice
maxPrice
```

Examples:

```text
/products
/products?search=mouse
/products?category=electronics
/products?minPrice=500
/products?maxPrice=3000
/products?search=mouse&category=electronics
/products?search=mouse&minPrice=500&maxPrice=3000
```

Do not create a separate endpoint for every filter combination.

Build the database query dynamically based on the parameters provided.

---

## Validation

Use Zod for product creation and query parameters.

Validate:

- `name`
- `description`
- `category`
- `price`
- `search`
- `minPrice`
- `maxPrice`

Handle invalid ranges such as:

```text
minPrice > maxPrice
```

---

## Testing Checklist

### Product Creation

- [ ] Create a valid product
- [ ] Reject invalid product data

### Get Products

- [ ] Get all products

### Search

- [ ] Search by name
- [ ] Search by description
- [ ] Search with different letter cases

### Category

- [ ] Filter by category

### Price

- [ ] Filter by minimum price
- [ ] Filter by maximum price
- [ ] Filter using both minimum and maximum price

### Combined Filters

- [ ] Search + category
- [ ] Search + price
- [ ] Category + price
- [ ] Search + category + price

### Edge Cases

- [ ] No matching products
- [ ] Empty search
- [ ] Invalid price
- [ ] `minPrice > maxPrice`

---

## What You Should Learn

By completing this project, you should understand:

1. How query parameters work in Express.
2. Difference between route parameters and query parameters.
3. How to build dynamic database queries.
4. How to filter data at the database level.
5. How PostgreSQL `ILIKE` works.
6. How multiple optional filters can be combined.
7. How to validate query parameters.

---
  
