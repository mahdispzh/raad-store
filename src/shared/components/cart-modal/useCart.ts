// src/shared/hooks/useCartt.ts
import { useQuery } from "@tanstack/react-query";
import { getCart } from "./cart.api";

export const useCart = (enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["userCart"],
    queryFn: async () => {
      console.log("🔄 Fetching cart...");
      const data = await getCart();
      console.log("✅ Cart data received:", data);
      return data;
    },
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000, // ۵ دقیقه کش
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetchCart: query.refetch,
  };
};
