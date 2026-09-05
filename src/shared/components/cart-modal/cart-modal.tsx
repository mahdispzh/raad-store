"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseModalIcon } from "../../constants/icons/close-modal-icon";
import { DefaultButton, Text } from "../../ui";
import { CartModalProduct } from "../cart-modal-product/cart-modal-product";
import { CartModalProps } from "./cart-modal.types";

// ==================== کامپوننت اصلی ====================
export function CartModal({
  isOpen,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}: CartModalProps) {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  // ✅ قفل اسکرول هنگام باز شدن مودال
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // اگر مودال باز نباشد، چیزی نمایش نده
  if (!isOpen) return null;

  const handleViewCart = () => {
    onClose();
    router.push("/profile/cart");
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      onClose();
      router.push("profile/payment?order-summary");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-end bg-black/10 transition-opacity duration-700 ${animate ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className="mt-0 ml-8 flex h-auto max-h-[90vh] w-[340px] flex-col rounded-md border-2 border-gray-200 bg-white sm:mt-7 md:w-[380px] lg:w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="flex flex-row justify-between px-4 py-5">
          <Text text="سبد خرید" size="lg" weight="bold" />
          <button onClick={onClose} className="cursor-pointer">
            <CloseModalIcon size="xs" />
          </button>
        </div>

        {/* لیست محصولات */}
        <div className="flex h-[600px] flex-col gap-10 overflow-y-auto border-t border-gray px-7 py-10">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <Text text="سبد خرید شما خالی است" size="md" color="gray" />
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id}>
                <CartModalProduct
                  id={item.id}
                  title={item.title}
                  imageSrc={item.imageSrc}
                  color={item.color}
                  colorHex={item.colorHex}
                  size={item.size}
                  price={item.price}
                  {...(item.discount !== undefined && {
                    discount: item.discount,
                  })}
                  quantity={item.quantity}
                  onIncrease={() => onIncrease(item.id)}
                  onDecrease={() => onDecrease(item.id)}
                  onRemove={() => onRemove(item.id)}
                />
                {index < items.length - 1 && (
                  <div className="mt-10 h-px w-full bg-gray" />
                )}
              </div>
            ))
          )}
        </div>

        {/* فوتر */}
        <div className="flex flex-col gap-3 border-t border-gray px-7 py-6">
          <DefaultButton
            type="primary"
            style="outline"
            label="مشاهده سبد خرید"
            action={handleViewCart}
          />
          <DefaultButton
            type="primary"
            style="fill"
            label="پرداخت"
            action={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
