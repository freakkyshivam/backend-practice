# 🚀 30-Day Backend Practice Roadmap

## How to use this roadmap

- Day number does **not** mean calendar day.
- One task can take 2-5 days if needed.
- Complete the current task before moving to the next one.
- Implementation should be done independently.
- Official documentation is allowed.
- Each task has a limited learning scope. Do not over-engineer it.
- After completing a task, share the code for review before moving forward.

---

## Phase 1: Backend Fundamentals

### Day 01 - Task Management REST API
**Focus:** REST APIs, CRUD, PostgreSQL, Drizzle ORM, and Controller → Service → Repository architecture.

### Day 02 - File Upload Service
**Focus:** `multipart/form-data`, Multer, file validation, unique filenames, and local filesystem operations.

### Day 03 - URL Shortener
**Focus:** URL validation, short-code generation, PostgreSQL persistence, and HTTP redirects.

### Day 04 - Search API
**Focus:** Search endpoints, query parameters, filtering, and database query design.

### Day 05 - Pagination API
**Focus:** Offset pagination, cursor pagination, limits, page navigation, and pagination trade-offs.

### Day 06 - Rate Limiter
**Focus:** Redis-based rate limiting, request counting, TTL, and preventing API abuse.

### Day 07 - Mini Project 1
**Focus:** Combine Days 1-6 into a small backend service and practice integrating multiple backend concepts.

---

## Phase 2: Authentication & Security

### Day 08 - OTP Service
**Focus:** OTP generation, Redis storage, expiry/TTL, verification, and attempt limits.

### Day 09 - Password Reset
**Focus:** Secure password-reset flow, reset tokens/OTP, expiration, and password update.

### Day 10 - Session Management
**Focus:** Sessions, cookies, session expiry, logout, and session storage.

### Day 11 - Access + Refresh Tokens
**Focus:** JWT lifecycle, access tokens, refresh tokens, expiry, and token rotation concepts.

### Day 12 - RBAC System
**Focus:** Roles, permissions, authorization middleware, and protected resources.

### Day 13 - API Security
**Focus:** CORS, CSRF, input validation, brute-force protection, secure headers, and common API security practices.

### Day 14 - Mini Project 2: Authentication System
**Focus:** Combine OTP, password reset, sessions/tokens, and RBAC into a complete authentication service.

---

## Phase 3: Database + Redis

### Day 15 - Redis Caching
**Focus:** Cache-aside pattern, Redis caching, TTL, cache hits/misses, and reducing database queries.

### Day 16 - Cache Invalidation
**Focus:** Stale data, invalidation strategies, TTL, and deciding when cached data should be removed or updated.

### Day 17 - PostgreSQL Transactions
**Focus:** ACID, transactions, commit/rollback, and atomic multi-step operations.

### Day 18 - Database Indexing
**Focus:** Database indexes, query performance, composite indexes, and understanding when indexes help.

### Day 19 - Database Concurrency
**Focus:** Race conditions, concurrent operations, locking, and preventing inconsistent data.

### Day 20 - Mini Project 3
**Focus:** Build a backend service combining PostgreSQL transactions, indexes, concurrency handling, and Redis caching.

---

## Phase 4: Async Processing & Production Concepts

### Day 21 - Background Jobs
**Focus:** Queue architecture, asynchronous processing, workers, and moving heavy work outside the request cycle.

### Day 22 - Email / Notification Queue
**Focus:** Asynchronous email/notification processing using a queue and worker architecture.

### Day 23 - Retry & Failure Handling
**Focus:** Failed jobs, retries, exponential backoff, dead-letter concepts, and failure handling.

### Day 24 - Idempotency
**Focus:** Idempotency keys, duplicate requests, safe retries, and preventing duplicate operations.

### Day 25 - Webhooks
**Focus:** Receiving webhook events, signature verification, event processing, retries, and webhook reliability.

### Day 26 - Logging & Monitoring
**Focus:** Structured logging, error tracking, request logs, metrics, and basic observability.

### Day 27 - API Performance
**Focus:** Finding bottlenecks, query optimization, response performance, caching, and measuring improvements.

### Day 28 - Mini Project 4
**Focus:** Build a production-style backend combining queues, retries, idempotency, webhooks, logging, and monitoring.

---

## Phase 5: System Design + Final Project

### Day 29 - System Design Challenge
**Focus:** Design a complete backend system including APIs, database schema, authentication, caching, queues, failure handling, and scaling strategy.

### Day 30 - Final Backend Project
**Focus:** Build one complete backend system using the most important concepts learned throughout the roadmap.

The final project should demonstrate:

- API design
- Database design
- Authentication and authorization
- Redis/caching
- Background jobs
- Error/failure handling
- Idempotency where required
- Logging/monitoring
- Performance considerations
- Basic scalability thinking

---

# 🎯 Roadmap Progression

```text
Days 1-7
Backend Fundamentals
        ↓
Days 8-14
Authentication & Security
        ↓
Days 15-20
Database + Redis
        ↓
Days 21-28
Async Processing + Production
        ↓
Days 29-30
System Design + Final Project
```

# 🧠 Core Rule

Do not try to make every project production-perfect.

Each day has a specific learning objective.

**Learn → Build → Test → Review → Move Forward**

The goal is not to build one giant project with every concept.

The goal is to build multiple focused backend systems so that each concept gets practiced independently.
