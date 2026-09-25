# Day 06 - Rate Limiter

## Goal

Build a standalone API Rate Limiter for an Express application.

The goal is to understand how a **fixed-window rate limiter** works and how Express middleware can control the number of requests made by a client.

This project is completely independent of Day 05.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript

---

## Task

Create a reusable rate-limiting middleware with this rule:

```text
Maximum 5 requests
within 1 minute
per client
```

If the client stays within the limit, the request should continue normally.

If the client exceeds the limit, return:

```http
429 Too Many Requests
```

---

## Request Flow

```text
Client
   ↓
Rate Limiter Middleware
   ↓
Route
   ↓
Controller
```

---

## Client Identification

For this task, identify a client using its IP address.

You do not need:

- Authentication
- API keys
- User accounts

---

## Rate Limiter Behavior

For every request:

```text
1. Identify the client
2. Check whether a record exists
3. Check whether the current time window has expired
4. Reset the record if the window expired
5. Increment the request count
6. Allow the request if the limit has not been exceeded
7. Return 429 if the limit has been exceeded
```

---

## Data Structure

Use an in-memory `Map`.

Conceptually:

```text
Map<clientId, {
    count,
    windowStart
}>
```

The exact TypeScript implementation is up to you.

Do not use Redis.

---

## Example

Assume:

```text
limit = 5
window = 60 seconds
```

Requests:

```text
Request 1 → Allowed
Request 2 → Allowed
Request 3 → Allowed
Request 4 → Allowed
Request 5 → Allowed
Request 6 → 429 Too Many Requests
```

After the window expires:

```text
Request 7 → Allowed
```

The counter should start again for the new window.

---

## API Requirements

Create at least one route for testing.

Example:

```http
GET /api/test
```

Successful response:

```json
{
  "message": "Request successful"
}
```

Apply the rate limiter middleware to this route.

You may create additional routes if useful for testing, but keep the project simple.

---

## Error Response

When the limit is exceeded:

```http
HTTP/1.1 429 Too Many Requests
```

Example:

```json
{
  "message": "Too many requests. Please try again later."
}
```

---

## Suggested Folder Structure

```text
day-06-rate-limiter/
│
├── src/
│   ├── middleware/
│   │   └── rateLimiter.ts
│   │
│   ├── controllers/
│   │   └── test.controller.ts
│   │
│   ├── routes/
│   │   └── test.routes.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

You can change the structure if your architecture requires it.

---
 
  

## What You Should Learn

By completing this project, you should understand:

1. What API rate limiting is.
2. Why APIs use rate limiting.
3. How a fixed-window rate limiter works.
4. How to identify a client.
5. How to track request counts.
6. How to track a time window.
7. How Express middleware can block a request.
8. Why `429 Too Many Requests` is used.
9. The limitations of an in-memory rate limiter.

---

## Important Limitation

This implementation uses an in-memory `Map`.

The rate-limit state belongs to the current Node.js process.

If the server restarts:

```text
Stored request counts → Lost
```

If multiple server instances are running:

```text
Client
  ↓
Load Balancer
  ├── Server A → own Map
  └── Server B → own Map
```

Each server has separate rate-limit state.

Understanding this limitation is enough for this task.

Do not solve it with Redis yet.

---

## Interview Questions

After completing the implementation, be able to answer:

1. What problem does rate limiting solve?
2. Why is `429 Too Many Requests` used?
3. How does a fixed-window rate limiter work?
4. Why did you use an in-memory `Map`?
5. What happens when the server restarts?
6. What happens when multiple server instances are running?
7. Why would Redis be useful for distributed rate limiting?
8. Where should rate limiting be placed in an Express request flow?

---

 
