import { authService } from "../auth/auth.service";
import { useAuthStore } from "../store/store";
import { apiClient } from "./client";

let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });

  failedQueue = [];
}

export function setupInterceptors() {
  // REQUEST
  apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    const hydrated = useAuthStore.getState().isHydrated;
    if (!hydrated) return config;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // RESPONSE
  apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;

      if (!error.response) {
        return Promise.reject(error);
      }

      // 🚨 جلوگیری از refresh loop
      if (original.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      // جلوگیری از retry بی‌نهایت روی یک request
      if (original._retry) {
        return Promise.reject(error);
      }

      original._retry = true;

      // اگر refresh در حال اجراست → queue کن
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(original));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await authService.refresh();

        useAuthStore.getState().setToken(newToken);

        processQueue(null, newToken);

        original.headers.Authorization = `Bearer ${newToken}`;

        return apiClient(original);
      } catch (err) {
        processQueue(err, null);

        useAuthStore.getState().setToken(null);

        await authService.logout();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    },
  );
}
