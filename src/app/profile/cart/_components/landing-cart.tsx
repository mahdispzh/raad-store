// src/app/profile/card/_components/landing-cart.tsx

"use client";

import { CheckoutStepper } from "@/src/shared/components/checkout-stepper";
import EmptyCart from "@/src/shared/components/empty-states/empty-cart.ui";
import { Text } from "@/src/shared/ui";
import { useCart } from "../_hooks/useCart";
import { CartSection } from "./cart-section";
import { NextBuySection } from "./next-buy-section";

export function LandingCart() {
  const {
    activeTab,
    setActiveTab,
    products,
    parcelCount,
    totalPrice,
    totalItemsCount,
    totalCartPrice,
    userProfit,
    nextBuyParcelCount,
    nextBuyItemCount,
    handleTransferAll,
    handleConfirmOrder,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    currentStep,
    isLoading,
    error,
    clearCartItems,
  } = useCart();

  // تعداد کل کالاها در سبد خرید
  const cartItemsCount = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );
  // ⏳ در حال بارگذاری سبد خرید — تا وقتی دیتا نیامده، سبد خالی نمایش داده نشود
  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <Text text="در حال بارگذاری سبد خرید..." size="md" weight="regular" color="secondary" />
      </div>
    );
  }

  // ❌ خطا در دریافت سبد خرید
  if (error) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 py-20">
        <Text
          text="مشکلی در دریافت سبد خرید پیش آمد."
          size="md"
          weight="bold"
          color="danger"
        />
        <Text
          text="لطفاً صفحه را رفرش کنید یا کمی بعد دوباره تلاش کنید."
          size="sm"
          weight="regular"
          color="secondary"
        />
      </div>
    );
  }

  return (
    <>
      {/* STEPPER - فقط در تب سبد خرید نمایش داده شود و به محض تغییر تب، کاملاً حذف گردد */}
      {activeTab === "cart" ? (
        <div className="flex h-[25vw] w-full flex-col py-[3vw] md:h-[20vw] lg:h-[12vw]">
          <CheckoutStepper currentStep={currentStep} />
        </div>
      ) : (
        <div className="flex h-[25vw] w-full flex-col py-[3vw] md:h-[20vw] lg:h-[12vw]"></div>
      )}

      {/* NAVBAR TAB */}
      <div className="relative w-full px-[2vw]">
        <div className="flex items-center gap-4 lg:gap-6">
          <button
            onClick={() => setActiveTab("cart")}
            className="relative flex cursor-pointer items-center gap-[0.3vw] pb-[1vw] transition-all"
          >
            <Text
              text="سبد خرید"
              size="lg"
              weight="medium"
              color={activeTab === "cart" ? "danger" : "primary"}
            />
            <div
              className={`flex h-5.5 w-5.5 items-center justify-center rounded-[2px] text-white transition-all ${
                activeTab === "cart" ? "bg-danger" : "bg-gray"
              }`}
            >
              <Text text={String(cartItemsCount)} color="white" size="md" />
            </div>
            {activeTab === "cart" && (
              <div className="absolute right-[-0.5vw] bottom-0 z-10 h-[2px] w-[calc(100%+1vw)] bg-danger" />
            )}
          </button>

          {/* <button
            onClick={() => setActiveTab("next")}
            className="relative flex cursor-pointer items-center gap-[0.3vw] pb-[1vw] transition-all"
          >
            <Text
              text="خرید بعدی"
              size="lg"
              weight="medium"
              color={activeTab === "next" ? "danger" : "primary"}
            />
            <div
              className={`flex h-5.5 w-5.5 items-center justify-center rounded-[2px] text-white transition-all ${
                activeTab === "next" ? "bg-danger" : "bg-gray"
              }`}
            >
              <Text text={String(nextBuyItemCount)} color="white" size="md" />
            </div>
            {activeTab === "next" && (
              <div className="absolute right-[-0.5vw] bottom-0 z-10 h-[2px] w-[calc(100%+1vw)] bg-danger" />
            )}
          </button> */}
        </div>
        <div className="absolute right-[2vw] bottom-0 h-[1px] w-[calc(100%-4vw)] bg-gray" />
      </div>

      {/* CONTENT */}
      {activeTab === "cart" ? (
        products.length === 0 ? (
          <EmptyCart />
        ) : (
          <CartSection
            parcelCount={parcelCount}
            totalPrice={totalPrice}
            totalItemsCount={totalItemsCount}
            totalCartPrice={totalCartPrice}
            userProfit={userProfit}
            products={products}
            onConfirmOrder={handleConfirmOrder}
            onProductIncrease={handleProductIncrease}
            onProductDecrease={handleProductDecrease}
            onProductRemove={handleProductRemove}
            onClearCart={clearCartItems}
          />
        )
      ) : (
        <NextBuySection
          parcelCount={nextBuyParcelCount}
          itemCount={nextBuyItemCount}
          onTransferAll={handleTransferAll}
        />
      )}
    </>
  );
}