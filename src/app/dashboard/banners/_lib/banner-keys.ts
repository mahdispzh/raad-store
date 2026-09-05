// src/app/dashboard/banners/_lib/banner-keys.ts
export const bannerKeys = {
  all: ["banners"] as const,
  detail: (id: number) => [...bannerKeys.all, "detail", id] as const,
};