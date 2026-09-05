"use client";

import { useCommentDetailWithProduct } from "@/src/app/dashboard/comments/_hooks/useCommentDetailWithProduct";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { useParams } from "next/navigation";
import { ProductCommentsLayout } from "../../_components/product-card/product-comments-layout";
import { ProductCommentsSummary } from "../../_components/product-card/product-comments-summary";

export default function Page() {
  const params = useParams();

  const commentId = typeof params.id === "string" ? params.id : params.id?.[0];

  const { comment, product, isLoading, error } =
    useCommentDetailWithProduct(commentId);

  if (isLoading) {
    return (
      <DashboardContainer>
        <DashboardMain>
          <div className="flex items-center justify-center p-8">
            <span>در حال بارگذاری...</span>
          </div>
        </DashboardMain>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <DashboardMain>
          <div className="p-8 text-danger">
            خطا: {error.message || "دریافت اطلاعات با مشکل مواجه شد"}
          </div>
        </DashboardMain>
      </DashboardContainer>
    );
  }

  if (!comment || !product) {
    return (
      <DashboardContainer>
        <DashboardMain>
          <div className="p-8">کامنت یا محصولی یافت نشد</div>
        </DashboardMain>
      </DashboardContainer>
    );
  }

  // ✅ تبدیل کامنت‌های API به ProductCommentType
  const mappedComments = (product.comments || []).map((apiComment: any) => ({
    id: apiComment.id,
    text: apiComment.text,
    username: apiComment.users?.name || "کاربر ناشناس",
    date: new Date(apiComment.created_at).toLocaleDateString("fa-IR"),
    rating: 0, // اگر API امتیاز دارد، از آن استفاده کن
    size: "نامشخص",
    color: "نامشخص",
  }));

  // ✅ تبدیل محصول API به CommentedProductType
  const mappedProduct = {
    id: product.id,
    title: product.name,
    image: product.images?.[0] || "",
    variant: "نامشخص",
    storeName: "فروشگاه بونامی",
    guarantee: "گارانتی اصالت و سلامت فیزیکی کالا",
    slug: product.slug,
    description: product.description,
    // اگر فیلدهای دیگری نیاز است، آن‌ها را هم اضافه کن
  };

  // ✅ محاسبه میانگین امتیاز
  const averageRating =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.rating, 0) /
        product.ratings.length
      : 0;

  const safeRating =
    typeof averageRating === "number" && !isNaN(averageRating)
      ? averageRating
      : 0;

  const summaryData = {
    score: safeRating,
    rating: safeRating,
    totalVotes: product.ratings?.length || 0,
  };

  console.log("اطلاعات کامل محصول:", product);
  console.log("لیست کامنت‌های محصول:", product.comments);

  return (
    <DashboardContainer>
      <DashboardMain>
        <ProductCommentsLayout
          comments={mappedComments} // ← داده‌های تبدیل‌شده
          product={mappedProduct} // ← داده‌های تبدیل‌شده
        />
        <ProductCommentsSummary summary={summaryData} />
      </DashboardMain>
    </DashboardContainer>
  );
}
