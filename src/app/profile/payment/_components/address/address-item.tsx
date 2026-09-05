// src/app/profile/payment/_components/address/address-item.tsx

"use client";
import { Caption, Text } from "@/src/shared/ui";
import { Radio } from "@/src/shared/ui/radio/radio.ui";
import { AddressItemProps } from "../../_types/address.types";

export function AddressItem({
  title,
  addressText,
  isSelected,
  onSelect,
}: AddressItemProps) {
  return (
    <div 
      className={`flex flex-row items-start gap-[0.7vw] cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors ${
        isSelected ? "bg-white" : ""
      }`}
      onClick={onSelect}
    >
      <Radio checked={isSelected} onChange={onSelect} />
      <div className="flex flex-1 flex-col gap-[0.7vw]">
        <Text text={title} color="gray" weight="medium" size="sm" />
        <Caption text={addressText} weight="regular" size="xs" />
      </div>
    </div>
  );
}