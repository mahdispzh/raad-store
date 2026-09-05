export const userKeys = {
  all: ["users"] as const,
  list: (page: number, limit: number, sort?: string) =>
    ["users", "list", page, limit, sort] as const,
  detail: (id: number) => ["users", "detail", id] as const,
};
