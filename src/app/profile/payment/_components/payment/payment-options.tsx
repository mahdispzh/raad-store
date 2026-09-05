"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons/dropdown-arrow-icon";
import { WalletIcon } from "@/src/shared/constants/icons/wallet-icon";
import { Text } from "@/src/shared/ui";
import { Radio } from "@/src/shared/ui/radio/radio.ui";
import { PaymentOptionsProps } from "../../_types/payment.types";

export function PaymentOptions({
  selectedGateway,
  onSelectGateway,
  onApplyDiscount,
  isDiscountOpen,
  toggleDiscount,
  discountCodeInput,
  setDiscountCodeInput,
  discountError,
}: PaymentOptionsProps) {
  const handleSubmitDiscount = () => {
    if (discountCodeInput.trim()) {
      onApplyDiscount(discountCodeInput);
    }
  };

   return (
    <div className="flex flex-3 flex-col rounded-sm border border-gray">
      <div className="flex flex-row items-start gap-4 rounded-t-sm border-b border-gray bg-gray-100 px-4 py-7 md:px-6 md:py-9 lg:gap-6">
        <div className="-mt-2">
          <WalletIcon color="text-primary" size="lg" />
        </div>
        <div className="flex flex-col gap-[0.7vw]">
          <Text text="پرداخت اینترنتی" size="lg" weight="medium" />
          <Text text="درگاه زرین‌پال" weight="regular" size="sm" color="gray" />
        </div>
      </div>
      {/* بخش کد تخفیف */}
      {/* <div className="flex w-full flex-col">
        <div
          className={`flex w-full flex-row items-start gap-[1vw] px-4 md:px-6 ${
            isDiscountOpen ? "pt-[2vw] pb-[0.7vw]" : "py-5 md:py-9"
          }`}
        >
          <div className="flex w-full flex-row justify-between">
            <Text text="کد تخفیف" size="lg" weight="medium" />
            <div
              className="flex cursor-pointer flex-row items-center gap-[0.3vw]"
              onClick={toggleDiscount}
            >
              <Text text="کد تخفیف" size="md" weight="regular" color="danger" />
              <div
                className={`transition-transform duration-300 ${
                  isDiscountOpen ? "rotate-180" : ""
                }`}
              >
                <DropdownArrowIcon size="sm" color="text-danger" />
              </div>
            </div>
          </div>
        </div>
        {isDiscountOpen && (
          <div className="flex flex-col gap-4 px-4 pb-4 lg:px-6 lg:pb-6">
            <Text
              text="کد تخفیف خود را وارد کنید."
              size="sm"
              weight="medium"
              color="gray"
            />
            <div className="relative">
              <input
                type="text"
                placeholder="مثلاً SAVE10"
                value={discountCodeInput}
                onChange={(e) => setDiscountCodeInput(e.target.value)}
                className="text-medium h-12 w-full rounded-sm border border-gray p-2 pr-2 pl-14 text-xs text-primary placeholder:text-gray focus:border-gray focus:outline-none"
              />
              <button
                onClick={handleSubmitDiscount}
                disabled={!discountCodeInput.trim()}
                className={`text-medium absolute inset-y-0 left-0 flex items-center px-3 font-medium text-xs transition-colors ${
                  discountCodeInput.trim()
                    ? "cursor-pointer text-danger hover:text-danger/80"
                    : "cursor-not-allowed text-gray-400"
                }`}
              >
                ثبت
              </button>
            </div>
            {discountError && (
              <Text text={discountError} size="sm" color="danger" />
            )}
          </div>
        )}
      </div> */}
    </div>
  );
}
