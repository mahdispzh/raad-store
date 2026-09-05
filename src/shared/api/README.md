# API Architecture

This module is responsible for all HTTP communication with the backend.

It provides:

- centralized HTTP client
- request configuration
- automatic error normalization
- reusable request wrapper
- automatic token injection
- automatic request retry

Used with:

- Next.js
- Axios
- React Query

Authentication logic itself lives inside the auth module.

This module only handles HTTP communication.

---

# Problem We Are Solving

Modern applications usually face these API problems:

## 1. Duplicate HTTP configuration

Without a centralized API layer:

- every feature creates its own axios instance
- headers become inconsistent
- timeout values differ
- credentials may be forgotten

This creates maintenance problems.

---

## 2. Repetitive try/catch blocks

Without a shared request wrapper:

every feature must write:

- try
- catch
- response.data extraction
- error parsing

This creates duplicated code.

---

## 3. Inconsistent error shapes

Different endpoints may return different error formats.

Without normalization:

UI components must understand backend-specific responses.

This tightly couples UI to backend implementation.

---

## 4. Token injection on every request

Without interceptors:

every request must manually attach:

Authorization header.

This creates repeated authentication logic.

---

## 5. Token expiration

If access token expires:

requests fail with:

401 Unauthorized

Without automatic retry:

user experience becomes poor.

---

# Our Solution

We centralize all HTTP communication in one module.

---

# Folder Structure

```txt id="7l2mke"
shared/
└── api/
    ├── client.ts
    ├── error-handler.ts
    ├── fetcher.ts
    ├── interceptors.ts
    └── types.ts
```

---

# Request Lifecycle

```txt id="vxg2jk"
Component
   ↓
React Query
   ↓
Feature API
   ↓
fetcher()
   ↓
apiClient
   ↓
Request Interceptor
   ↓
Backend
```

If token expires:

```txt id="q5w8be"
401 Unauthorized
   ↓
Response Interceptor
   ↓
Auth Module
   ↓
new token
   ↓
retry original request
```

---

# File Documentation

---

# client.ts

## Purpose

Creates one centralized axios instance.

---

## What problem does it solve?

Without this file:

- every feature creates its own HTTP client
- duplicated configuration
- inconsistent headers

---

## What happens here?

This file configures:

## baseURL

```txt id="9n3kqv"
NEXT_PUBLIC_API_URL
```

Defines backend base URL.

---

## timeout

```txt id="i6v8ta"
15000ms
```

Prevents requests from hanging forever.

---

## default headers

```txt id="9m4xqr"
Content-Type: application/json
```

Ensures all requests use JSON.

---

## withCredentials

```txt id="w8h6sx"
true
```

Allows browser cookies to be sent automatically.

Needed for refresh token flow.

---

# types.ts

## Purpose

Contains shared API types.

---

## What problem does it solve?

Without centralized types:

- duplicated interfaces
- unsafe retry logic
- inconsistent error typing

---

# ApiErrorResponse

Represents backend error shape.

Example:

```txt id="s5k4om"
message
code
errors
```

---

# RetryableAxiosRequestConfig

Adds:

```txt id="x7d2br"
_retry
```

This flag prevents infinite retry loops.

---

# error-handler.ts

## Purpose

Normalizes all backend errors.

---

## What problem does it solve?

Different APIs may return different error structures.

Without normalization:

every UI component handles errors differently.

---

## What happens here?

Converts any axios error into:

```ts id="j0z3mb"
{
  (message, status, code);
}
```

Now every feature receives the same error shape.

---

# fetcher.ts

## Purpose

Creates a reusable request wrapper.

---

## What problem does it solve?

Without fetcher:

every feature must manually:

- await request
- extract response.data
- try/catch
- normalize errors

Repeated everywhere.

---

## What happens here?

Flow:

```txt id="3f9lmk"
request
 ↓
await response
 ↓
extract response.data
 ↓
normalize errors
```

---

## Example Usage

```ts id="x4r2nk"
return fetcher(apiClient.get("/products"));
```

Feature code stays clean.

---

# interceptors.ts

## Purpose

Handles requests before sending.

Handles responses after receiving.

---

# Request Interceptor

## What problem does it solve?

Authenticated requests need:

Authorization header.

Without interceptor:

every feature must manually attach token.

---

## Flow

```txt id="f6q3zp"
request
 ↓
read token from memory
 ↓
attach Authorization header
 ↓
send request
```

Header:

```txt id="4z7vhl"
Authorization: Bearer <token>
```

---

# Response Interceptor

## What problem does it solve?

Access tokens expire.

Without automatic retry:

requests fail.

---

## Flow

If backend returns:

401 Unauthorized

```txt id="v4r8kn"
401
 ↓
call authService.refresh()
 ↓
receive new token
 ↓
retry original request
```

---

# Retry Protection

A custom flag is used:

```txt id="k9t4bn"
_retry
```

This ensures:

one request is retried only once.

Without it:

refresh could create an infinite loop.

---

# Failure Flow

If refresh fails:

```txt id="a2m8xs"
refresh failed
 ↓
authService.logout()
 ↓
reject request
```

Invalid sessions are cleaned safely.

---

# Integration With Feature Modules

Feature modules never use axios directly.

Instead:

```txt id="m5q9ep"
Feature API
   ↓
fetcher()
   ↓
apiClient
```

Example:

```ts id="u7n3dj"
export async function getProducts() {
  return fetcher(apiClient.get("/products"));
}
```

This keeps features simple.

---

# Integration With React Query

React Query only handles:

- caching
- refetching
- server state

Authentication and HTTP concerns stay inside API layer.

Flow:

```txt id="z8c3lw"
React Query
 ↓
Feature API
 ↓
fetcher
 ↓
interceptors
 ↓
backend
```

This keeps responsibilities separated.

---

# Design Principles

This API layer follows:

## Single Responsibility Principle

Each file has one responsibility:

- client → HTTP configuration
- types → typing
- fetcher → request wrapper
- error-handler → error normalization
- interceptors → request lifecycle

---

## Separation of Concerns

Features do not know:

- how tokens are attached
- how retries happen
- how errors are normalized

They only request data.

---

# Final Architecture

```txt id="n4w7pj"
UI
 ↓
React Query
 ↓
Feature API
 ↓
fetcher
 ↓
apiClient
 ↓
interceptors
 ↓
backend
```

This architecture is:

- scalable
- maintainable
- reusable
- feature-based
- production-ready
