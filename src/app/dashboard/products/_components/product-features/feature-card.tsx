"use client";

import { PencilIcon, TrashIcon } from "@/src/shared/constants/icons";
import { Caption, Text } from "@/src/shared/ui";
import { ProductFeature } from "../../_types/product.types";

type FeatureCardProps = {
  feature: ProductFeature;
  index: number;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
};

export function FeatureCard({
  feature,
  index,
  onEdit,
  onRemove,
}: FeatureCardProps) {
  return (
    <div className="group relative flex w-[160px] flex-col gap-2 rounded-xs border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <Caption text={feature.name} size="xs" />
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

      <div className="border-t border-gray-100 pt-2">
        <Text
          text={feature.value}
          size="md"
          weight="medium"
          color="secondary"
        />
      </div>
    </div>
  );
}
