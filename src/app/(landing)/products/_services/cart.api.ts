import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface CartItem {
  id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  product_variants: {
    id: number;
    price: number;
    stock: number;
  };
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  cart_items: CartItem[];
}

export const getCart = (): Promise<Cart> => {
  return fetcher(() => apiClient.get("/protected/carts"));
};

export const addToCart = (
  variantId: number,
  quantity: number,
): Promise<CartItem> => {
  return fetcher(() =>
    apiClient.post("/protected/carts/items", {
      productVariantId: variantId,
      quantity,
    }),
  );
};

export const updateCartItem = (
  itemId: number,
  quantity: number,
): Promise<CartItem> => {
  return fetcher(() =>
    apiClient.put(`/protected/carts/items/${itemId}`, { quantity }),
  );
};

export const deleteCartItem = (itemId: number): Promise<void> => {
  return fetcher(() => apiClient.delete(`/protected/carts/items/${itemId}`));
};
