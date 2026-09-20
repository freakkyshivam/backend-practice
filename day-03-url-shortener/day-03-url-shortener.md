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

## Completion Criteria

- [ ] `urls` table works
- [ ] URL creation works
- [ ] URL validation works
- [ ] Unique short code is generated
- [ ] Redirect works
- [ ] URL details endpoint works
- [ ] Invalid URL is handled
- [ ] Non-existing short code returns 404
- [ ] You can explain the complete flow verbally
