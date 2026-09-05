// src/app/(landing)/blogs/page.tsx

import type { Metadata } from "next";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { BlogsList } from "../_components/blogs-list";
import { getBlogs } from "../_services/blog.api";
import { mapBlogApiToBlogs } from "../_utils/blog.mapper";
import { blogsMetadata, getBlogsJsonLd } from "@/src/shared/lib/seo/metadata";

export const metadata: Metadata = blogsMetadata;

export default async function BlogsPage() {
  const { data } = await getBlogs({ page: 1, limit: 10 });
  const blogs = mapBlogApiToBlogs(data);

  const jsonLd = getBlogsJsonLd(
    blogs.map((b) => ({ slug: b.slug, title: b.title, image: b.image })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DashboardContainer>
        <BlogsList activeFilter="all" initialBlogs={blogs} />
      </DashboardContainer>
    </>
  );
}