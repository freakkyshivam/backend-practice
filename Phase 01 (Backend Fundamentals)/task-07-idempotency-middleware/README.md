# Backend Task — Day 7
## Idempotency Middleware

### 🎯 Goal

Build a small Express backend that demonstrates **idempotency**.

The purpose is to prevent the same operation from being executed multiple times when a client retries the same request.

A common example is a payment request:

```text
Client
  ↓
POST /payment
  ↓
Payment succeeds
  ↓
Response gets lost / timeout
  ↓
Client retries
  ↓
Same operation must NOT be processed twice
```

---

## 1. Core Concept

The client creates an **Idempotency-Key** for a new operation.

```http
Idempotency-Key: abc-123
```

### First request

```text
New operation
    ↓
Generate key: abc-123
    ↓
Send request
    ↓
Backend processes operation
    ↓
Store result against abc-123
```

### Retry of the same operation

```text
Same operation
    ↓
Reuse key: abc-123
    ↓
Send request again
    ↓
Backend finds abc-123
    ↓
Return previous result
    ↓
Do NOT execute operation again
```

### Golden Rule

```text
New operation → New key
Retry         → Same key
```

The client should NOT generate a new key when retrying the same operation.

---

# 2. What You Need to Build

Create a simple endpoint:

```http
POST /api/orders
```

Example body:

```json
{
  "productId": "123",
  "quantity": 2
}
```

The client must send:

```http
Idempotency-Key: abc-123
```

---

# 3. Storage

For this exercise, use an in-memory `Map`.

Example:

```ts
Map<string, StoredResponse>
```

You can define something similar to:

```ts
interface StoredResponse {
  statusCode: number;
  body: unknown;
  requestHash?: string;
}
```

Do **NOT** use Redis yet.

The goal is to understand the mechanism first.

---

# 4. Required Behavior

## Case 1: Missing key

Request:

```http
POST /api/orders
```

without:

```http
Idempotency-Key
```

Expected:

```text
400 Bad Request
```

---

## Case 2: First request

```http
Idempotency-Key: abc-123
```

No existing record.

Expected:

```text
Process operation
Store response
Return response
```

---

## Case 3: Same key + same request

Client sends:

```http
Idempotency-Key: abc-123
```

again with the same body.

Expected:

```text
Do NOT execute operation again
Return the previously stored response
```

---

## Case 4: Same key + different request

First request:

```json
{
  "productId": "123",
  "quantity": 2
}
```

with:

```http
Idempotency-Key: abc-123
```

Second request:

```json
{
  "productId": "456",
  "quantity": 5
}
```

with the SAME:

```http
Idempotency-Key: abc-123
```

Expected:

```text
Reject the request
```

Reason:

The same idempotency key must not represent two different operations.

Use an appropriate `4xx` response and a clear message.

---

# 5. Middleware Flow

Your middleware should roughly follow this logic:

```text
Request
   ↓
Read Idempotency-Key
   ↓
Key exists?
   ├── No → 400
   │
   └── Yes
        ↓
   Is key already stored?
        ├── No
        │    ↓
        │  Allow request
        │    ↓
        │  Store result
        │
        └── Yes
             ↓
       Compare request
             ↓
       Same request?
        ├── Yes → return stored response
        │
        └── No → reject
```

Don't blindly copy this into code. Design the middleware yourself.

---

# 6. Important Edge Case

Think about this:

```text
Request A
Idempotency-Key: abc-123
        ↓
      Processing...

Request B arrives almost immediately
Idempotency-Key: abc-123
        ↓
      Processing...
```

If both requests arrive before the first one finishes, can your simple `Map` guarantee that the operation only executes once?

**Think about this before considering the task complete.**

You don't necessarily need to build a production-grade solution today. You need to understand the problem.

---

# 7. Testing Checklist

Test at least these cases:

- [ ] Missing `Idempotency-Key`
- [ ] First request with new key
- [ ] Same key + same body
- [ ] Same key + different body
- [ ] Different key + same body
- [ ] Multiple retries
- [ ] Two requests arriving close together

Example:

```text
Request 1
Key: abc-123
Body: { productId: "123", quantity: 2 }
→ Operation executes

Request 2
Key: abc-123
Body: { productId: "123", quantity: 2 }
→ Previous response returned

Request 3
Key: abc-123
Body: { productId: "456", quantity: 1 }
→ Rejected
```

---

# 8. Interview Questions

After implementation, you should be able to answer these without notes:

### Basic

1. What is idempotency?
2. Why is it important for payment APIs?
3. Why does the client reuse the same key?
4. Why can't the backend generate a new key for every retry?

### Backend

5. Where should idempotency data be stored?
6. Why is an in-memory `Map` not suitable for multiple Node.js instances?
7. What happens if the server restarts?
8. How would Redis improve this design?

### Concurrency

9. What happens if two requests with the same key arrive at the same time?
10. How could you prevent both requests from executing the operation?

---

# 9. Production Thinking

Your implementation today is intentionally simple:

```text
Node.js
   ↓
In-memory Map
```

A distributed production system could look like:

```text
             Load Balancer
                  ↓
        ┌─────────┼─────────┐
        ↓         ↓         ↓
     Node A    Node B    Node C
        └─────────┼─────────┘
                  ↓
                Redis
```

The important thing is not to implement this today.

First understand:

```text
idempotency key
       ↓
identify operation
       ↓
store result
       ↓
reuse result on retry
```

---

# 10. Completion Criteria

Day 7 Backend is complete when:

- [ ] You understand idempotency
- [ ] You understand how the client creates and reuses the key
- [ ] Middleware is implemented
- [ ] First request works
- [ ] Duplicate request does not execute twice
- [ ] Same key + different body is rejected
- [ ] Tests pass
- [ ] You can explain the design without looking at the code

---

 

**Goal:** Understand idempotency deeply enough to explain and implement the basic mechanism yourself.
