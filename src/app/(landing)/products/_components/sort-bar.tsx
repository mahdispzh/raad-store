"use client";

import { FilterIcon } from "@/src/shared/constants/icons";
import { CustomSelect, Text } from "@/src/shared/ui";
import { SortBarProps } from "../_types";

interface ExtendedSortBarProps extends SortBarProps {
  onOpenPriceFilter?: () => void;
  onOpenColorFilter?: () => void;
}

export function SortBar({
  options,
  title = "مرتب سازی:",
  onOpenPriceFilter,
  onOpenColorFilter,
}: ExtendedSortBarProps) {
  const activeIndex = options.findIndex((option) => option.active);
  const selectValue = activeIndex >= 0 ? activeIndex : 0;

  const selectOptions = options.map((option, index) => ({
    label: option.label,
    value: index,
  }));

  const handleSelectChange = (index: number) => {
    options[index]?.onClick();
  };

  return (
    <div className="flex w-full flex-col gap-3 border-b border-gray p-3 lg:flex-row lg:items-center lg:gap-[1.5vw] lg:p-[1vw]">
      {/* ==================== موبایل/تبلت: dropdown مرتب‌سازی + دکمه‌های فیلتر ==================== */}
      <div className="flex flex-row items-center gap-2 lg:hidden">
        <div className="shrink-0">
          <Text text={title} weight="medium" size="lg" />
        </div>
        <div className="w-36">
          <CustomSelect
            options={selectOptions}
            value={selectValue}
            onChange={handleSelectChange}
          />
        </div>

        <div className="mr-auto flex shrink-0 flex-row gap-2">
          <button
            onClick={onOpenPriceFilter}
            className="flex h-10 cursor-pointer flex-row items-center justify-center gap-1 rounded-sm border border-gray px-3"
          >
            <FilterIcon size="xs" />
            <Text text="قیمت" size="sm" weight="medium" />
          </button>
          <button
            onClick={onOpenColorFilter}
            className="flex cursor-pointer flex-row items-center gap-1 rounded-sm border border-gray px-3 py-1.5"
          >
            <FilterIcon size="xs" />
            <Text text="رنگ" size="sm" weight="medium" />
          </button>
        </div>
      </div>

      {/* ==================== دسکتاپ: همون ردیف متنی قبلی ==================== */}
      <div className="hidden w-full flex-row items-center gap-[1.5vw] lg:flex">
        <Text text={title} weight="medium" size="lg" />
        {options.map((option, index) => (
          <button
            key={index}
            onClick={option.onClick}
            className="shrink-0 cursor-pointer"
          >
            {option.active ? (
              <Text
                text={option.label}
                weight="medium"
                size="md"
                color="primary"
              />
            ) : (
              <p className="text-medium text-justify text-md whitespace-nowrap text-primary/50">
                {option.label}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
