export interface SearchInputProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface SearchChipProps {
  label: string;

  variant?: "recent" | "popular" | "clear-all";

  onClick?: () => void;

  onRemove?: () => void;

  iconPosition?: "left" | "right";
}

export interface ProductsResponse {
  data: ProductItem[];
  meta: PaginationMeta;
}

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  category_id: number;
  brand_id: number;
  status: number;
  created_at: string | null;
  updated_at: string | null;
  images: string[];
  slug: string;
  brand: ProductBrand;
  category: ProductCategory;
  variants: ProductVariant[];
}

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  color_id: number;
  size_id: number;
  sku: string;
  price: number;
  stock: number;
  color: ProductColor;
  size: ProductSize;
}

export interface ProductColor {
  id: number;
  name: string;
  hex_code: string;
}

export interface ProductSize {
  id: number;
  name: string;
  sort_order: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UserWithRecentSearch {
  id: number;
  name: string | null;
  phone: string | null;
  mail: string | null;
  recently_search: string[] | null;
}

export interface SettingsResponse {
  data: Array<{
    id: number;
    popular_search: string[];
    [key: string]: any;
  }>;
}
