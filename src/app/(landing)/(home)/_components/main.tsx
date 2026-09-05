/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import texts from "@/src/shared/constants/texts/texts.json";
import type {
  Category,
  ProductCardProps,
  Slide,
} from "../_types/landing.types";
import { CategorySlider } from "./category-slider.ui";
import { CustomSlider } from "./custom-slider.ui";
import { ProductSection } from "./product-section.ui";

interface HomeMainProps {
  slides: Slide[];
  categories: Category[];
  latestProducts: ProductCardProps[];
  popularProducts: ProductCardProps[];
  bestSellingProducts: ProductCardProps[];
  saleProducts: ProductCardProps[];
}

export function HomeMain({
  slides,
  categories,
  latestProducts,
  popularProducts,
  bestSellingProducts,
  saleProducts,
}: HomeMainProps) {
  const t = (texts as any).landing?.home || {};

  return (
    <div className="w-full">
      <CustomSlider autoPlay interval={10000} slides={slides} />

      <div className="py-2 md:py-[1vw] lg:py-[2vw]" />

      {categories.length > 0 && <CategorySlider categories={categories} />}

      <div className="pt-2 md:pt-[1vw] lg:pt-[2vw]" />

      <ProductSection
        products={latestProducts.map((p) => ({ ...p, isNew: true }))}
        sliderId="latest"
        title={t.latest}
      />

      <ProductSection
        products={popularProducts}
        sliderId="popular"
        title={t.mostPopular}
      />

      <ProductSection
        products={bestSellingProducts}
        sliderId="best-selling"
        title={t.bestSelling}
      />

      <ProductSection
        products={saleProducts}
        sliderId="sale"
        title={t.specialSale}
        titleVariant="featured"
      />
    </div>
  );
}
