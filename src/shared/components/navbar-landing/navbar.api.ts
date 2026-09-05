// _hooks/navbar.api.ts
"use client";

import { useAuthStore } from "@/src/shared/store/store";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  const user = useAuthStore((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(!!user);
    setIsLoading(false);
  }, [user]);

  return { isLoggedIn, isLoading, user };
}