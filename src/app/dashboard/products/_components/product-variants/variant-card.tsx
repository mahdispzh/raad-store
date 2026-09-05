"use client";

import { PencilIcon, TrashIcon } from "@/src/shared/constants/icons";
import { Caption } from "@/src/shared/ui";
import { ProductVariant } from "../../_types/product.types";

type VariantCardProps = {
  variant: ProductVariant;
  index: number;
  colorMap: Record<number, string>;
  sizeMap: Record<number, string>;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
};

export function VariantCard({
  variant,
  index,
  colorMap,
  sizeMap,
  onEdit,
  onRemove,
}: VariantCardProps) {
  const colorName = colorMap[variant.color_id] || "نامشخص";
  const sizeName = sizeMap[variant.size_id] || "نامشخص";

  return (
    <div className="group relative flex w-[160px] flex-col gap-2 rounded-xs border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Caption text="سایز :" size="xs" />
          <Caption text={sizeName} size="xs" />
        </div>
        <div className="flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(index)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-blue-500 hover:bg-blue-50"
            title="ویرایش"
          >
            <PencilIcon size="sm" color="text-secondary" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
            title="حذف"
          >
            <TrashIcon size="sm" color="text-secondary" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Caption text="رنگ :" size="xs" />
        <Caption text={colorName} size="xs" />
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-2">
        <span className="text-xs font-semibold text-gray-900">
          {variant.price?.toLocaleString()}
          <span className="mr-1 font-normal text-gray-400">تومان</span>
        </span>
        <span className="text-[11px] text-gray-500">
          موجودی: {variant.stock}
        </span>
      </div>
    </div>
  );
}
