# Phase 02 - Authentication & Security
## Task 02: Password Reset Flow

### 1. Objective

Build a secure password reset system using the OTP Service implemented in Task 01.

A user should be able to request a password reset, verify their OTP, and securely set a new password without knowing their old password.

The implementation should follow production-oriented backend practices.

### 2. Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Redis
- Argon2
- Zod
- Custom Error Handling

### 3. Core Requirements

#### A. Forgot Password

Create an endpoint that allows users to initiate a password reset.

**Endpoint:**
`POST /api/auth/forgot-password`

Request:
```json
{
  "email": "user@example.com"
}
```

Requirements:
- Validate the email using Zod.
- Check whether the account exists.
- Generate an OTP using Task 01's OTP Service.
- Never expose whether an email exists.
- Return a generic success response.
- Handle Redis and database failures properly.

#### B. Reset Password

Create an endpoint to reset the user's password.

**Endpoint:**
`POST /api/auth/reset-password`

Request:
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePassword@123"
}
```

Requirements:
- Validate all request fields.
- Verify OTP using Task 01's OTP Service.
- Reject expired or invalid OTPs.
- Enforce password strength requirements.
- Hash the new password using Argon2.
- Update the password in PostgreSQL.
- Ensure an OTP cannot be reused.
- Do not store plain-text passwords anywhere.

#### C. Password Security

Implement the following:

- Use Argon2id for password hashing.
- Never log passwords or OTPs.
- Never return password hashes in API responses.
- Ensure password updates are atomic.
- Handle database errors without exposing internal details.

#### D. Rate Limiting

Protect both endpoints against abuse.

Requirements:
- Implement Redis-based rate limiting.
- Restrict repeated password reset requests.
- Prevent brute-force OTP verification.
- Return HTTP 429 when limits are exceeded.

You may reuse existing Redis utilities where appropriate.

### 4. API Response Examples

**Forgot Password:**

HTTP 200

```json
{
  "success": true,
  "message": "If an account exists, password reset instructions have been sent."
}
```

**Password Reset Successful:**

HTTP 200

```json
{
  "success": true,
  "message": "Password has been reset successfully."
}
```

**Invalid OTP:**

HTTP 400

```json
{
  "success": false,
  "message": "Invalid or expired OTP."
}
```

### 5. Suggested Folder Structure

```text
src/
├── controllers/
│   └── auth.controller.ts
│
├── services/
│   └── auth.service.ts
│
├── repositories/
│   └── user.repository.ts
│
├── routes/
│   └── auth.routes.ts
│
├── validators/
│   └── auth.validator.ts
│
├── middlewares/
│   └── rateLimiter.ts
│
├── utils/
│
├── errors/
│
└── config/
```

You can adjust this structure according to your existing architecture.

### 6. Edge Cases to Handle

- Email does not exist.
- Invalid email format.
- OTP has expired.
- OTP is incorrect.
- OTP has already been used.
- New password is too weak.
- New password is the same as the old password.
- Multiple reset requests for the same email.
- Concurrent reset attempts.
- Redis connection failure.
- PostgreSQL connection failure.
- Rate limit exceeded.

### 7. Testing Requirements

Test the following scenarios:

- [x] Request password reset with valid email.
- [x] Request password reset with unknown email.
- [x] Verify generic responses to prevent account enumeration.
- [x] Reset password with correct OTP.
- [x] Reset password with incorrect OTP.
- [x] Reset password with expired OTP.
- [x] Attempt OTP reuse.
- [x] Attempt reset with weak password.
- [x] Attempt reset with same old password.
- [x] Test rate limiting.
- [x] Verify password is stored as an Argon2 hash.
- [x] Verify old password no longer works after reset.
- [x] Test Redis/database failure handling.
- [x] Test concurrent reset requests.

### 8. Code Quality Requirements

- Follow Controller → Service → Repository architecture.
- Use TypeScript strict typing.
- Use Zod for request validation.
- Use centralized error handling.
- Avoid duplicated business logic.
- Keep Redis operations separate from controllers.
- Write readable, maintainable code.

### 9. Deliverables

- Working password reset API.
- Integration with Task 01 OTP Service.
- Argon2id password hashing.
- Redis-based rate limiting.
- Proper validation and error handling.
- README documentation.
- Successful testing of all required edge cases.

### 10. Completion Criteria

The task will be considered complete when:

1. A user can request a password reset.
2. OTP verification works through Task 01.
3. Password updates happen securely.
4. OTP cannot be reused.
5. Rate limiting works correctly.
6. All important edge cases are handled.
7. All required tests pass.

**Important:** Do not implement JWT authentication, OAuth, refresh tokens, or session management in this task. Keep the scope limited to password reset.

**IMPORTANT:** OTP is logged only for local development/testing.
Production implementation should deliver OTP through a notification provider
and must never log OTP values.