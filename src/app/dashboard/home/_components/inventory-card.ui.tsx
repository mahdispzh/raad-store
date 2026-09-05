// inventory-card.ui.tsx
"use client";

import { Subtitle, Text } from "@/src/shared/ui";
import texts from "../../../../shared/constants/texts/texts.json";
import { InventoryCardProps } from "../_types/dashboard-home.types";

// Inventory card component
export default function InventoryCard({
  title = texts.dashboard.inventory.title,
  items,
  className = "",
}: InventoryCardProps) {
  return (
    // Card container
    <div
      className={`bg-surface flex h-[7.5vw] w-full flex-col overflow-hidden rounded-sm bg-pure-white shadow-xl ${className}`}
    >
      {/* Header */}
      <div
        dir="ltr"
        className="flex items-center justify-end border-b border-gray px-5 py-3"
      >
        <Text text={title} color="secondary" size="lg" weight="bold" />
      </div>

      {/* Items list */}
      <div className="flex flex-1 flex-row justify-around px-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            {/* Value */}
            <Subtitle text={item.value} size="3xl" weight="bold" />
            {/* Label */}
            <Text text={item.label} color="primary" size="sm" weight="medium" />
            {/* Description */}
            {item.description && (
              <Text
                text={item.description}
                color="primary"
                size="sm"
                weight="medium"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
