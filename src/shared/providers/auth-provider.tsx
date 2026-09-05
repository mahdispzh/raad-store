// providers/auth-provider.tsx

"use client";

import { getMe } from "@/src/shared/services/get-me";
import { useAuthStore } from "@/src/shared/store/store";
import { useEffect } from "react";
export interface User {
  id: number;
  name: string;
  phone: string;
  mail: string;
  role: number;
}
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const accessToken = useAuthStore((state) => state.accessToken);
  const hydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (!hydrated || !accessToken) return;

    const init = async () => {
      try {
        const user = (await getMe()) as User | null;
        if (user) {
          setUser(user);
        }
      } catch {
        // ignore unauthorized/public route assertions
      }
    };

    init();
  }, [accessToken, hydrated, setUser]);

  return <>{children}</>;
}
