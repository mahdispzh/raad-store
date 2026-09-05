// _hooks/useDashboardHome.ts
import { useRouter } from "next/navigation";

// Hook for action card navigation handlers
export function useActionCard() {
  const router = useRouter();

  // Navigate to messages page
  const onMsg = () => router.push("/dashboard/messages");

  // Navigate to profile page
  const onProfile = () => router.push("/dashboard/profile");

  // Navigate to home page (logout)
  const onLogout = () => router.push("/");

  return { onMsg, onProfile, onLogout };
}
