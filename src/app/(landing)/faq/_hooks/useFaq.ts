// _hooks/useFaq.ts
import { SupportIcon } from "@/src/shared/constants/icons/support-icon";
import { useState } from "react";
import { DefaultIcon, faqIconMap } from "../_constants/faq-constants";
import type { CategoryWithItems } from "../_types/faq-types";

// ==================== useDynamicIcon ====================
// Hook to manage dynamic icon
export function useDynamicIcon(type: string = "default") {
  const IconComponent = faqIconMap[type] ?? SupportIcon;
  return { IconComponent };
}

// ==================== useFaqAccordion ====================
// Hook to manage accordion open/close state
export function useFaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const isItemOpen = (id: number) => {
    return openId === id;
  };

  return { openId, toggleItem, isItemOpen };
}

// ==================== useFaqGrid ====================
// Hook to manage icon rendering logic (logic only, no JSX)
export function useFaqGrid() {
  const getIconColor = (isActive: boolean) => {
    return isActive ? "text-secondary" : "text-accent";
  };

  const getIconComponent = (icon: string) => {
    return faqIconMap[icon] || DefaultIcon;
  };

  return { getIconColor, getIconComponent };
}

// ==================== useFaq ====================
// Hook to manage active FAQ category state
export function useFaq(categories: CategoryWithItems[]) {
  const [activeCategory, setActiveCategory] = useState(
    categories?.[0]?.id || "",
  );

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return {
    activeCategory,
    activeCategoryData,
    setActiveCategory,
  };
}
