"use client";
import { CloseModalIcon } from "@/src/shared/constants/icons";
import { Modal, Text } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/check-box/checkbox.ui";
import { ReviewSubmitTypeModalProps } from "../_types";

export function ReviewSubmitTypeModal({
  isOpen,
  onClose,
  submitType,
  onChange,
}: ReviewSubmitTypeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} zIndex={100}>
      <div className="z-[100] flex w-[230px] flex-col rounded-xs border border-accent bg-white min-[350px]:w-[330px] lg:w-[330px] xl:w-[380px]">
        <div className="flex items-center justify-between border-b border-gray px-3 py-3 md:px-[0.7vw] md:py-[0.8vw]">
          <Text text="نحوه نمایش دیدگاه ها" size="md" weight="medium" />

          <button onClick={onClose} className="cursor-pointer">
            <CloseModalIcon size="xs" />
          </button>
        </div>

        <div className="flex w-full flex-col">
          <button
            onClick={() => onChange("anonymous")}
            className="flex w-full flex-row items-start gap-2 px-3 py-3 text-right md:gap-[0.5vw] md:px-[0.7vw] md:py-[1vw]"
          >
            <div className="pt-1 md:pt-[0.2vw]">
              <Checkbox checked={submitType === "anonymous"} />
            </div>

            <div className="flex min-w-0 flex-col">
              <Text text="ارسال ناشناس" size="md" weight="medium" />

              <Text
                text="دیدگاه شما در صفحه اول با عنوان کاربر دیجی کالا نمایش داده می‌شود."
                size="sm"
                weight="medium"
                color="gray"
              />
            </div>
          </button>

          <button
            onClick={() => onChange("named")}
            className="flex w-full flex-row items-start gap-2 px-3 py-3 text-right md:gap-[0.5vw] md:px-[0.7vw] md:py-[1vw]"
          >
            <div className="pt-1 md:pt-[0.2vw]">
              <Checkbox checked={submitType === "named"} />
            </div>

            <div className="flex min-w-0 flex-col">
              <Text text="ارسال با نام شما" size="md" weight="medium" />

              <Text
                text="دیدگاه شما در صفحه اول با نام شما نمایش داده می‌شود."
                size="sm"
                weight="medium"
                color="gray"
              />
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
}
