# Day 3 Backend Task: URL Shortener

## Goal

Build a small URL Shortener API.

The user provides a long URL, the backend generates a unique short code, stores the mapping in PostgreSQL, and redirects users from the short URL to the original URL.

## APIs

### 1. Create Short URL

**POST** `/urls`

Request:

```json
{
  "url": "https://www.example.com/very/long/path"
}
```

Requirements:
- Validate the URL.
- Generate a unique short code.
- Store the mapping in PostgreSQL.
- Return the short code and short URL.

### 2. Redirect to Original URL

**GET** `/:shortCode`

If the short code exists, redirect to the original URL.

If it does not exist, return `404 Not Found`.

### 3. Get URL Details

**GET** `/urls/:shortCode`

Return the short code, original URL, and creation time.

## Database

Create a `urls` table with at least:

```text
id
shortCode
originalUrl
createdAt
```

Requirements:
- `shortCode` must be unique.
- `originalUrl` is required.
- Use Drizzle + PostgreSQL.

## Concepts to Learn

1. URL validation
2. Unique short-code generation
3. HTTP redirects
4. Database persistence with Drizzle

## Suggested Implementation Order

```text
1. Database schema
2. Migration
3. Repository
4. Service
5. Controller
6. Routes
7. Postman testing
```

## Do NOT Add

Keep the scope small. Do not add:

- Redis
- Authentication
- Rate limiting
- Analytics/click counting
- QR codes
- Custom aliases
- URL expiration
- Cloud storage
- Advanced caching

## Test Cases

### Valid URL

```json
{
  "url": "https://github.com"
}
```

Expected: short URL created.

### Invalid URL

```json
{
  "url": "hello"
}
```

Expected: `400 Bad Request`.

### Existing short code

```text
GET /aB72xK
```

Expected: redirect to original URL.

### Non-existing short code

```text
GET /doesnotexist
```

Expected: `404 Not Found`.

## Interview Questions

Be able to explain:

1. How does a URL shortener work?
2. Why does `shortCode` need a unique constraint?
3. How would you generate a unique short code?
4. What happens when someone opens the short URL?
5. Why do we use HTTP redirect?
6. What happens if two requests generate the same short code?

---
# Interview Questions Answers

## 1. Why did you use the `URL` constructor for URL validation?

**Answer:**

> I used the `URL` constructor because it parses a URL string into a structured URL object. If the provided string is not a valid URL, the constructor throws an error, which I handle using a `try-catch` block. I also check that the protocol is either HTTP or HTTPS.

Example:

```ts
const parsed = new URL(url);

if (
  parsed.protocol !== "http:" &&
  parsed.protocol !== "https:"
) {
  throw new Error("Invalid URL");
}
```

---

## 2. Why did you use `crypto.randomBytes()` to generate the short code?

**Answer:**

> I used `crypto.randomBytes()` to generate a random short code instead of using predictable values such as incremental IDs. In my implementation, I generate 3 random bytes and convert them to hexadecimal, which produces a 6-character hexadecimal string.

Example:

```ts
crypto.randomBytes(3).toString("hex");
```

Here:

```text
3 bytes
   ↓
hex conversion
   ↓
6 hexadecimal characters
```

The generated value is not mathematically guaranteed to be unique, so I also enforce a unique constraint on the `shortCode` column in the database.

---

## 3. Why did you add a unique constraint to `shortCode`?

**Answer:**

> A short code must uniquely identify one URL. If two different URLs had the same short code, the server would not know which original URL should be returned during redirection. Therefore, I added a unique constraint to the `shortCode` column at the database level.

Example:

```text
abc123 → google.com
abc123 → youtube.com
```

This would create ambiguity, so `shortCode` must be unique.

**Important:** The same original URL can technically have multiple short codes. The uniqueness requirement is for the **short code**, not the original URL.

---

## 4. What does `res.redirect()` do?

**Answer:**

> `res.redirect()` sends an HTTP redirect response to the client. Express typically sends a 3xx status code along with a `Location` header containing the target URL. The browser or HTTP client then follows that redirect and navigates to the target URL.

Conceptually:

```text
GET /abc123
      ↓
Find original URL
      ↓
HTTP 3xx response
Location: https://example.com
      ↓
Browser follows the redirect
```

It does **not** directly open a new browser window. The client decides how to handle the redirect.

---

## 5. Why did you separate Controller, Service, and Repository layers?

**Answer:**

> I separated the Controller, Service, and Repository layers to follow separation of concerns and reduce coupling. The Controller handles HTTP requests and responses, the Service contains business logic, and the Repository handles database operations. This makes the code easier to maintain, test, and modify independently.

Architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Controller

Handles:

* Request
* Response
* HTTP status codes

### Service

Handles:

* Business logic
* Validation/business rules
* Coordinating operations

### Repository

Handles:

* Database queries
* Insert
* Select
* Update
* Delete
