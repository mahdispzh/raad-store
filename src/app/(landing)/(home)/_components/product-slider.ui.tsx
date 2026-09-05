"use client";

import { SwiperSlider } from "@/src/shared/ui/swiper-slider/swiper-slider.ui";
import { SwiperSlide } from "swiper/react";
import {
  productSliderBreakpoints,
  SPACE_BETWEEN,
} from "../_constants/landing.constants";
import type {
  ProductCardProps,
  ProductSliderProps,
} from "../_types/landing.types";
import { ProductCard } from "./product-card.ui";

export function ProductSlider({
  products,
  sliderId,
  className = "",
}: ProductSliderProps) {
  return (
    <SwiperSlider
      sliderId={sliderId}
      spaceBetween={SPACE_BETWEEN}
      slidesPerView={6}
      breakpoints={productSliderBreakpoints}
      className={className} // ✅ اضافه کن
    >
      {products.map((product: ProductCardProps, index: number) => (
        <SwiperSlide
          key={product.id || index}
          className="pt-7 md:pt-9 lg:pt-10"
        >
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </SwiperSlider>
  );
}
