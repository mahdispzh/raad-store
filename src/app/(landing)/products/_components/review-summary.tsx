"use client";

import { Caption, DefaultButton, Subtitle, Title } from "@/src/shared/ui";
import { StarRating } from "@/src/shared/ui/star-rating/star-rating.ui";
import { useState } from "react";
import { ReviewSummaryProps } from "../_types";
import { AddReviewModal } from "./add-review-modal";
import { LoginFlowModal } from "./login-flow-modal";

export function ReviewSummary({
  rating,
  totalVotes,
  productTitle,
  productImage,
  landingProduct,
  isLoggedIn,
  userId,
}: ReviewSummaryProps) {
  const { isReviewModalOpen, setIsReviewModalOpen } = landingProduct;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenReviewModal = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setIsReviewModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsReviewModalOpen(true);
  };

  return (
    <div className="h-auto flex-2 p-[3vw]">
      <Title variant="underlined" size="3xl" text="امتیاز و دیدگاه کاربران" />

      <div className="flex flex-row items-center gap-[0.2vw] py-[1.2vw]">
        <Subtitle text={rating.toFixed(1)} size="3xl" weight="bold" />
        <Caption text="از ۵" size="xs" weight="medium" />
      </div>

      <div className="flex flex-col gap-[0.7vw]">
        <StarRating value={rating} size="md" />
        <Caption
          text={`از مجموع ${totalVotes} امتیاز`}
          size="xs"
          weight="regular"
        />
      </div>

      <div className="flex flex-col gap-[0.7vw] py-[2vw]">
        <Caption
          text="شماهم درباره این کالا دیدگاه خود را ثبت کنید."
          size="xs"
          weight="regular"
        />

        <DefaultButton
          label="ثبت دیدگاه"
          style="outline"
          action={handleOpenReviewModal}
        />
      </div>

      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productTitle={productTitle}
        productImage={productImage}
        landingProduct={landingProduct}
      />

      {/* مودال لاگین برای کاربران مهمان */}
      <LoginFlowModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
