export const productKeys = {
  all: ["products"] as const,
  list: (page: number, limit: number, params?: { sort?: string; discount?: string }) =>
    [...productKeys.all, "list", page, limit, params ?? {}] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
};