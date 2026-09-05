"use client";

import { BlogFilters } from "@/src/app/(landing)/blogs/_components/blogs-filter";
import { Blogs } from "@/src/app/(landing)/blogs/_types/blogs";
import { BlogsFilterType } from "@/src/app/(landing)/blogs/_types/blogs-filter-type";
import { useAuthStore } from "@/src/shared/store/store";
import { useMemo, useState } from "react";
import { LoginFlowModal } from "../../products/_components/login-flow-modal";
import { useRecentlyBlogs } from "../_hooks/useRecentlyBlogs";
import { useSavedBlogs } from "../_hooks/useSavedBlogs";
import { toggleSaveBlog } from "../_services/saved-blogs.api";
import { mapBlogApiToBlogs } from "../_utils/blog.mapper";
import { BlogsCard } from "./blogs-card";

type BlogListProps = {
  initialBlogs: Blogs[];
  activeFilter?: BlogsFilterType;
};

export function BlogsList({
  initialBlogs,
  activeFilter = "all",
}: BlogListProps) {
  const [filter, setFilter] = useState<BlogsFilterType>(activeFilter);
  const [allBlogs, setAllBlogs] = useState<Blogs[]>(initialBlogs);
  const isLoggedIn = !!useAuthStore((state) => state.user)?.id;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleFilterChange = (newFilter: BlogsFilterType) => {
    if (!isLoggedIn && (newFilter === "saved" || newFilter === "recent")) {
      setShowLoginModal(true);
      return;
    }

    setFilter(newFilter);
  };

  // ✅ گرفتن بلاگ‌های ذخیره‌شده فقط وقتی فیلتر روی "saved" هست
  const { data: savedData, isLoading: isSavedLoading } = useSavedBlogs(
    isLoggedIn && filter === "saved",
  );
  console.log("savedData", savedData);

  // ✅ گرفتن آخرین مطالعه‌ها فقط وقتی فیلتر روی "recent" هست
  const { data: recentlyData, isLoading: isRecentlyLoading } = useRecentlyBlogs(
    isLoggedIn && filter === "recent",
  );
  console.log("recent blgs:", recentlyData);
  // ✅ انتخاب لیست مناسب بر اساس فیلتر فعال
  const displayedBlogs = useMemo(() => {
    if (filter === "saved") {
      if (!isLoggedIn) return [];
      return savedData ? mapBlogApiToBlogs(savedData.data) : [];
    }

    if (filter === "recent") {
      if (!isLoggedIn) return [];
      return recentlyData ? mapBlogApiToBlogs(recentlyData) : [];
    }

    return allBlogs;
  }, [filter, isLoggedIn, savedData, recentlyData, allBlogs]);

  const isLoading =
    (filter === "saved" && isSavedLoading) ||
    (filter === "recent" && isRecentlyLoading);

  // ✅ تابع تغییر وضعیت ذخیره‌سازی (برای هر دو حالت all و saved)
  const toggleSave = async (slug: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      const result = await toggleSaveBlog(slug);

      // به‌روزرسانی وضعیت saved در لیست اصلی (حالت "all")
      setAllBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.slug === slug ? { ...blog, saved: result.saved } : blog,
        ),
      );
    } catch (error) {
      console.error("خطا در تغییر وضعیت ذخیره‌سازی:", error);
      alert("خطا در ذخیره‌سازی بلاگ. لطفاً دوباره تلاش کنید.");
    }
  };
  console.log("blogs", initialBlogs);
  return (
    <div className="gap-layout flex w-full flex-col">
      <BlogFilters activeFilter={filter} onChange={handleFilterChange} />
      <div className="flex flex-col">
        {isLoading ? (
          <div className="py-8 text-center">در حال بارگذاری...</div>
        ) : (
          displayedBlogs.map((blog, index) => (
            <BlogsCard
              key={blog.id}
              blog={blog}
              isLast={index === displayedBlogs.length - 1}
              onToggleSave={toggleSave}
            />
          ))
        )}
      </div>
      <LoginFlowModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
