
"use client";

import { CloseModalIcon } from "@/src/shared/constants/icons";
import { DefaultButton, Text } from "@/src/shared/ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDeleteProduct } from "../_hooks/useDeleteProduct";

type Props = {
  productSlugs: string[]; // ⬅️ تغییر کرد: آرایه به‌جای یه رشته
  onClose: () => void;
  onSuccess?: () => void; // ⬅️ جدید — برای پاک کردن selectedIds بعد از موفقیت
};

export function ProductDeleteModal({
  productSlugs,
  onClose,
  onSuccess,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const deleteMutation = useDeleteProduct();
  const isBulk = productSlugs.length > 1;

  const handleDelete = async () => {
    try {
      await Promise.all(
        productSlugs.map((slug) => deleteMutation.mutateAsync(slug)),
      );
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10"
      onClick={onClose}
    >
      <div
        className="w-[400px] rounded-xs bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-primary px-4 py-2">
          <Text
            text={isBulk ? "حذف محصولات" : "حذف محصول"}
            size="lg"
            weight="bold"
          />
          <button onClick={onClose} className="cursor-pointer">
            <CloseModalIcon size="xs" />
          </button>
        </div>
        <div className="px-5 py-6">
          <Text
            text={
              isBulk
                ? `آیا مطمئن هستید که می‌خواهید ${productSlugs.length} محصول را حذف کنید؟`
                : "آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟"
            }
            size="md"
            color="primary"
            weight="regular"
          />
          <div className="mt-6 flex gap-3">
            <DefaultButton
              label="لغو"
              action={onClose}
              type="primary"
              style="outline"
            />

            <DefaultButton
              disabled={deleteMutation.isPending}
              label={deleteMutation.isPending ? "در حال حذف..." : "حذف"}
              action={handleDelete}
              type="primary"
              style="fill"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
