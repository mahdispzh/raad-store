// _types/faq-_types.ts
import type { IconProps } from "@/src/shared/types/IconTypes";

// ==================== Dynamic Icon ====================
export interface DynamicIconProps extends IconProps {
  type?: string;
}

// ==================== FAQ Accordion ====================
export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  data: FaqItem[];
}

// ==================== FAQ Grid ====================
export interface Category {
  id: string;
  title: string;
  icon: string;
}

export interface FaqGridProps {
  categories: Category[];
  active: string;
  onSelect: (id: string) => void;
}

// ==================== FAQ Page ====================
export interface CategoryWithItems extends Category {
  items: FaqItem[];
}

export interface FaqData {
  faq: {
    categories: CategoryWithItems[];
  };
}
