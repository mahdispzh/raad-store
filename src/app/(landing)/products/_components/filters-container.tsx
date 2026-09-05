"use client";

import { FilterIcon } from "@/src/shared/constants/icons";
import { DefaultButton, Text } from "@/src/shared/ui";
import { FiltersContainerProps } from "../_types/landing-products.types";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";

export function FiltersContainer({
  tempPriceRange,
  setTempPriceRange,
  tempSelectedColorIds,
  updateTempColor,
  activeFilter,
  setActiveFilter,
  applyFilters,
  resetFilters,
  colors,
}: FiltersContainerProps) {
  return (
    <div className="h-auto flex-1 self-start rounded-sm border border-gray">
      <div className="flex justify-between border-b border-gray p-[1.5vw]">
        <div className="flex flex-row gap-1">
          <FilterIcon size="xs" />
          <Text text="فیلترها" size="md" weight="medium" />
        </div>
        <button onClick={resetFilters} className="cursor-pointer">
          <Text text="حذف فیلتر‌ها" size="sm" weight="medium" />
        </button>
      </div>

      <div className="flex flex-col gap-[1vw] px-[1vw] py-[1.5vw]">
        <PriceFilter
          show={activeFilter === "price"}
          setShow={() =>
            setActiveFilter(activeFilter === "price" ? null : "price")
          }
          minPrice={tempPriceRange.min}
          maxPrice={tempPriceRange.max}
          onMinPriceChange={(min) =>
            setTempPriceRange((prev) => ({ ...prev, min }))
          }
          onMaxPriceChange={(max) =>
            setTempPriceRange((prev) => ({ ...prev, max }))
          }
        />

        <div className="h-px bg-gray" />

        <ColorFilter
          show={activeFilter === "color"}
          setShow={() =>
            setActiveFilter(activeFilter === "color" ? null : "color")
          }
          selectedColorIds={tempSelectedColorIds}
          onToggleColor={updateTempColor}
          colors={colors}
        />
      </div>

      <div className="p-[1vw] px-[1.5vw] py-[1.5vw]">
        <DefaultButton
          label="اعمال فیلتر"
          action={applyFilters}
          style="fill"
          type="primary"
        />
      </div>
    </div>
  );
}
