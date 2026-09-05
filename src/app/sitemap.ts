// src/app/sitemap.ts

import { MetadataRoute } from "next";

const URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3006";

// ⚠️ این‌ها رو با سرویس واقعی خودت جایگزین کن (مثلاً فراخوانی API یا Prisma)
// نکته مهم SEO: sitemap باید محصولات و دسته‌بندی‌های واقعی رو هم شامل بشه،
// وگرنه گوگل صفحات محصول رو دیرتر و سخت‌تر پیدا می‌کنه.
async function getAllProductSlugs(): Promise<
  { slug: string; updatedAt: string }[]
> {
  try {
    const res = await fetch(`${URL}/api/products/sitemap`, {
      next: { revalidate: 3600 }, // هر ساعت رفرش شه
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getAllCategorySlugs(): Promise<
  { slug: string; updatedAt: string }[]
> {
  try {
    const res = await fetch(`${URL}/api/categories/sitemap`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// بلاگ‌ها هم باید توی sitemap باشن، وگرنه صفحات جدید مجله دیرتر ایندکس میشن
async function getAllBlogSlugs(): Promise<
  { slug: string; updatedAt: string }[]
> {
  try {
    const res = await fetch(`${URL}/api/blogs/sitemap`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, blogs] = await Promise.all([
    getAllProductSlugs(),
    getAllCategorySlugs(),
    getAllBlogSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${URL}/products/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${URL}/products?category=${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${URL}/blogs/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...blogRoutes,
  ];
}