"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons";
import { Caption, Text } from "@/src/shared/ui";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PriceFilterProps } from "../_types";
import { PriceInput } from "../_ui/price-input";

interface ExtendedPriceFilterProps extends PriceFilterProps {
  hideHeader?: boolean;
}

export function PriceFilter({
  show,
  setShow,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  hideHeader = false,
}: ExtendedPriceFilterProps) {
  const handleSliderChange = (val: number | number[]) => {
    const [min, max] = val as [number, number];
    onMinPriceChange(min);
    onMaxPriceChange(max);
  };

  const content = (
    <div className="flex flex-col gap-[2vw] p-[2vw]">
      <PriceInput
        label="از"
        value={String(minPrice)}
        onChange={(valStr) => {
          const num = Number(valStr);
          if (!isNaN(num)) {
            const clamped = Math.min(Math.max(num, 0), maxPrice);
            onMinPriceChange(clamped);
          }
        }}
        onBlur={() => {}}
      />
      <PriceInput
        label="تا"
        value={String(maxPrice)}
        onChange={(valStr) => {
          const num = Number(valStr);
          if (!isNaN(num)) {
            const clamped = Math.min(Math.max(num, minPrice), 50000000);
            onMaxPriceChange(clamped);
          }
        }}
        onBlur={() => {}}
      />
      <div dir="ltr" className="px-[4vw] pt-[1.5vw] lg:px-0">
        <div
          dir="ltr"
          className="px-[4vw] pt-[1.5vw] lg:px-0 [&_.rc-slider-handle]:!pointer-events-auto [&_.rc-slider-handle]:!touch-auto"
        >
          <Slider
            range
            min={0}
            max={50000000}
            value={[minPrice, maxPrice]}
            // onChange={handleSliderChange}
            onChange={(value) => {
              console.log(value);
              handleSliderChange(value);
            }}
            allowCross={false}
            styles={{
              track: { backgroundColor: "var(--color-primary)", height: 4 },
              rail: { backgroundColor: "var(--color-gray)", height: 4 },
              handle: {
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "2px solid var(--color-primary)",
                backgroundColor: "var(--color-primary)",
                marginTop: -7,
                touchAction: "none",
                pointerEvents: "auto",
              },
            }}
          />
        </div>
        <div className="flex justify-between pt-[0.5vw]">
          <Caption text="ارزان‌ترین" size="2xs" />
          <Caption text="گران‌ترین" size="2xs" />
        </div>
      </div>
    </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <>
      <div
        className="flex cursor-pointer justify-between px-[0.5vw]"
        onClick={() => setShow(!show)}
      >
        <Text text="محدوده قیمت" size="md" weight="medium" />
        <button className="transition-all duration-300">
          <div
            className={`cursor-pointer transition-transform duration-300 ${
              show ? "rotate-180" : "rotate-0"
            }`}
          >
            <DropdownArrowIcon size="xs" />
          </div>
        </button>
      </div>
      {show && content}
    </>
  );
}
