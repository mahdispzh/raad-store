export const commentKeys = {
  all: ["comments"] as const,
  list: (page: number, limit: number, status?: string) =>
    ["comments", "list", page, limit, status] as const,
  detail: (id: number) => ["comments", "detail", id] as const,
};
