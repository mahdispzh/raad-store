"use client";

import { TextRedLine } from "@/src/shared/ui";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { ProductCard } from "@/src/shared/components/product-card/product-card";
import { useFrequentProducts } from "../_hooks/useFrequentProducts";
import { mapFrequentProductToCard } from "../_utils/frequent-product-mapper";

export function HomeBody() {
  const { products, loading } = useFrequentProducts();

  if (loading || products.length === 0) {
    return null;
  }

  const cardProducts = products.map(mapFrequentProductToCard);

  return (
    <div
      className={"menu-item-padding menu-item-border gap-layout flex flex-col"}
    >
      <TextRedLine
        text={"خریدهای پر تکرار شما"}
        size={"md"}
        weight={"bold"}
        isUnderline
      />

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={4}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          852: { slidesPerView: 4 },
          1100: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        {cardProducts.map((product, index) => (
          <SwiperSlide key={index}>
            {/*TODO LINK PRODUCTSCARD TO PRODUCSPAGE */}
            <Link href={"/"} className="flex items-center justify-center py-2">
              <ProductCard {...product} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}