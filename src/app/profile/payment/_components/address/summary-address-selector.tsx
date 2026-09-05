// src/app/profile/payment/_components/summary-address-selector.tsx

"use client";
import { DropdownArrowIcon } from "@/src/shared/constants/icons/dropdown-arrow-icon";
import { TruckIcon } from "@/src/shared/constants/icons/truck-icon";
import { Caption, Text } from "@/src/shared/ui";
import { SummaryAddressSelectorProps } from "../../_types/address.types";

export function SummaryAddressSelector({
  address,
  onOpenModal,
}: SummaryAddressSelectorProps) {
  return (
    <div className="rounded-sm border border-gray p-4 md:p-6">
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-1 flex-row items-start gap-3 md:gap-5">
          <div className="mt-1">
            <TruckIcon color="text-primary" />
          </div>
          <div className="flex flex-1 flex-col gap-2 md:gap-3">
            <Text text="ارسال به آدرس منتخب" size="lg" weight="medium" />
            <Text 
              size="md" 
              weight="regular" 
              text={address || "آدرسی انتخاب نشده است"} 
            />
          </div>
        </div>
        <button
          onClick={onOpenModal}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-xs bg-gray px-3 py-2 md:gap-2 md:px-4 md:py-2.5"
        >
          <Caption text="انتخاب آدرس" size="xs" weight="regular" />
          <DropdownArrowIcon size="xs" />
        </button>
      </div>
    </div>
  );
}