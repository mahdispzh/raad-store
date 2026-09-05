// src/app/profile/payment/_components/address/address-selection-modal-content.tsx

"use client";
import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { PlusEmptyIcon } from "@/src/shared/constants/icons/plus-empty-icon";
import { SearchIcon } from "@/src/shared/constants/icons/search-icon";
import { Text, DefaultButton } from "@/src/shared/ui";
import { AddressItem } from "./address-item";
import { AddressSelectionModalContentProps } from "../../_types/address.types";
import { useEffect } from "react";
import Link from "next/link";

export function AddressSelectionModalContent({
  addresses,
  selectedAddressId,
  onSelectAddressId,
  onConfirm,
  onClose,
  isLoading = false,
}: AddressSelectionModalContentProps) {
  // ✅ دیباگ - لاگ گرفتن از آدرس‌ها
  useEffect(() => {
    console.log("📋 AddressSelectionModalContent - addresses:", addresses);
    console.log("📋 AddressSelectionModalContent - selectedAddressId:", selectedAddressId);
  }, [addresses, selectedAddressId]);

  return (
    <div className="h-[31vw] w-[25vw] border-2 border-gray bg-white">
      <div className="flex flex-row justify-between border-b border-gray p-[1.5vw]">
        <div className="flex flex-row items-center gap-[0.6vw]">
          <div onClick={onClose} className="cursor-pointer">
            <CloseIcon size="sm" color="text-primary items-center" />
          </div>
          <Text text="انتخاب آدرس" size="md" weight="medium" />
        </div>
          <Link 
          href="/profile/addresses"
          className="flex cursor-pointer flex-row items-center gap-[0.5vw] hover:opacity-70 transition-opacity"
          onClick={(e) => {
            // اگر می‌خواهید مودال بسته شود قبل از رفتن به صفحه آدرس
            onClose();
          }}
        >
          <PlusEmptyIcon size="md" color="text-primary" />
          <Text text="آدرس جدید" size="md" weight="medium" />
        </Link>
      </div>

      <div className="flex h-full flex-col px-[0.5vw]">
        <div className="flex h-full w-full flex-1 items-center justify-center p-[1.5vw]">
          <div className="relative w-full">
            <input
              type="text"
              className="h-[2vw] w-full rounded-sm bg-gray p-[0.7vw] pr-[2.2vw] text-xs text-primary placeholder:text-white focus:border-white focus:outline-none"
              placeholder="جستجو"
            />
            <div className="absolute top-0 right-0 flex h-full items-center pr-[0.7vw]">
              <SearchIcon size="md" color="text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-7 flex-col gap-[1vw] overflow-y-auto p-[1.5vw] pt-0 [direction:ltr]">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Text
                text="در حال دریافت آدرس‌ها..."
                size="md"
                weight="medium"
                color="gray"
              />
            </div>
          ) : addresses.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <Text
                text="آدرسی ثبت نشده است"
                size="md"
                weight="medium"
                color="gray"
              />
            </div>
          ) : (
            addresses.map((address, idx) => {
              // ✅ دیباگ - نمایش هر آدرس
              console.log(`📍 آدرس ${idx + 1}:`, {
                id: address.id,
                title: address.title,
                isDefault: address.isDefault,
                isSelected: selectedAddressId === address.id,
                fullAddress: address.fullAddress
              });
              
              return (
                <div
                  key={address.id}
                  className="flex flex-col gap-[1vw] [direction:rtl]"
                >
                  <div className="flex items-center gap-2">
                    <AddressItem
                      title={address.title}
                      addressText={address.fullAddress}
                      isSelected={selectedAddressId === address.id}
                      onSelect={() => {
                        console.log(`🔄 انتخاب آدرس با ID: ${address.id}`);
                        onSelectAddressId(address.id);
                      }}
                    />
                    {address.isDefault && (
                      <span className="rounded bg-green-500 px-2 py-0.5 text-xs text-white">
                        پیش‌فرض
                      </span>
                    )}
                  </div>
                  {idx !== addresses.length - 1 && (
                    <div className="h-0.5 w-full bg-gray" />
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="flex-3 p-[1.5vw]">
          <DefaultButton
            type="secondary"
            style="fill"
            label={isLoading ? "در حال بارگذاری..." : "تایید آدرس و ادامه"}
            action={() => {
              console.log("✅ کلیک روی تایید آدرس");
              onConfirm();
            }}
            disabled={isLoading || addresses.length === 0}
           
          />
        </div>
      </div>
    </div>
  );
}