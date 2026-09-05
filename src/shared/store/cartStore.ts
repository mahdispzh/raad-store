// src/shared/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  count: number;
  isAddedToCart: boolean;
  addToCart: (item: CartItem) => void;
  increase: (id: string | number) => void;
  decrease: (id: string | number) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      isAddedToCart: false,
      addToCart: (item: CartItem) => {
        set((state) => ({
          items: [...state.items, { ...item, quantity: 1 }],
          count: state.count + 1,
          isAddedToCart: true,
        }));
      },
      increase: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
          count: state.count + 1,
        })),
      decrease: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item?.quantity === 1) {
            return {
              items: state.items.filter((i) => i.id !== id),
              count: state.count - 1,
              isAddedToCart: state.items.length - 1 === 0 ? false : true,
            };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            ),
            count: state.count - 1,
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          count:
            state.count - (state.items.find((i) => i.id === id)?.quantity || 0),
          isAddedToCart: state.items.length - 1 === 0 ? false : true,
        })),
      clearCart: () => set({ items: [], count: 0, isAddedToCart: false }),
    }),
    { name: "cart-storage" },
  ),
);
