"use client";

import {
  CloseModalIcon,
  DropdownArrowIcon,
} from "@/src/shared/constants/icons";
import { Caption, DefaultButton, Modal, Text } from "@/src/shared/ui";
import Image from "next/image";
import { AddReviewModalProps } from "../_types";
import { ReviewSubmitTypeModal } from "./review-submit-type-modal";

export function AddReviewModal({
  isOpen,
  onClose,
  productTitle,
  productImage,
  landingProduct,
}: AddReviewModalProps) {
  const {
    review,
    setReview,
    isNameModalOpen,
    setIsNameModalOpen,
    submitType,
    setSubmitType,
    isButtonActive,
    handleSubmitReview,
    isSubmitting,
  } = landingProduct;

  const handleSubmit = () => {
    handleSubmitReview();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex h-[470px] w-[250px] flex-col overflow-y-auto rounded-xs border border-accent bg-white min-[350px]:h-[500px] min-[350px]:w-[350px] md:overflow-visible lg:h-[520px] lg:w-[350px] xl:h-[600px] xl:w-[400px]">
          <div className="flex flex-none flex-row items-center justify-between border-b-2 border-gray px-3 py-3">
            <Text text="ثبت دیدگاه" size="md" weight="medium" />
            <button onClick={onClose} className="cursor-pointer">
              <CloseModalIcon size="xs" />
            </button>
          </div>

          <div className="flex w-full flex-none flex-row gap-3 p-3 md:h-full md:flex-2 md:gap-[0.7vw] md:p-[0.7vw]">
            <div className="relative h-24 w-24 shrink-0 md:h-40 md:w-40">
              <Image
                alt={productTitle}
                src={productImage}
                fill
                className="rounded-xs object-cover"
                sizes="(max-width: 768px) 96px, 160px"
              />
            </div>
            <div className="min-w-0 flex-1 pt-1 md:flex-5 md:pt-[0.5vw]">
              <Text text={productTitle} size="sm" weight="medium" />
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col justify-center gap-3 p-3 md:h-full md:flex-5 md:gap-[0.5vw] md:p-[0.7vw]">
            <div className="flex flex-row gap-1 md:gap-[0.1vw]">
              <Caption text="متن دیدگاه:" size="xs" weight="medium" />
              <Text text="*" size="sm" weight="medium" color="danger" />
            </div>

            <div className="flex h-full w-full flex-col rounded-xs border-2 border-gray">
              <div className="flex-8">
                <textarea
                  rows={5}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="text-regular h-full w-full resize-none border-b-2 border-gray p-2 text-sm text-primary outline-none md:p-[0.5vw]"
                />
              </div>
              <div className="flex flex-1 flex-row items-center justify-between px-2 py-2">
                <Caption text="نام کاربر" size="xs" weight="medium" />
                <button
                  onClick={() => setIsNameModalOpen(true)}
                  className="flex h-8 w-25 shrink-0 cursor-pointer flex-row items-center justify-center gap-1 rounded-xs bg-gray"
                >
                  <Caption
                    text={
                      submitType === "named"
                        ? "ارسال با نام شما"
                        : "ارسال ناشناس"
                    }
                    size="xs"
                    weight="regular"
                  />
                  <DropdownArrowIcon size="xs" color="text-primary" />
                </button>
              </div>
            </div>

            <div className="pt-4 md:pt-[2.5vw]">
              <DefaultButton
                label={isSubmitting ? "در حال ارسال..." : "ثبت دیدگاه"}
                action={handleSubmit}
                disabled={!isButtonActive || isSubmitting}
              />
            </div>

            <div className="flex w-full flex-row flex-wrap justify-center gap-1 md:gap-[0.2vw]">
              <Caption
                text="ثبت دیدگاه به معنی موافقت با"
                size="xs"
                weight="regular"
              />
              <Caption
                text="قوانین انتشار سایت"
                size="xs"
                weight="regular"
                color="danger"
              />
              <Caption text="می باشد." size="xs" weight="regular" />
            </div>
          </div>
        </div>
      </Modal>

      <ReviewSubmitTypeModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        submitType={submitType}
        onChange={setSubmitType}
      />
    </>
  );
}
