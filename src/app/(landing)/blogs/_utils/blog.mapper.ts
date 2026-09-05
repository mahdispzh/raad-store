// src/app/(landing)/blogs/_utils/blog.mapper.ts
import { Blog as BlogApi } from "../_services/blog.api";
import { Blogs } from "../_types/blogs";

export const mapBlogApiToBlogs = (apiBlogs: BlogApi[]): Blogs[] => {
  return apiBlogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    summary: blog.summary || "خلاصه‌ای برای این پست وجود ندارد.",
    description: blog.content || "توضیحی برای این پست وجود ندارد.",
    image: blog.image || "/images/image32.svg",
    author: blog.author || "نویسنده ناشناس",
    readTime: blog.rading_time ? String(blog.rading_time) : "زمان نامشخص",
    saved: blog.isSaved || false,
    recent: false,
  }));
};
