"use client";

import { useEffect, useRef } from "react";

import { apiClient } from "../api/client";
import { setupInterceptors } from "../api/interceptors";
import { useAuthStore } from "../store/store";

export function AuthBootstrap() {
  const initialized = useRef(false);
  useEffect(() => {
    setupInterceptors();
  }, []);

  useEffect(() => {
    // ⛔ جلوگیری از اجرای دوباره
    if (initialized.current) return;

    initialized.current = true;

    const init = async () => {
      try {
        const { data } = await apiClient.post("/auth/refresh");

        useAuthStore.getState().setToken(data.accessToken);
        useAuthStore.getState().setUser(data.user);
      } catch {
        useAuthStore.getState().setToken(null);
        useAuthStore.getState().setUser(null);
      } finally {
        useAuthStore.getState().setHydrated(true);
      }
    };

    init();
  }, []);

  return null;
}
