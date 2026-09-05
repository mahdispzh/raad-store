// src/app/profile/card/_components/cart-section.tsx

"use client";

import { CartItemCard } from "@/src/shared/components/cart-item-card/cart-item-card.ui";
import { ProductCard } from "@/src/shared/components/product-card/product-card";
import { Caption, Text, Title } from "@/src/shared/ui";
// import { SUGGESTED_PRODUCTS } from "../_constants/cart.constants";
import { CartSectionProps } from "../_types/cart.types";
import { CartSummary } from "./cart-summary";

export function CartSection({
  parcelCount,
  totalPrice,
  totalItemsCount,
  totalCartPrice,
  userProfit,
  products,
  onConfirmOrder,
  onProductIncrease,
  onProductDecrease,
  onProductRemove,
  onClearCart,
}: CartSectionProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-5 px-5 py-11 lg:flex-row lg:items-start lg:gap-7 lg:px-9">
        <div className="flex-3 rounded-sm border border-gray p-4 lg:p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-[0.7vw]">
              <Text text="سبد خرید شما" size="lg" weight="bold" />
              <div className="h-2 w-2 rounded-full bg-gray" />
              <Caption
                size="xs"
                weight="regular"
text={`${products.length > 0 ? 1 : 0} مرسوله`}              />
            </div>
            {products.length > 0 && onClearCart && (
              <button
                onClick={onClearCart}
                className="cursor-pointer"
                type="button"
              >
                <Text
                  text="خالی کردن سبد خرید"
                  size="sm"
                  weight="regular"
                  color="danger"
                />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-5 py-5 lg:py-5">
            <div className="grid grid-cols-1 gap-5 py-5 lg:py-5">
              {products.length === 0 ? (
                <div className="flex h-51 flex-col items-center justify-center">
                  <Text
                    text="سبد خرید شما خالی است !"
                    size="lg"
                    weight="bold"
                    color="secondary"
                  />
                  <Text
                    text="هنوز محصولی به سبد خرید اضافه نکرده‌اید.برای ادامه خرید، محصولات مورد نظر خود را انتخاب کنید."
                    size="sm"
                    weight="regular"
                    color="secondary"
                  />
                </div>
              ) : (
                products.map((product) => (
                  <CartItemCard
                    key={product.id}
                    id={product.id}
                    title={product.productName}
                    imageSrc={product.imageSrc}
                    color={product.colorName || "نامشخص"}
                    colorHex={product.colorHex || "#CCCCCC"}
                    size={product.sizeName || "نامشخص"}
                    shippingMethod={product.shippingMethod || "پست پیشتاز"}
                    price={product.price}
                    discount={product.discount || undefined}
                    quantity={product.quantity}
                    onIncrease={() => onProductIncrease(product.id)}
                    onDecrease={() => onProductDecrease(product.id)}
                    onRemove={() => onProductRemove(product.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <CartSummary
          totalPrice={totalPrice}
          totalItemsCount={totalItemsCount}
          totalCartPrice={totalCartPrice}
          userProfit={userProfit}
          onConfirmOrder={onConfirmOrder}
        />
      </div>

      {/* <div className="px-[2vw] py-[3vw]">
        <div className="flex flex-col gap-[2vw] rounded-xs border border-gray px-[2vw] py-[1vw]">
          <div>
            <Title text="کالاهای پیشنهادی" variant="underlined" />
          </div>
          <div className="grid grid-cols-1 place-items-center gap-4 pb-[1.5vw] min-[500px]:grid-cols-2 min-[700px]:grid-cols-3 min-[850px]:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
            {SUGGESTED_PRODUCTS.map((product) => (
              <ProductCard
                id={product.id}
                slug={String(product.id)}
                title={product.title}
                imageSrc={product.imageSrc}
                price={product.price}
                discount={product.discountPercent}
                rating={product.rating}
                onViewProduct={() => console.log("مشاهده محصول:", product.id)}
                onLikeToggle={() => console.log("لایک:", product.id)}
              />
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
}