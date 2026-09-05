# Users API Architecture

This module is responsible for user management.

It handles:

- authentication identity
- user profile
- admin user management
- role updates
- user deletion

Used with:

- Next.js App Router
- Prisma
- PostgreSQL
- JWT Authentication
- Role Based Access Control

---

# Business Goal

The system has 3 user roles:

```txt
0 → blocked
1 → customer
2 → admin
```

# Folder Structure

app/
└── api/
├── auth/
│ └── me/
│
├── user/
│ └── profile/
│
└── admin/
└── users/
├── route.ts
└── [userId]/
├── route.ts
└── role/
└── route.ts

# Relationships:

users
├── auth_sessions
├── carts
├── orders
└── user_addresses
