"use client";

import { Subtitle } from "@/src/shared/ui";
import { SwiperSlider } from "@/src/shared/ui/swiper-slider/swiper-slider.ui";
import { SwiperSlide } from "swiper/react";
import {
  SECTION_TITLE,
  categorySliderBreakpoints,
} from "../_constants/landing.constants";
import type { CategorySliderProps } from "../_types/landing.types";
import { CategoryCard } from "./categories-card.ui";

export function CategorySlider({ categories }: CategorySliderProps) {
  if (!categories || categories.length === 0) return null;
  console.log("categories", categories);
  return (
    <div className="w-full">
      <div className="pt-10 pb-10 text-center">
        <Subtitle
          text={SECTION_TITLE}
          size="2xl"
          weight="bold"
          color="primary"
        />
      </div>

      <SwiperSlider
        sliderId="category"
        className="px-20"
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={categorySliderBreakpoints}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <CategoryCard
              name={cat.name}
              image={cat.image}
              href={`/products?categoryId=${cat.id}&category=${cat.slug}`}
            />
          </SwiperSlide>
        ))}
      </SwiperSlider>

      <div className="mt-15 flex justify-center">
        <div className="h-[0.05vw] w-[76vw] bg-gray"></div>
      </div>
    </div>
  );
}
