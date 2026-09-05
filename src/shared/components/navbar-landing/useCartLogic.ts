// useCartLogic.ts
"use client";

import { useState } from "react";
import { deleteCartItem, updateCartItem } from "../cart-modal/cart.api";
import { mapCartApiToModalItems } from "../cart-modal/cart.utils";
import { useCart } from "../cart-modal/useCart";
import { CartModalProductItem } from "./navbar-landing.types";

/**
 * مدیریت state و رفتارهای سبد خرید (باز/بسته شدن، افزایش/کاهش تعداد، حذف، پرداخت)
 */
export function useCartLogic(isLoggedIn: boolean) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error, refetchCart } = useCart(true);

  const items: CartModalProductItem[] = data?.cart_items
    ? mapCartApiToModalItems(data.cart_items)
    : [];

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleBagIconClick = () => {
    if (!isLoggedIn) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید");
      return;
    }
    open();
  };

  const handleIncrease = async (id: string | number) => {
    try {
      const currentItem = data?.cart_items.find((item) => item.id === id);
      if (!currentItem) return;
      await updateCartItem(Number(id), currentItem.quantity + 1);
      await refetchCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  const handleDecrease = async (id: string | number) => {
    try {
      const currentItem = data?.cart_items.find((item) => item.id === id);
      if (!currentItem) return;
      const newQuantity = currentItem.quantity - 1;
      if (newQuantity < 1) {
        await deleteCartItem(Number(id));
      } else {
        await updateCartItem(Number(id), newQuantity);
      }
      await refetchCart();
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  const handleRemove = async (id: string | number) => {
    try {
      await deleteCartItem(Number(id));
      await refetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleCheckout = () => {
    close();
    window.location.href = "/profile/payment?order-summary";
  };

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    isOpen,
    items,
    isLoading,
    error: error || null,
    itemsCount,
    open,
    close,
    handleBagIconClick,
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleCheckout,
  };
}
