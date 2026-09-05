// ui/status-info-products.ui.tsx
"use client";

import { Caption, Text } from "@/src/shared/ui";
import { variantConfig } from "./status-info-products.constants";
import type { StatusInfoProductsProps } from "./status-info-products.types";

export function StatusInfoProducts({
  value,
  valueSize,
  label,
  variant,
}: StatusInfoProductsProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-2">
      <Icon size="lg" color={config.color} />

      <div className="flex flex-col gap-1">
        <Text
          text={String(value ?? config.defaultValue)}
          size={valueSize}
          weight="bold"
        />

        <Caption
          size="xs"
          weight="regular"
          text={label ?? config.defaultLabel}
        />
      </div>
    </div>
  );
}
