// src/app/dashboard/brands/_lib/brand-keys.ts
export const brandKeys = {
  all: ["brands"] as const,
  list: (page: number, limit: number, sort?: string) =>
    [...brandKeys.all, "list", page, limit, sort ?? ""] as const,
  detail: (id: number) => [...brandKeys.all, "detail", id] as const,
};