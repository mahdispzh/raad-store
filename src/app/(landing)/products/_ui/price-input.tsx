"use client";

import { TomanIcon } from "@/src/shared/constants/icons/toman-icon";
import { Text } from "@/src/shared/ui";

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
};

function formatWithCommas(digits: string): string {
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function PriceInput({ label, value, onChange, onBlur }: Props) {
  const displayValue = formatWithCommas(value.replace(/\D/g, ""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // فقط رقم‌ها رو نگه می‌داریم؛ کاماها و هر کاراکتر دیگه‌ای حذف می‌شه
    const rawDigits = e.target.value.replace(/\D/g, "");
    onChange(rawDigits);
  };

  return (
    <div className="flex justify-center gap-[0.5vw]">
      <Text text={label} size="sm" weight="regular" />

      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onBlur={onBlur}
        className="text-bold w-30 appearance-none border-b border-gray text-center text-lg text-primary outline-none"
      />

      <TomanIcon size="sm" />
    </div>
  );
}
