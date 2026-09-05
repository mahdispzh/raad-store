// ============================
// تایپ‌های مربوط به Product (داخلی)
// ============================
export type Color = { name: string; value: string };
export type Feature = { title: string; value: string };
export type Comment = {
  user: string;
  date: string;
  text: string;
  rate: number;
};

// ============================
// تایپ‌های API
// ============================
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
  isLiked?: boolean;
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

// ============================
// تایپ‌های مربوط به صفحه لیست محصولات (فیلتر، سورت، اینفینیت اسکرول)
// ============================
export type SortType =
  | "محبوب‌ترین"
  | "پرفروش‌ترین"
  | "جدیدترین"
  | "ارزان‌ترین"
  | "گران‌ترین";
export type FilterType = "price" | "material" | "color" | null;

export interface SortBarProps {
  options: { label: string; active: boolean; onClick: () => void }[];
  title?: string;
}

export interface PriceFilterProps {
  show: boolean;
  setShow: (show: boolean) => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

export interface MaterialFilterProps {
  show: boolean;
  setShow: (show: boolean) => void;
  selectedMaterials: string[];
  onToggleMaterial: (material: string) => void;
}

export interface FilterColorProps {
  color: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

export interface ColorFilterContentProps {
  selectedColorIds: number[];
  onToggleColor: (id: number) => void;
}

export interface MaterialFilterContentProps {
  selectedMaterials: string[];
  onToggleMaterial: (material: string) => void;
}

// ============================
// تایپ‌های مربوط به صفحه جزییات محصول
// ============================
export type SubmitType = "named" | "anonymous";

export interface UseLandingProductReturn {
  selectedColorIndex: number;
  setSelectedColorIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  handleScrollToReviews: () => void;
  selectedColorName: string;
  activeIndex: number;
  fade: boolean;
  handleChangeImage: (newIndex: number) => void;
  handleLike: () => void;
  handleShare: () => void;
  images: readonly string[];
  review: string;
  setReview: React.Dispatch<React.SetStateAction<string>>;
  isNameModalOpen: boolean;
  setIsNameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitType: SubmitType;
  setSubmitType: React.Dispatch<React.SetStateAction<SubmitType>>;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonActive: boolean;
  handleSubmitReview: () => void;
  isSubmitting: boolean;
}

export interface ReviewSubmitTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitType: SubmitType;
  onChange: (value: SubmitType) => void;
}

export interface ReviewSummaryProps {
  rating: number;
  totalVotes: number;
  productTitle: string;
  productImage: string;
  landingProduct: UseLandingProductReturn;
  isLoggedIn: boolean;
  userId: number | undefined;
}

export interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productImage: string;
  landingProduct: UseLandingProductReturn;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  rate: number;
  ratingsCount: number;
  reviewsCount: number;
  colors: { name: string; value: string }[];
  sizes: string[];
  features: { title: string; value: string }[];
  description: string;
  galleryImages: string[];
  comments: { user: string; date: string; text: string; rate: number }[];
};
