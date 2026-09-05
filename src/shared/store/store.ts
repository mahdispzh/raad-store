import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  isHydrated: boolean;
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setHydrated: (value: boolean) => void;
};
export interface User {
  id: number;
  name: string | null;
  phone: string | null;
  mail: string | null;
  role: number;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: !!user && !!state.accessToken,
    })),
  // ✅ مهم
  isHydrated: false,

  setToken: (token) =>
    set((state) => ({
      accessToken: token,
      isAuthenticated: !!token && !!state.user,
    })),

  setHydrated: (value) =>
    set({
      isHydrated: value,
    }),
}));
