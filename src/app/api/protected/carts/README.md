# Cart API Architecture

This module is responsible for managing the authenticated user's shopping cart.

It handles:

- creating cart automatically
- reading cart
- adding items
- updating quantity
- removing items
- clearing cart

Used with:

- Next.js App Router
- Prisma
- PostgreSQL
- JWT Authentication

---

# Business Goal

Every authenticated user must have exactly one cart.

The cart contains:

- selected products
- selected variants
- quantities

The cart belongs only to its owner.

Unauthorized users cannot access cart APIs.

---

# Database Tables

## carts

Represents the user's shopping cart.

Fields:

- id
- user_id
- created_at

Relationship:

One user → One cart

---

## cart_items

Represents products inside the cart.

Fields:

- id
- card_id
- product_variant_id
- quantity

Relationship:

One cart → Many cart items

---

# Folder Structure

```txt
app/
└── api/
    └── user/
        └── cart/
            ├── route.ts
            └── items/
                ├── route.ts
                └── [itemId]/
                    └── route.ts
```
