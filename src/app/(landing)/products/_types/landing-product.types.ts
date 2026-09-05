export interface ProductVariant {
  id: number;
  price: number;
  color_id: number;
  size_id: number;
  stock: number;
  colors: { id: number; name: string; hex_code: string };
  sizes: { id: number; name: string };
}

export interface FeatureItem {
  id?: number;
  name?: string;
  value?: string;
}

export interface TemporaryProduct {
  id: number;
  name: string;
  description: string;
  images: string[];
  category_id?: number | null;
  product_variants?: ProductVariant[];
  comments?: unknown[];
  ratings?: { rating?: number }[];
  features?: FeatureItem[];
  guid_image?: string;
  slug: string;
  isLiked?: boolean;
}

export interface ColorItem {
  id: number;
  name: string;
  hex_code: string;
}

export interface SizeItem {
  id: number;
  name: string;
}

export interface CommentItemProps {
  user: string;
  date: string;
  text: string;
  rate: number;
}

export interface FeatureCardProps {
  title: string;
  value: string;
}
export interface PrimaryCardProps {
  price: number;
  productId: number;
  title: string;
  image: string;
  stock: number;
  discount?: number | null;
  isLoggedIn: boolean;
  isInCart: boolean;
  quantity: number;
  onAddToCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onViewCart: () => void;
  isLoading?: boolean;
}
export interface ProductImagesProps {
  images: string[];
  alt?: string;
  userId: number | undefined;
  slug: string;
  initialIsLiked?: boolean;
  isLiked: boolean;
}

export interface ColorItem {
  id: number;
  name: string;
  hex_code: string;
}
export interface SizeItem {
  id: number;
  name: string;
}

export interface ProductInfoProps {
  title: string;
  reviewersCount: number;
  onViewReviews?: () => void;
  averageRating: number;
  colors: ColorItem[];
  sizes: SizeItem[];
  selectedColorId: number | null;
  selectedSizeId: number | null;
  onSelectColor: (colorId: number) => void;
  onSelectSize: (sizeId: number) => void;
  features?: FeatureItem[];
  guidImage?: string;
}

export interface ApiComment {
  id: number;
  user_id: number;
  isUnknown: boolean | null;
  parent_id: number | null;
  created_at: string | null;
  status: number | null;
  text: string;
  rating?: number | null;
  users: {
    name: string | null;
  };
}

export interface ReviewsProps {
  rating?: number | null;
  rawComments: ApiComment[];
  productTitle: string;
  productImage: string;
  landingProduct?: unknown;
  isLoggedIn: boolean;
  userId: number | undefined;
}

export interface SecondaryCardProps {
  title: string;
  price: number;
  discount?: number | null;
  image: string;
  colorName: string;
  size: string;
  productId: number;
  stock: number;
  isLoggedIn: boolean;
  isInCart: boolean;
  quantity: number;
  onAddToCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onViewCart: () => void;
  isLoading?: boolean;
}

export interface StoreCardActionsProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onViewCart: () => void;
  buttonTextSize?: "lg" | "md";
  disabled?: boolean;
}
export type SuggestedProduct = {
  id: number;
  imageSrc: string;
  productName: string;
  rate: number;
  price: number;
  discount?: number;
};
export type SuggestedProductsProps = {
  products: SuggestedProduct[];
};
