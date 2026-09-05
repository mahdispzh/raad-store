// services/logout.service.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { useAuthStore } from "../../store/store";

export interface LogoutResponse {
  success: boolean;
}

class Logout {
  async logout(): Promise<LogoutResponse> {
    const data = await fetcher<LogoutResponse>(() =>
      apiClient.post("auth/logout"),
    );

    return data;
  }

  clearLocalUserData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    sessionStorage.clear();
  }

  clearStore(): void {
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setToken(null);

    useAuthStore.setState({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  }

  async fullLogout(): Promise<void> {
    await this.logout();
    this.clearLocalUserData();
    this.clearStore();
  }
}

export const logoutService = new Logout();