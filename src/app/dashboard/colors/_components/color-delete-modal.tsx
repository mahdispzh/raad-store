"use client";

import { CloseModalIcon } from "@/src/shared/constants/icons";
import { DefaultButton, Text } from "@/src/shared/ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDeleteColor } from "../_hooks/useColors";

type Props = {
  colorIds: number[];
  onClose: () => void;
  onSuccess?: () => void;
};

export function ColorDeleteModal({ colorIds, onClose, onSuccess }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const deleteMutation = useDeleteColor();
  const isBulk = colorIds.length > 1;

  const handleDelete = async () => {
    try {
      const results = await Promise.allSettled(
        colorIds.map((id) => deleteMutation.mutateAsync(id)),
      );
      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length > 0) {
        console.error(`${failed.length} مورد حذف نشد`, failed);
      }
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
            text={isBulk ? "حذف رنگ‌ها" : "حذف رنگ"}
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
                ? // ? `آیا مطمئن هستید که می‌خواهید ${colorIds.length} رنگ را حذف کنید؟`
                  `آیا مطمئن هستید که می‌خواهید این رنگ ها را حذف کنید؟`
                : "آیا مطمئن هستید که می‌خواهید این رنگ را حذف کنید؟"
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
