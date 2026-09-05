// _components/lib/color-keys.ts
export const colorKeys = {
  all: ["colors"] as const,
  list: (page: number, limit: number, sort?: string) =>
    [...colorKeys.all, "list", page, limit, sort ?? ""] as const,
  detail: (id: number) => [...colorKeys.all, "detail", id] as const,
};