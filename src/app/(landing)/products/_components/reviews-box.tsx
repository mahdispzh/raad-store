"use client";

import { Text } from "@/src/shared/ui";
import { ReviewsProps } from "../_types/landing-product.types";
import { CommentItem } from "./comment-item";
import { ReviewSummary } from "./review-summary";

export function Reviews({
  rating,
  rawComments,
  productTitle,
  productImage,
  landingProduct,
  isLoggedIn,
  userId,
}: ReviewsProps) {
  // فیلتر کامنت‌های معتبر (status === 1)
  const validComments = rawComments.filter((comment) => comment.status === 1);

  const formattedComments = validComments.map((comment) => {
    let userName = "کاربر مهمان";
    if (comment.isUnknown === true) {
      userName = "کاربر ناشناس";
    } else if (comment.users?.name) {
      userName = comment.users.name;
    }
    let formattedDate = "تاریخ نامشخص";
    if (comment.created_at) {
      try {
        formattedDate = new Date(comment.created_at).toLocaleDateString(
          "fa-IR",
        );
      } catch {
        formattedDate = "تاریخ نامعتبر";
      }
    }
    return {
      user: userName,
      date: formattedDate,
      text: comment.text || "",
      rate: comment.rating ?? 0,
    };
  });

  return (
    <div className="flex flex-col rounded-sm border border-gray md:flex-row">
      <div className="w-full md:flex-2">
        <ReviewSummary
          rating={rating ?? 0}
          totalVotes={validComments.length}
          productTitle={productTitle}
          productImage={productImage}
          landingProduct={landingProduct}
          isLoggedIn={isLoggedIn}
          userId={userId}
        />
      </div>
      <div className="flex w-full flex-col p-4 md:flex-5 md:p-[2vw]">
        {formattedComments.length === 0 ? (
          <div className="flex h-32 items-center justify-center">
            <Text
              text="هیچ دیدگاه معتبری برای این محصول ثبت نشده است."
              size="md"
              color="gray"
            />
          </div>
        ) : (
          formattedComments.map((item, index) => (
            <div key={index}>
              <CommentItem
                user={item.user}
                date={item.date}
                text={item.text}
                rate={item.rate}
              />
              {index !== formattedComments.length - 1 && (
                <div className="px-2 py-4 md:px-[5vw] md:py-[4vw]">
                  <div className="h-px bg-gray" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
