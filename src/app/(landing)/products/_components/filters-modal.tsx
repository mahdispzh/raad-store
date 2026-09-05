"use client";

import { CloseModalIcon } from "@/src/shared/constants/icons";
import { DefaultButton, Text } from "@/src/shared/ui";
import type { Color } from "../_types/landing-products.types";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";

interface FiltersModalProps {
  filterType: "price" | "color";
  onClose: () => void;
  applyFilters: () => void;
  resetFilters: () => void;
  colors: Color[];
  tempPriceRange: { min: number; max: number };
  setTempPriceRange: (
    updater: (prev: { min: number; max: number }) => {
      min: number;
      max: number;
    },
  ) => void;
  tempSelectedColorIds: number[];
  updateTempColor: (id: number) => void;
}

export function FiltersModal({
  filterType,
  onClose,
  applyFilters,
  resetFilters,
  colors,
  tempPriceRange,
  setTempPriceRange,
  tempSelectedColorIds,
  updateTempColor,
}: FiltersModalProps) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/10 sm:items-center lg:hidden"
      onClick={onClose}
    >
      <div
        className="flex h-auto max-h-[75dvh] max-h-[75vh] w-full flex-col overflow-hidden rounded-t-2xl border-2 border-gray-200 bg-white sm:w-[420px] sm:max-w-[90vw] sm:rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="flex flex-none flex-row items-center justify-between border-b border-gray px-4 py-4">
          <Text
            text={filterType === "price" ? "محدوده قیمت" : "رنگ"}
            size="lg"
            weight="bold"
          />
          <button onClick={onClose} className="cursor-pointer">
            <CloseModalIcon size="xs" />
          </button>
        </div>

        {/* بدنه: همون کامپوننت‌های پایه، بدون هدر داخلی */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
          {filterType === "price" ? (
            <PriceFilter
              hideHeader
              show={true}
              setShow={() => {}}
              minPrice={tempPriceRange.min}
              maxPrice={tempPriceRange.max}
              onMinPriceChange={(min) =>
                setTempPriceRange((prev) => ({ ...prev, min }))
              }
              onMaxPriceChange={(max) =>
                setTempPriceRange((prev) => ({ ...prev, max }))
              }
            />
          ) : (
            <ColorFilter
              hideHeader
              show={true}
              setShow={() => {}}
              selectedColorIds={tempSelectedColorIds}
              onToggleColor={updateTempColor}
              colors={colors}
            />
          )}
        </div>

        {/* فوتر */}
        <div className="flex flex-none flex-row gap-3 border-t border-gray px-4 py-4">
          <div className="flex-1">
            <DefaultButton
              label="حذف فیلتر‌ها"
              action={resetFilters}
              style="outline"
              type="primary"
            />
          </div>
          <div className="flex-1">
            <DefaultButton
              label="اعمال فیلتر"
              action={applyFilters}
              style="fill"
              type="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
