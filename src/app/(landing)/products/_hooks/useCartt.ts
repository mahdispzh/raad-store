import { useQuery } from "@tanstack/react-query";
import { getCart } from "../_services/cart.api";

export const useCartt = (enabled: boolean) => {
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
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetchCart: query.refetch,
  };
};
