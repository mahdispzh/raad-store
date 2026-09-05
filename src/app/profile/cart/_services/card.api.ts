// src/app/profile/cart/_services/card.api.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { Cart, CartItem } from "../_types/cart.types";

export const getCart = async (): Promise<Cart> => {
  return fetcher<Cart>(() => apiClient.get("protected/carts"));
};

export const updateCartItem = async (
  itemId: number,
  quantity: number,
): Promise<CartItem> => {
  return fetcher<CartItem>(() =>
    apiClient.put(`protected/carts/items/${itemId}`, { quantity }),
  );
};

export const deleteCartItem = async (
  itemId: number,
): Promise<{ success: boolean }> => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete(`protected/carts/items/${itemId}`),
  );
};

export const clearCart = async (): Promise<{ success: boolean }> => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete("protected/carts"),
  );
};