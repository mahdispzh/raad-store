// _lib/blog-keys.ts
export const blogKeys = {
  all: ["dashboard-blogs"] as const,
  list: (page: number, limit: number, status?: string) =>
    [...blogKeys.all, "list", page, limit, status ?? ""] as const,
};