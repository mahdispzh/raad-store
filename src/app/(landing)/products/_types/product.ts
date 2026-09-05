export type Color = {
  name: string;
  value: string;
};

export type Feature = {
  title: string;
  value: string;
};

export type Comment = {
  user: string;
  date: string;
  text: string;
  rate: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  rate: number;
  ratingsCount: number;
  reviewsCount: number;
  colors: Color[];
  sizes: string[];
  features: Feature[];
  description: string;
  galleryImages: readonly string[];
  comments?: Comment[];
  suggestedProducts?: SuggestedProduct[];
  similarProducts?: SimilarProduct[];
};

export type SuggestedProduct = {
  id: number;
  imageSrc: string;
  productName: string;
  rate: number;
  price: number;
  discount?: number;
};

export type SimilarProduct = {
  id: number;
  slug: string;
  imageSrc: string;
  productName: string;
  rate: number;
  price: number;
  discount?: number;
};

export interface ProductCardProps {
  id?: number | string;
  image: string;
  title: string;
  price: number;
  stock?: number;
  discount?: number;
  isNew?: boolean;
  rating?: number;
  href?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  image?: string;
}

export interface Slide {
  id: number;
  title?: string;
  description?: string;
  image: string;
  link?: string;
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

// بقیه تایپ‌ها...
export interface ProductSliderProps {
  products: ProductCardProps[];
  sliderId: string;
  className?: string;
}

export interface CategorySliderProps {
  categories: Category[];
  className?: string;
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
  className?: string;
  titleClassName?: string;
  sliderClassName?: string;
  sectionPadding?: string;
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
