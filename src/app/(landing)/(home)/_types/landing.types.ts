// src/app/(landing)/_types/landing.types.ts

// ===== Product Types =====
export interface ProductCardProps {
  id: string | number;
  slug?: string;
  image?: string;
  title?: string;
  price?: number;
  stock?: number;
  discount?: number;
  isNew?: boolean;
  rating?: number;
  href?: string;
}

// ===== Category Types =====
export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  parent_id?: number | null; // ✅ optional کن
}

// ===== Slide Types =====
export interface Slide {
  id: number;
  image: string;
  alt?: string;
}

// ===== API Response Types =====
export interface CategoriesApiResponse {
  data: Category[];
  meta: PaginationMeta;
}

export interface BannersApiResponse {
  data: Banner[];
}

export interface ProductsResponse {
  data: ProductItem[];
  meta: PaginationMeta;
}

// ===== API Inner Types =====
export interface Banner {
  id: number;
  image: string;
  sort_order: number;
  alt: string | null;
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  images: string[];
  discount: number;
  isNew: boolean;
  product_variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  price: number;
  stock: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ===== Component Props =====
export interface ProductSliderProps {
  products: ProductCardProps[];
  sliderId: string;
  className?: string; // ✅ اضافه کن
}

export interface CategorySliderProps {
  categories: Category[];
  className?: string; // ✅ اضافه کن
}

export interface CustomSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

export interface ProductSectionProps {
  title?: string;
  products: ProductCardProps[];
  sliderId: string;
  titleVariant?: "default" | "underlined" | "featured";
  className?: string; // ✅ اضافه کن
  titleClassName?: string; // ✅ اضافه کن
  sliderClassName?: string; // ✅ اضافه کن
  sectionPadding?: string; // ✅ اضافه کن
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
}
export interface GetPublicProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "likes" | "views" | "sold" | "newest" | "discount";
  categoryId?: number;
}
