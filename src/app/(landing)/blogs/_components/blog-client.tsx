"use client";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { useAuthStore } from "@/src/shared/store/store";
import { useState } from "react";
import { LoginFlowModal } from "../../products/_components/login-flow-modal";
import type { Blog } from "../_services/blog.api";
import { toggleSaveBlog } from "../_services/saved-blogs.api";
import { BlogBreadcrumb } from "./blog-breadcrumb";
import { BlogContent } from "./blog-content";
import { BlogDetails } from "./blog-details";
import { BlogHeader } from "./blog-header";
import { BlogMeta } from "./blog-meta";
import { LikeButton } from "./LikeButton";

type BlogClientProps = {
  blog: Blog;
};

export default function BlogClient({ blog }: BlogClientProps) {
  const isLoggedIn = !!useAuthStore((state) => state.user)?.id;

  const [saved, setSaved] = useState(blog.isSaved ?? false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const blogData = {
    title: blog.title,
    image: blog.image || "/images/image32.svg",
    views: blog.view || 0,
    content: blog.content,
    author: blog.author || `کاربر ${blog.user_id}`,
    readTime: `${blog.rading_time || 5} دقیقه `,
    createdAt: blog.created_at
      ? new Date(blog.created_at).toLocaleDateString("fa-IR")
      : "",
    likeCount: blog.likes || 0,
    isLiked: blog.isLiked || false,
  };
  const handleToggleSave = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      const result = await toggleSaveBlog(blog.slug);

      setSaved(result.saved);
    } catch (e) {
      console.error(e);
    }
  };
  console.log("blogData: ", blogData);
  return (
    <DashboardContainer>
      <div className="flex w-full flex-col gap-12 pb-6">
        <BlogBreadcrumb />
        <BlogHeader
          title={blogData.title}
          saved={saved}
          onToggleSave={handleToggleSave}
        />
        <div className="relative flex w-full flex-col items-center justify-center gap-4 min-[830px]:flex-row min-[830px]:gap-0">
          <BlogMeta author={blogData.author} readTime={blogData.readTime} />
          <BlogDetails
            image={blogData.image}
            title={blogData.title}
            views={blogData.views}
            createdAt={blogData.createdAt}
          />
        </div>
        <BlogContent content={blogData.content} />
        <LikeButton initialLikes={blogData.likeCount} />
      </div>
      <LoginFlowModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </DashboardContainer>
  );
}
