import { apiClient } from "@/src/shared/api/client";
import { useAuthStore } from "../store/store";

export const authService = {
  async refresh() {
    const res = await apiClient.post("/auth/refresh");

    const newToken = res.data.accessToken;
    const user = res.data.user;

    useAuthStore.getState().setToken(newToken);
    if (user) {
      useAuthStore.getState().setUser(user);
    }

    return newToken;
  },

  async logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch {}

    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setUser(null);

    const pathname = window.location.pathname;
    if (pathname.includes("/profile") || pathname.includes("/dashboard")) {
      window.location.replace("/send-otp");
    }
  },
};
