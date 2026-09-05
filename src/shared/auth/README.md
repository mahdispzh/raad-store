# Auth Architecture

This module is responsible for all authentication and authorization logic.

It handles:

- JWT generation
- JWT verification
- route protection
- role-based authorization
- extracting authenticated user
- refresh token flow
- logout flow

Used with:

- Next.js App Router
- JWT
- Middleware
- Axios
- Zustand

The API layer handles HTTP communication.

This module handles authentication lifecycle.

---

# Problem We Are Solving

Modern applications usually face these authentication problems:

## 1. Repeated authentication checks

Without centralized auth utilities:

- every route manually verifies token
- duplicated authorization logic
- inconsistent security rules

This creates maintenance and security problems.

---

## 2. Unprotected private pages

Without middleware:

users can directly access protected routes.

Example:

```txt
/dashboard
/profile
```

This creates unauthorized access risks.

---

## 3. Repeated role validation

Without reusable authorization wrappers:

every API route must manually check:

```txt
if user.role === admin
```

This creates duplicated permission logic.

---

## 4. Token expiration

Access tokens expire.

Without refresh flow:

users get logged out too often.

This creates poor user experience.

---

## 5. Inconsistent user extraction

Without a shared utility:

every route manually parses:

```txt
Authorization header
```

This creates duplicated parsing and verification logic.

---

# Our Solution

We centralize all authentication logic inside one module.

---

# Folder Structure

```txt
shared/
└── auth/
    ├── auth.service.ts
    ├── get-user-from-request.ts
    ├── jwt.ts
    ├── middleware.ts
    └── with-auth.ts
```

---

# Authentication Lifecycle

```txt
Client Login
    ↓
Backend generates:
    • accessToken
    • refreshToken
    ↓
accessToken stored in Zustand
refreshToken stored in HttpOnly Cookie
    ↓
Authenticated Request
    ↓
Authorization Header
    ↓
Protected API Route
    ↓
withAuth()
    ↓
getUserFromRequest()
    ↓
JWT Verification
    ↓
Authorized User
```

---

# Token Refresh Lifecycle

When access token expires:

```txt
401 Unauthorized
    ↓
API Interceptor
    ↓
authService.refresh()
    ↓
New Access Token
    ↓
Retry Original Request
```

If refresh fails:

```txt
Refresh Failed
    ↓
authService.logout()
    ↓
Clear Session
    ↓
Redirect to Login
```

---

# File Documentation

---

# jwt.ts

## Purpose

Handles JWT creation and verification.

---

## What problem does it solve?

Without centralized JWT utilities:

- token logic becomes duplicated
- expiration settings become inconsistent
- verification logic spreads across project

---

## What happens here?

This file creates:

## Access Token

```txt
expiresIn: 15m
```

Used for authenticated API requests.

Contains:

```ts
{
  (userId, role);
}
```

---

## Refresh Token

```txt
expiresIn: 30d
```

Used to generate new access tokens.

Usually stored in:

```txt
HttpOnly Cookie
```

---

## verifyToken()

Verifies token validity.

Returns decoded payload:

```ts
{
  (userId, role);
}
```

---

# get-user-from-request.ts

## Purpose

Extracts authenticated user from incoming request.

---

## What problem does it solve?

Without this utility:

every protected route must manually:

- read Authorization header
- split Bearer token
- verify JWT
- handle invalid tokens

Repeated everywhere.

---

## Flow

```txt
Request
   ↓
Read Authorization Header
   ↓
Extract Bearer Token
   ↓
Verify JWT
   ↓
Return User Payload
```

---

## Authorization Header Format

```txt
Authorization: Bearer <token>
```

---

## Returned User Shape

```ts
{
  userId: number;
  role?: number;
}
```

---

# with-auth.ts

## Purpose

Creates reusable protected route wrapper.

Supports:

- authentication
- authorization
- role-based access

---

## What problem does it solve?

Without this wrapper:

every route must manually:

- verify token
- check authentication
- check roles
- return 401
- return 403

This creates duplicated security logic.

---

## Flow

```txt
Incoming Request
    ↓
getUserFromRequest()
    ↓
User Exists?
    ↓
No → 401 Unauthorized
    ↓
Yes
    ↓
Role Check
    ↓
Forbidden? → 403
    ↓
Run Handler
```

---

## Example Usage

```ts
export const GET = withAuth(async (req, user) => {
  return Response.json({
    userId: user.userId,
  });
});
```

---

## Role-Based Authorization

Example:

```ts
withAuth(handler, [1]);
```

Only users with role:

```txt
1
```

can access route.

---

## Unauthorized Response

If no token exists:

```json
{
  "error": "Unauthorized"
}
```

Status:

```txt
401
```

---

## Forbidden Response

If role is invalid:

```json
{
  "error": "Forbidden"
}
```

Status:

```txt
403
```

---

# middleware.ts

## Purpose

Protects private pages before rendering.

---

## What problem does it solve?

Without middleware:

users can directly enter protected routes manually.

Example:

```txt
/dashboard
/profile
```

Even without authentication.

---

## What happens here?

Middleware checks:

```txt
refreshToken cookie
```

before page access.

---

## Protected Routes

```txt
/profile/*
/dashboard/*
```

Configured using:

```ts
matcher;
```

---

## Flow

```txt
User Visits Protected Page
        ↓
Read refreshToken Cookie
        ↓
Verify JWT
        ↓
Valid?
 ├── Yes → Continue
 └── No  → Redirect
```

---

## Redirect Behavior

Unauthenticated users are redirected to:

```txt
/send-otp
```

---

## Why refreshToken instead of accessToken?

Because:

- refresh token lives longer
- stored in HttpOnly cookie
- accessible during middleware execution

Access token usually lives only in client memory.

---

# auth.service.ts

## Purpose

Handles client-side authentication actions.

Supports:

- refresh session
- logout session

---

## What problem does it solve?

Without centralized auth service:

every feature manually handles:

- refresh requests
- logout requests
- token synchronization
- redirect logic

---

# refresh()

## Purpose

Requests a new access token.

---

## Flow

```txt
Expired Access Token
        ↓
POST /api/auth/refresh
        ↓
Receive New Access Token
        ↓
Store in Zustand
        ↓
Retry Failed Request
```

---

## What happens here?

Request:

```ts
POST / api / auth / refresh;
```

Uses:

```ts
withCredentials: true;
```

to send refreshToken cookie automatically.

---

## Zustand Synchronization

New token is stored globally:

```ts
useAuthStore.getState().setToken(newToken);
```

This keeps authenticated requests updated instantly.

---

# logout()

## Purpose

Safely destroys user session.

---

## Flow

```txt
Logout Request
    ↓
POST /api/auth/logout
    ↓
Clear Zustand Token
    ↓
Clear Browser Cookie
    ↓
Redirect User
```

---

## What happens here?

### 1. Backend logout request

```ts
POST / api / auth / logout;
```

---

### 2. Clear client auth state

```ts
setToken(null);
```

---

### 3. Remove cookie fallback

```txt
refreshToken expires=Thu, 01 Jan 1970
```

---

### 4. Redirect user

```txt
/send-otp
```

---

# Integration With API Layer

Authentication integrates with API interceptors.

Flow:

```txt
Request
   ↓
Axios Interceptor
   ↓
Attach Access Token
   ↓
Backend
```

If token expires:

```txt
401
 ↓
authService.refresh()
 ↓
new token
 ↓
retry request
```

---

# Integration With Zustand

Authentication state is stored globally.

Example:

```txt
accessToken
user session
```

This allows:

- automatic token injection
- instant auth updates
- global logout handling

---

# Design Principles

This auth module follows:

## Single Responsibility Principle

Each file has one responsibility:

- jwt → token logic
- middleware → route protection
- with-auth → API authorization
- get-user-from-request → user extraction
- auth.service → client auth actions

---

## Separation of Concerns

Features do not know:

- how JWT works
- how refresh happens
- how authorization is validated
- how logout cleanup works

They only request authenticated data.

---

# Final Architecture

```txt
UI
 ↓
React Query
 ↓
Feature API
 ↓
Axios Client
 ↓
Interceptors
 ↓
Auth Service
 ↓
Backend
```

Server-side protection:

```txt
Middleware
 ↓
Protected Pages
```

API protection:

```txt
withAuth()
 ↓
Protected Route Handlers
```

This architecture is:

- scalable
- secure
- reusable
- maintainable
- feature-based
- production-ready
