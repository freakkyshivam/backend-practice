# Day 09 - OTP Service

## Goal

Build a small OTP service that demonstrates the core mechanics of passwordless verification:

```text
Generate OTP
    ↓
Store in Redis with TTL
    ↓
Verify OTP
    ↓
Limit failed attempts
    ↓
Invalidate after successful verification
```

The goal is to understand OTP lifecycle and Redis expiry, not to build a complete authentication system.

---

## Limited Learning Objectives

By the end of this task, you should understand:

1. How to generate a secure numeric OTP.
2. How to store OTP data in Redis with an expiry.
3. How to verify an OTP safely.
4. How to limit incorrect verification attempts.
5. Why OTPs should be single-use.

Do not add JWT, sessions, OAuth, email queues, or a complete login system.

---

## Requirements

### 1. Generate OTP

Create:

```http
POST /api/otp/generate
```

Request:

```json
{
  "identifier": "user@example.com"
}
```

Requirements:

- Generate a 6-digit OTP.
- Use a cryptographically secure random source.
- Do not return the OTP in the API response.
- Store the OTP in Redis.
- OTP expiry: **5 minutes**.

For this practice task, you may log the OTP on the server so you can test the flow without integrating an email/SMS provider.

---

### 2. Verify OTP

Create:

```http
POST /api/otp/verify
```

Request:

```json
{
  "identifier": "user@example.com",
  "otp": "123456"
}
```

Requirements:

- Verify the OTP from Redis.
- Reject an incorrect OTP.
- Reject an expired OTP.
- Delete/invalidate the OTP after successful verification.
- A successfully verified OTP cannot be reused.

---

### 3. Attempt Limit

Allow a maximum of:

```text
5 failed verification attempts
```

After the limit is reached:

```http
429 Too Many Requests
```

Requirements:

- Track failed attempts in Redis.
- Give the attempt counter an expiry.
- Reset/remove the relevant state after successful verification.

Keep the attempt-limit logic simple.

---

### 4. OTP Regeneration

If the user requests another OTP:

```http
POST /api/otp/generate
```

for the same identifier:

- Replace the previous OTP.
- Reset its expiry.
- Reset the failed-attempt state.

You do not need to implement resend cooldowns or SMS/email delivery.

---

## Suggested Redis Keys

Keep the key design simple.

Example:

```text
otp:{identifier}
otp_attempts:{identifier}
```

You can choose a different naming convention if it is consistent.

---

## Suggested Response Behavior

### Generate

```json
{
  "message": "OTP generated successfully"
}
```

### Successful verification

```json
{
  "message": "OTP verified successfully"
}
```

### Invalid OTP

```json
{
  "message": "Invalid OTP"
}
```

### Expired/missing OTP

```json
{
  "message": "OTP expired or not found"
}
```

### Too many attempts

```json
{
  "message": "Too many verification attempts"
}
```

Exact response structure is not important. Correct behavior is.

---

## Testing Checklist

- [ ] OTP is exactly 6 digits.
- [ ] OTP is generated securely.
- [ ] OTP is stored in Redis.
- [ ] OTP has a 5-minute TTL.
- [ ] Correct OTP verifies successfully.
- [ ] Incorrect OTP is rejected.
- [ ] Expired OTP is rejected.
- [ ] OTP cannot be reused after successful verification.
- [ ] Failed attempts are counted.
- [ ] Verification is blocked after 5 failed attempts.
- [ ] Attempt state has an expiry.
- [ ] Generating a new OTP replaces the old OTP.
- [ ] Generating a new OTP resets failed attempts.

---

## What NOT to Add

Do not add:

- JWT
- Sessions
- OAuth
- Password hashing
- Email provider integration
- SMS provider integration
- BullMQ
- Background jobs
- 2FA
- WebAuthn
- User registration
- Full authentication middleware
- OTP database tables
- Distributed locks
- Production deployment
- Complex resend policies

Those belong to later tasks or are outside this task's learning objective.

---

## Completion Criteria

Day 09 is complete when:

- [ ] Generate endpoint works.
- [ ] Redis stores OTP with TTL.
- [ ] Verify endpoint works.
- [ ] Expired OTPs fail.
- [ ] Successful OTP verification is single-use.
- [ ] Failed attempts are limited to 5.
- [ ] Redis attempt state expires.
- [ ] Regenerating an OTP invalidates the previous OTP.
- [ ] You can explain the complete OTP lifecycle without looking at the code.

---

## Interview Questions

After completing the task, be able to answer:

1. Why should OTPs expire?
2. Why store OTPs in Redis instead of PostgreSQL for this use case?
3. Why should an OTP be single-use?
4. Why should the OTP not be returned by the API?
5. Why use a cryptographically secure random generator?
6. How does Redis TTL help here?
7. Why limit failed verification attempts?
8. What happens if the server restarts?
9. What changes would be required if multiple backend instances handle requests?
10. How would you safely send the OTP to a real user?

---

## Scope Rule

This is an OTP mechanics task.

```text
Generate
   ↓
Redis + TTL
   ↓
Verify
   ↓
Attempt limit
   ↓
Single-use
```

Do not turn it into a complete authentication system.

**Learn → Build → Test → Review → Move Forward**
