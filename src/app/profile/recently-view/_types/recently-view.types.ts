// types/recently-view.types.ts
export interface RecentlyViewedProduct {
  id: number;
  name: string;
  price: number;
  discount?: number;
  images: string[];
  rating?: number;
  likesCount?: number;
  product_variants?: Array<{
    id: number;
    price: number;
    discount?: number;
  }>;
}

export interface RecentlyViewedItem {
  id: number;
  product_id: number;
  user_id: number;
  viewed_at: string;
  product: {
    id: number;
    name: string;
    price: number;
    discount?: number;
    images: string[];
    rating?: number;
    likesCount?: number;
  };
}

export interface RecentlyViewedResponse {
  items: RecentlyViewedItem[];
  total: number;
}