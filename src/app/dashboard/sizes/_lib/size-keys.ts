// src/app/dashboard/sizes/_lib/size-keys.ts
export const sizeKeys = {
  all: ["sizes"] as const,
  list: (page: number, limit: number, sort?: string) =>
    [...sizeKeys.all, "list", page, limit, sort ?? ""] as const,
  detail: (id: number) => [...sizeKeys.all, "detail", id] as const,
};