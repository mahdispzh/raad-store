"use client";
import { useLandingProductLogic } from "../_hooks/useLandingProductLogic";
import type { ProductItem } from "../_types";
import { PrimaryCard } from "./primary-card";
import { ProductDescription } from "./product-description";
import { ProductImages } from "./product-images";
import { ProductInfo } from "./product-info";
import { Reviews } from "./reviews-box";
import { SecondaryCard } from "./secondary-card";
import { SimilarProducts } from "./similar-products";

interface LandingProductProps {
  productSlug: string;
  initialProduct?: ProductItem | null | undefined;
  similarProducts?: unknown[];
}

export function LandingProduct({
  productSlug,
  initialProduct,
  similarProducts = [],
}: LandingProductProps) {
  const logic = useLandingProductLogic({
    slug: productSlug,
    initialProduct,
    similarProducts,
  });

  if (logic.isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  if (logic.isError)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        خطا
      </div>
    );
  if (!logic.product.id) return null;
  console.log("product discount:", logic.product.discount);
  return (
    <div className="flex flex-col overflow-x-clip">
      {/* بخش بالایی */}
      <div className="flex flex-col px-4 lg:flex-row lg:px-0 lg:pl-[6vw]">
        <div className="flex w-full flex-col gap-6 lg:flex-2 lg:gap-[4vw]">
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-1">
              <ProductImages
                images={logic.product.images}
                isLiked={logic.isLiked ?? false}
                slug={logic.product.slug}
                userId={logic.userId}
              />
            </div>
            <div className="flex-1">
              <ProductInfo
                averageRating={logic.averageRating}
                colors={logic.uniqueColors}
                features={
                  Array.isArray(logic.product.features)
                    ? logic.product.features
                    : []
                }
                reviewersCount={logic.rawComments.length}
                selectedColorId={logic.selectedColorId}
                selectedSizeId={logic.selectedSizeId}
                sizes={logic.uniqueSizes}
                title={logic.product.name}
                onSelectColor={logic.handleSelectColor}
                onSelectSize={logic.handleSelectSize}
                onViewReviews={logic.scrollToReviews}
                {...(logic.product.guid_image && {
                  guidImage: logic.product.guid_image,
                })}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:flex-1 lg:pt-[3vw]">
          <PrimaryCard
            image={logic.product.images[0] || ""}
            isInCart={logic.isInCart}
            isLoading={logic.cartLoading}
            isLoggedIn={logic.isLoggedIn}
            price={logic.currentPrice}
            discount={logic.product.discount}
            productId={logic.product.id}
            quantity={logic.quantityInCart}
            stock={logic.selectedVariant?.stock ?? 0}
            title={logic.product.name}
            onAddToCart={logic.handleAddToCart}
            onDecrease={logic.handleDecrease}
            onIncrease={logic.handleIncrease}
            onViewCart={logic.handleViewCart}
          />
        </div>
      </div>

      {/* توضیحات محصول */}
      <div className="flex flex-col px-[3vw] py-[1vw]">
        <ProductDescription description={logic.product.description} />
      </div>

      {/* نظرات و محصولات مشابه */}
      <div className="flex min-w-0 flex-col gap-[3vw] px-[3vw] py-[2vw] lg:flex-row">
        <div className="w-full min-w-0 lg:w-3/4">
          <div ref={logic.reviewsRef}>
            <Reviews
              isLoggedIn={logic.isLoggedIn}
              landingProduct={logic}
              productImage={logic.product.images[0] || ""}
              productTitle={logic.product.name}
              rating={logic.averageRating}
              rawComments={logic.rawComments}
              userId={logic.userId}
            />
          </div>
          {logic.similarProducts.length > 0 && (
            <SimilarProducts
              products={
                logic.similarProducts as Array<{
                  id: number;
                  slug: string;
                  productName: string;
                  imageSrc: string;
                  rate: number;
                  price: number;
                  discount?: number;
                  isLike?: boolean;
                }>
              }
            />
          )}
        </div>
        <div className="w-full min-w-0 lg:w-1/4">
          <div className="fixed right-0 bottom-0 left-0 z-40 border-t bg-white p-2 sm:p-3 lg:static lg:sticky lg:top-36 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:pb-8">
            <SecondaryCard
              colorName={logic.currentColorName}
              image={logic.product.images[0] || ""}
              isInCart={logic.isInCart}
              isLoading={logic.cartLoading}
              isLoggedIn={logic.isLoggedIn}
              price={logic.currentPrice}
              discount={logic.product.discount}
              productId={logic.product.id}
              quantity={logic.quantityInCart}
              size={logic.currentSizeName}
              stock={logic.selectedVariant?.stock ?? 0}
              title={logic.product.name}
              onAddToCart={logic.handleAddToCart}
              onDecrease={logic.handleDecrease}
              onIncrease={logic.handleIncrease}
              onViewCart={logic.handleViewCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
