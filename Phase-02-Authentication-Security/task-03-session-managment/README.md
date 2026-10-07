# Phase 02 - Authentication & Security
## Task 03: Session Management

### 1. Objective

Build a secure **server-side session management system using Redis**.

The task will include a minimal login flow using the users already seeded in the database.

The client will authenticate using email and password. After successful authentication, the server will create a secure session and store it in Redis.

The focus is on understanding:

- Authentication
- Server-side sessions
- Redis TTL
- Session validation
- Logout
- Logout from all devices
- Session refresh
- Multiple active sessions
- Session invalidation

---

## 2. Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Redis
- Zod
- Argon2
- Custom Error Handling

---

# 3. Login

Create:

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "user1@example.com",
  "password": "Password@123"
}
```

### Requirements

- Validate input using Zod.
- Find the user using the provided email.
- Verify the password using the existing `PasswordRepository`.
- Reject invalid credentials.
- Do not reveal whether the email or password was incorrect.
- After successful authentication, create a session.
- The `userId` must come from the database.
- The client must never provide the `userId` for session creation.

### Authentication Flow

```text
Client
  │
  │ email + password
  ▼
Login Controller
  │
  ▼
Auth Service
  │
  ├── UserRepository
  │       ↓
  │     Find user
  │
  └── PasswordRepository
          ↓
      Verify password
          │
          ▼
     Authentication OK
          │
          ▼
   SessionService.createSession(user.id)
          │
          ▼
         Redis
```

### Invalid Credentials

Return:

```http
401 Unauthorized
```

Example:

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

Do not return:

```text
User not found
Wrong password
Email does not exist
```

---

# 4. Session Creation

Session creation should happen **internally after successful authentication**.

Do not create a public endpoint such as:

```http
POST /api/auth/session
```

where the client sends:

```json
{
  "userId": "123"
}
```

That would allow a client to attempt creating a session for another user.

Instead:

```ts
sessionService.createSession(user.id);
```

### Requirements

- Generate a cryptographically secure session ID.
- Store the session in Redis.
- Associate the session with the authenticated user.
- Set a TTL.
- Return the session token to the client.
- Never expose unnecessary internal session information.

Do not use:

```text
Math.random()
timestamp
userId
email
```

for session ID generation.

Use Node's cryptographically secure random generator.

---

# 5. Redis Session Structure

Use a key such as:

```text
session:<sessionId>
```

Example:

```text
session:8c5f... 
```

Value:

```json
{
  "userId": "123",
  "createdAt": "2026-10-07T10:00:00Z",
  "lastActiveAt": "2026-10-07T10:00:00Z"
}
```

Set an expiration using Redis TTL.

For example:

```text
SESSION_TTL = 7 days
```

Do not scatter this value throughout the application.

Use configuration:

```env
SESSION_TTL=604800
```

---

# 6. Tracking User Sessions

The application must support multiple active sessions for the same user.

Maintain a secondary Redis structure:

```text
user-sessions:<userId>
```

Example:

```text
user-sessions:123
    ├── session_abc
    ├── session_xyz
    └── session_def
```

This structure will allow `logout-all` to find all active sessions belonging to a user.

Think carefully about keeping:

```text
session:<sessionId>
```

and:

```text
user-sessions:<userId>
```

consistent.

---

# 7. Session Authentication Middleware

Create authentication middleware.

Clients authenticate requests using:

```http
Authorization: Bearer <sessionToken>
```

The middleware should:

1. Read the `Authorization` header.
2. Validate the Bearer format.
3. Extract the session token.
4. Look up the session in Redis.
5. Reject missing sessions.
6. Reject expired sessions.
7. Extract the `userId`.
8. Attach authenticated user/session information to the request.
9. Continue to the controller.

Invalid session:

```http
401 Unauthorized
```

Example:

```json
{
  "success": false,
  "message": "Invalid or expired session"
}
```

---

# 8. Logout

Create:

```http
POST /api/auth/logout
```

The endpoint must require an authenticated session.

Requirements:

- Identify the current session.
- Delete the session from Redis.
- Remove the session from the user's session collection.
- Make the session immediately unusable.
- Logout should be idempotent.

Calling logout multiple times should not cause an error.

Example:

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

# 9. Logout From All Devices

Create:

```http
POST /api/auth/logout-all
```

The endpoint must require authentication.

Example:

```text
User 123

user-sessions:123
    ├── session_A
    ├── session_B
    ├── session_C
    └── session_D

                ↓

           logout-all

                ↓

No active sessions
```

Requirements:

- Find all sessions belonging to the authenticated user.
- Delete all session keys.
- Delete/clear the user's session collection.
- Do not affect another user's sessions.

---

# 10. Session Refresh

Create:

```http
POST /api/auth/session/refresh
```

Requirements:

- Require a valid session.
- Extend the session TTL.
- Preserve the same user.
- Do not create unnecessary duplicate sessions.
- Update `lastActiveAt`.

Example:

```text
Before refresh:
session:abc → TTL 2 days

After refresh:
session:abc → TTL 7 days
```

---

# 11. Session Expiration

Sessions must expire automatically using Redis TTL.

For example:

```text
SESSION_TTL = 7 days
```

Redis should automatically remove expired session keys.

Test that an expired session cannot authenticate a request.

Do not create a manual cron job for session cleanup.

---

# 12. Security Requirements

Implement the following:

- Use cryptographically secure random session IDs.
- Never use `Math.random()` for session generation.
- Never store passwords inside Redis sessions.
- Never store password hashes inside Redis sessions.
- Do not put sensitive user information inside session tokens.
- Sessions must have an expiration.
- Logout must invalidate the session.
- Logout-all must invalidate all sessions for that user.
- Do not log session tokens.
- Use generic authentication errors.
- Prevent session fixation.
- Never trust a client-provided `userId` for authentication.

---

# 13. Session Fixation

The server must generate the session identifier after successful authentication.

The client must not be able to choose:

```text
sessionId
userId
```

The authentication flow must be:

```text
email + password
       ↓
verify credentials
       ↓
server knows user.id
       ↓
generate new random session ID
       ↓
store session in Redis
```

---

# 14. API Responses

### Login Success

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "sessionToken": "..."
  }
}
```

### Logout

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Invalid Session

```json
{
  "success": false,
  "message": "Invalid or expired session"
}
```

---

# 15. Suggested Architecture

```text
src/
├── controllers/
│   ├── auth.controller.ts
│   └── session.controller.ts
│
├── services/
│   ├── auth.service.ts
│   └── session.service.ts
│
├── repositories/
│   ├── User.repository.ts
│   └── Session.repository.ts
│
├── middlewares/
│   └── auth.middleware.ts
│
├── routes/
│   ├── auth.routes.ts
│   └── session.routes.ts
│
├── validators/
│   └── auth.validator.ts
│
├── config/
│
├── errors/
│
└── utils/
```

You may adapt this structure to your existing architecture.

---

# Logging Requirement

Logging is a mandatory part of this task and should be implemented using **Pino**.

## Requirements

- Use structured logging instead of scattered `console.log()` statements.
- Create a centralized logger configuration.
- Support appropriate log levels:
  - `info`
  - `warn`
  - `error`
- Log important application events such as:
  - Successful login
  - Failed authentication
  - Session creation
  - Session logout
  - Logout-all
  - Session refresh
  - Invalid/expired session attempts
  - Redis connection/errors
  - Unexpected application errors
- Use structured metadata where useful, such as `userId`, operation name, or error information.
- Keep development logs readable.
- Use structured JSON logs for production.

## Sensitive Data

The logger must never expose sensitive authentication information.

Never log:

- Passwords
- Password hashes
- OTPs
- Session tokens
- Authorization headers
- Cookies
- Redis credentials
- Database credentials
- API keys
- Secrets

Configure Pino redaction where appropriate to prevent accidental leakage.

## Logging Example

```ts
logger.info({ userId }, "User logged in");

logger.info({ userId }, "Session created");

logger.warn({ userId }, "Invalid session attempt");

logger.error({ err }, "Redis operation failed");
```

Do not use:

```ts
console.log(password);
console.log(otp);
console.log(sessionToken);
```

## Production Principle

Logs should provide enough information to understand what happened without exposing credentials or authentication secrets.

Logging is considered part of the task's completion criteria.

# 16. Testing Requirements

Use the two seeded users in your database.

### Login

- [ ] Login with valid credentials.
- [ ] Login with incorrect password.
- [ ] Login with unknown email.
- [ ] Verify generic authentication error.
- [ ] Login multiple times and create multiple sessions.

### Session Authentication

- [ ] Authenticate using a valid session.
- [ ] Reject an invalid session.
- [ ] Reject an expired session.
- [ ] Reject a missing session.
- [ ] Reject malformed Authorization header.

### Logout

- [ ] Logout successfully.
- [ ] Reuse logged-out session and verify it fails.
- [ ] Call logout twice and verify idempotency.

### Multiple Sessions

Create:

```text
User A
 ├── Session A1
 └── Session A2

User B
 └── Session B1
```

Verify:

- [ ] Logout A1 → A2 remains valid.
- [ ] Logout A1 → B1 remains valid.
- [ ] Logout-all User A → A1/A2 invalid.
- [ ] Logout-all User A → B1 remains valid.

### Refresh

- [ ] Refresh valid session.
- [ ] Verify TTL increases.
- [ ] Verify user remains the same.
- [ ] Reject refresh with invalid session.

### Security

- [ ] Verify session IDs are unpredictable.
- [ ] Verify passwords are never stored in Redis.
- [ ] Verify session tokens are not logged.
- [ ] Verify client cannot choose another user's `userId`.

---

# 17. Edge Cases

Handle:

- Missing Authorization header.
- Empty Bearer token.
- Malformed Authorization header.
- Invalid session ID.
- Expired session.
- Deleted Redis session.
- Redis connection failure.
- User deleted after session creation.
- Logout called multiple times.
- Logout-all when no sessions exist.
- Refresh with an expired session.
- Multiple sessions for the same user.
- Session belonging to another user.

---

# 18. Code Quality Requirements

- Follow Controller → Service → Repository architecture.
- Use strict TypeScript.
- Use Zod for request validation.
- Use centralized error handling.
- Keep Redis operations inside the repository.
- Keep authentication logic inside services.
- Do not duplicate session logic.
- Do not log credentials or session tokens.
- Keep configuration values outside business logic.

---

# 19. Completion Criteria

Task 3 is complete when:

1. A seeded user can log in successfully.
2. Invalid credentials are rejected.
3. Successful login creates a Redis-backed session.
4. Session IDs are cryptographically secure.
5. Auth middleware validates sessions.
6. Sessions expire automatically.
7. Individual logout works.
8. Logout-all works.
9. Multiple sessions per user work.
10. Session refresh works.
11. One user's sessions cannot affect another user's sessions.
12. All required tests pass.

---

## Important Scope Restriction

Do **not** implement:

- JWT
- Refresh-token rotation
- OAuth
- Social login
- Registration
- Email verification
- 2FA
- Password reset

Those are separate concerns.

The focus of this task is:

**Email/password authentication → Redis-backed server-side session → session validation → logout → logout-all → session refresh.**