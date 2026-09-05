// ui/faq-grid.ui.tsx
"use client";

import { Text } from "@/src/shared/ui";
import { useFaqGrid } from "../_hooks/useFaq";
import type { FaqGridProps } from "../_types/faq-types";

// FAQ Grid Component
export function FaqGrid({ categories, active, onSelect }: FaqGridProps) {
  // Get icon logic from hook
  const { getIconColor, getIconComponent } = useFaqGrid();

  // Helper to render icon
  const renderIcon = (icon: string, isActive: boolean) => {
    const iconColor = getIconColor(isActive);
    const IconComponent = getIconComponent(icon);
    return <IconComponent size="xl" color={iconColor} />;
  };

  return (
    // Grid container
    <div className="grid grid-cols-2 border border-primary/20 sm:grid-cols-3 lg:grid-cols-6">
      {/* Map categories */}
      {categories.map((cat) => {
        const isActive = active === cat.id;

        return (
          // Category button
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex cursor-pointer flex-col items-center justify-center gap-4 border border-primary/20 p-5 transition-all duration-300 sm:p-7 lg:p-10"
          >
            {/* Icon */}
            {renderIcon(cat.icon, isActive)}
            {/* Title */}
            <Text text={cat.title} color="primary" size="lg" weight="medium" />
          </button>
        );
      })}
    </div>
  );
}
