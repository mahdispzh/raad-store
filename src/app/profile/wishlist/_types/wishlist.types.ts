// types/wishlist.types.ts
export interface WishlistItem {
  id: number;
  slug:string;
  product_id: number;
  user_id: number;
  created_at: string;
  product: {
    id: number;
    name: string;
    price: number;
    discount?: number;
    images: string[];
    rating?: number;
  };
}

export interface WishlistResponse {
  items: WishlistItem[];
  total: number;
}

export interface RemoveFromWishlistResponse {
  liked: boolean;
  likesCount: number;
}