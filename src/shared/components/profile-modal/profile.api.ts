import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { useAuthStore } from "../../store/store";
import { User } from "./profile-modal.types";

export const profileApi = {
  getCurrentUser: async (): Promise<User> => {
    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const data = await fetcher<{
      id: number;
      name: string | null;
      mail: string | null;
      phone: string | null;
      role?: number;
    }>(() => apiClient.get(`protected/users/${userId}`));

    return {
      id: data.id,
      name: data.name || null,
      mail: data.mail || null,
      phone: data.phone || null,
      role: data.role || 1, // پیش‌فرض 1 برای کاربر عادی
    };
  },
  updateUser: async (payload: {
    name: string;
    phone: string;
    mail?: string | null;
  }): Promise<User> => {
    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const data = await fetcher<User>(() =>
      apiClient.put(`protected/users/${userId}`, payload),
    );

    return data;
  },
};
