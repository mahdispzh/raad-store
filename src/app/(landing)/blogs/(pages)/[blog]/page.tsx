// src/app/(landing)/blogs/[blog]/page.tsx

import {
  buildBlogMetadata,
  getBlogJsonLd,
} from "@/src/shared/lib/seo/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import BlogClient from "../../_components/blog-client";
import { getBlogBySlug } from "../../_services/blog.api";

type PageProps = {
  params: Promise<{ blog: string }> | { blog: string };
};

// ✅ با cache() یه بار فچ می‌شه و بین generateMetadata و خود کامپوننت
// به اشتراک گذاشته می‌شه (درخواست تکراری به API زده نمی‌شه)
const getBlog = cache(async (slug: string) => {
  return getBlogBySlug(decodeURIComponent(slug));
});

async function resolveSlug(params: PageProps["params"]) {
  const resolved = params instanceof Promise ? await params : params;
  return resolved.blog;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = await resolveSlug(params);
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "مقاله یافت نشد",
      robots: { index: false, follow: false },
    };
  }

  return buildBlogMetadata(blog);
}

export default async function BlogPage({ params }: PageProps) {
  const slug = await resolveSlug(params);
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = getBlogJsonLd(blog);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient blog={blog} />
    </>
  );
}
