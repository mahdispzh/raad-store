"use client";

import { Text } from "@/src/shared/ui";
import { ProductVariant } from "../../_types/product.types";
import { VariantCard } from "./variant-card";

type VariantListProps = {
  variants: ProductVariant[];
  colorMap: Record<number, string>;
  sizeMap: Record<number, string>;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
};

export function VariantList({
  variants,
  colorMap,
  sizeMap,
  onEdit,
  onRemove,
}: VariantListProps) {
  if (variants.length === 0) return null;

  return (
    <div>
      <Text text="واریانت‌های اضافه شده" size="md" weight="bold" />
      <div className="mt-2 flex flex-wrap gap-3">
        {variants.map((variant, index) => (
          <VariantCard
            key={index}
            variant={variant}
            index={index}
            colorMap={colorMap}
            sizeMap={sizeMap}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
