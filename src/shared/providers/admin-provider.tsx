"use client";

import { useAuthStore } from "@/src/shared/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      router.replace("/send-otp");
      return;
    }

    if (user?.role === 1) {
      router.replace("/profile/home");
    }
  }, [hydrated, token, user, router]);
  if (!hydrated) return null;
  if (!token) return null;
  if (!user) return null;
  if (user.role !== 2) return null;

  return <>{children}</>;
}
