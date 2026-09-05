import { z } from "zod";

// Schema برای هر مرحله
export const blogStep1Schema = z.object({
  title: z.string().min(1, "عنوان بلاگ ضروری است"),
  author: z.string().min(1, "نام نویسنده ضروری است"),
  summary: z.string().min(1, "خلاصه بلاگ ضروری است"),
  // ✅ فیلدهای جدید
  status: z.number().int().min(0).max(3).default(1),
  publishAt: z.string().optional(),
});

export const blogStep2Schema = z.object({
  keywords: z.array(z.string()).min(1, "حداقل یک کلیدواژه ضروری است"),
  tags: z.array(z.string()).min(1, "حداقل یک تگ ضروری است"),
  readTime: z.string().min(1, "زمان مطالعه ضروری است"),
  image: z.any().optional(),
});

export const blogStep3Schema = z.object({
  content: z.string().min(1, "متن بلاگ ضروری است"),
});

// Schema کامل برای کل فرم
export const blogFormSchema = blogStep1Schema
  .merge(blogStep2Schema)
  .merge(blogStep3Schema);

export type BlogFormValues = z.infer<typeof blogFormSchema>;
