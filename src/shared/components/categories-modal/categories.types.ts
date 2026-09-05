// types/category.types.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  parent_id: number | null;
  productsCount: number;
  childrenCount: number;
  children: Category[];
  created_at?: string;
  updated_at?: string;
}

export interface CategoriesApiResponse {
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export interface CategoryDescriptionResult {
  text: string;
  source: 'self' | 'parent';
}