"use client";

import { Text } from "../text/text.ui";
import { TextColor } from "../text/text.types"; // مسیر دقیق رو بر اساس پروژه تنظیم کنید

type ProductStatus = "available" | "unavailable" | "low-stock";

const STATUS_CONFIG: Record<ProductStatus, { label: string; color: TextColor }> = {
  available: {
    label: "موجود",
    color: "success",   // ✅ این مقدار باید یکی از اعضای TextColor باشه
  },
  unavailable: {
    label: "ناموجود",
    color: "danger",
  },
  "low-stock": {
    label: "کم موجود",
    color: "secondary",
  },
};

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <span className="inline-flex items-center justify-center rounded-full px-3 py-1">
      <Text
        text={config.label}
        size="sm"
        weight="medium"
        color={config.color}   // ✅ الان type-safe هست
      />
    </span>
  );
}