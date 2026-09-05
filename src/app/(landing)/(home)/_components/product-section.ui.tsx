"use client";

import { Title } from "@/src/shared/ui";
import {
  DEFAULT_SECTION_PADDING,
  DEFAULT_TITLE_VARIANT,
} from "../_constants/landing.constants";
import type { ProductSectionProps } from "../_types/landing.types";
import { ProductSlider } from "./product-slider.ui";

export function ProductSection({
  title,
  products,
  sliderId,
  titleVariant = DEFAULT_TITLE_VARIANT,
  className = "",
  titleClassName = "",
  sliderClassName = "",
  sectionPadding = DEFAULT_SECTION_PADDING,
}: ProductSectionProps) {
  return (
    <section className={`w-full py-8 ${className}`}>
      {title && (
        <div
          className={`flex justify-start ${sectionPadding} ${titleClassName}`}
        >
          <Title text={title} variant={titleVariant} />
        </div>
      )}
      <ProductSlider
        products={products}
        sliderId={sliderId}
        className={sliderClassName}
      />
    </section>
  );
}
