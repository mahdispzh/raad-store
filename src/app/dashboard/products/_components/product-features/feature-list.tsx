"use client";

import { Text } from "@/src/shared/ui";
import { ProductFeature } from "../../_types/product.types";
import { FeatureCard } from "./feature-card";

type FeatureListProps = {
  features: ProductFeature[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
};

export function FeatureList({ features, onEdit, onRemove }: FeatureListProps) {
  if (features.length === 0) return null;

  return (
    <div>
      <Text text="ویژگی‌های اضافه شده" size="md" weight="bold" />
      <div className="mt-2 flex flex-wrap gap-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            index={index}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
