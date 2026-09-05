// src/app/profile/cart/_hooks/useCart.ts

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CHECKOUT_STEP, INITIAL_CART_VALUES } from "../_constants/cart.constants";
import { UseCartReturn, Product, CartItem } from "../_types/cart.types";
import { getCart, updateCartItem, deleteCartItem, clearCart } from "../_services/card.api";

// تبدیل آیتم‌های سبد خرید به فرمت Product
const mapCartItemsToProducts = (cartItems: CartItem[]): Product[] => {
  return cartItems.map((item) => {
    const variant = item.product_variants;
    const product = variant?.products;
    const color = variant?.colors;
    const size = variant?.sizes;
    
    const unitPrice = variant?.price || 0;
    const discountPercent = product?.discount ?? 0;
    const finalUnitPrice = discountPercent > 0 
      ? Math.floor(unitPrice * (1 - discountPercent / 100))
      : unitPrice;
    
    let imageSrc = "/images/placeholder.svg";
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage) {
        imageSrc = firstImage.startsWith('/') ? firstImage : `/${firstImage}`;
      }
    }
    
    return {
      id: item.id,
      variantId: item.variant_id,
      productId: product?.id || 0,
      imageSrc: imageSrc,
      productName: product?.name || "محصول",
      rate: 4,
      discount: product?.discount ?? null,
      price: unitPrice,
      quantity: item.quantity,
      finalPrice: finalUnitPrice * item.quantity,
      colorName: color?.name || "نامشخص",
      colorHex: color?.hex_code || "#CCCCCC",
      sizeName: size?.name || "نامشخص",
      stock: variant?.stock || 0,
      shippingMethod: variant?.shipping_method || "پست پیشتاز",
    };
  });
};

// محاسبه مجموع قیمت‌ها
const calculateTotals = (products: Product[]) => {
  const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalItemsCount = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalCartPrice = products.reduce((sum, p) => sum + p.finalPrice, 0);
  return { totalPrice, totalItemsCount, totalCartPrice };
};

export function useCart(): UseCartReturn {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"cart" | "next">("cart");

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 60 * 1000,
  });

  const cartItems = cart?.cart_items || [];
  
  const sortedCartItems = useMemo(() => {
    return [...cartItems].sort((a, b) => a.id - b.id);
  }, [cartItems]);

  const products = useMemo(() => {
    const mapped = mapCartItemsToProducts(sortedCartItems);
    return mapped.sort((a, b) => a.id - b.id);
  }, [sortedCartItems]);

  const { totalPrice, totalItemsCount, totalCartPrice } = useMemo(
    () => calculateTotals(products),
    [products]
  );

  // هر آیتم بدون product id شناخته‌شده، یک مرسوله جدا حساب می‌شود (نه اینکه با fallback ثابت در هم ادغام شوند)
  const parcelCount = new Set(
    cartItems.map((item) =>
      item.product_variants?.products?.id ?? `unknown-${item.id}`
    )
  ).size;

  // userProfit همیشه باید مساوی تفاوت بین قیمت اصلی و قیمت نهایی باشد؛
  // محاسبه‌ی جدا از فرمول تخفیف باعث می‌شد دو منبع حقیقت برای یک عدد وجود داشته باشد
  const userProfit = totalPrice - totalCartPrice;

  const currentStep = (CHECKOUT_STEP || 1) as 1 | 2 | 3 | 4 | 5;
  const nextBuyParcelCount = INITIAL_CART_VALUES?.nextBuyParcelCount || 0;
  const nextBuyItemCount = INITIAL_CART_VALUES?.nextBuyItemCount || 0;

  // Mutations
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (itemId: number) => deleteCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // ✅ Mutation برای خالی کردن سبد خرید
  const clearCartMutation = useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log("✅ سبد خرید با موفقیت خالی شد");
    },
    onError: (error) => {
      console.error("❌ خطا در خالی کردن سبد خرید:", error);
    },
  });

  // ✅ تابع خالی کردن سبد خرید
  const clearCartItems = async () => {
    try {
      await clearCartMutation.mutateAsync();
      sessionStorage.removeItem("checkoutCartData");
    } catch (error) {
      console.error("❌ خطا در خالی کردن سبد خرید:", error);
      throw error;
    }
  };

  const handleProductIncrease = (cartItemId: number) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    if (item && item.quantity < item.product_variants.stock) {
      updateQuantityMutation.mutate({ 
        itemId: cartItemId, 
        quantity: item.quantity + 1 
      });
    }
  };

  const handleProductDecrease = (cartItemId: number) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    if (item && item.quantity > 1) {
      updateQuantityMutation.mutate({ 
        itemId: cartItemId, 
        quantity: item.quantity - 1 
      });
    } else if (item && item.quantity === 1) {
      handleProductRemove(cartItemId);
    }
  };

  const handleProductRemove = (cartItemId: number) => {
    removeMutation.mutate(cartItemId);
  };

  const handleTransferAll = () => {
    // TODO: فیچر "خرید بعدی" هنوز پیاده‌سازی نشده — نیاز به endpoint واقعی برای انتقال آیتم‌ها دارد
  };

  // ✅ تایید سفارش: فقط cartId به صفحه پرداخت پاس داده می‌شود
  // چون آن صفحه با react-query دیتای سبد را دوباره از سرور می‌گیرد،
  // نیازی به serialize کردن کل products/totals در sessionStorage نیست
  // (که با رفرش یا بسته‌شدن تب از بین می‌رفت و می‌توانست با دیتای واقعی سرور ناهماهنگ شود)
  const handleConfirmOrder = () => {
    if (!cart?.id) return;
    router.push(`/profile/payment?order-summary&cartId=${cart.id}`);
  };

  // ✅ ایجاد شیء بازگشتی با مدیریت دقیق cartId
  const returnValue: UseCartReturn = {
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
    clearCartItems, // ✅ اضافه کردن clearCartItems
    currentStep,
    isLoading,
    error: error as Error | null,
  };

  if (cart?.id !== undefined) {
    returnValue.cartId = cart.id;
  }

  return returnValue;
}