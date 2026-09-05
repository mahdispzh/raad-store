import { ProductCard } from "@/src/shared/components/product-card/product-card";
import { Title } from "@/src/shared/ui";
import { SwiperSlider } from "@/src/shared/ui/swiper-slider/swiper-slider.ui";
import { SwiperSlide } from "swiper/react";
import { SimilarProduct } from "../_types/product";

type SimilarProductsProps = {
  products: SimilarProduct[];
};

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-6 mb-8 w-full">
      <Title variant="underlined" text="کالاهای مشابه" size="3xl" />
      <div className="mt-4 w-full rounded-sm border border-gray p-2 md:mt-[2vw] md:p-[2vw]">
        <SwiperSlider
          sliderId="similar-products-slider"
          slidesPerView={1.4}
          spaceBetween={12}
          showNavigation={true}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            868: { slidesPerView: 3, spaceBetween: 20 },
            1300: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="pt-4">
              <ProductCard
                id={product.id}
                slug={product.slug}
                title={product.productName}
                imageSrc={product.imageSrc}
                rating={product.rate}
                price={product.price}
                isLiked={product.isLiked}
                onLikeToggle={() => console.log("is like")}
              />
            </SwiperSlide>
          ))}
        </SwiperSlider>
      </div>
    </section>
  );
}
