// hooks/useWishlist.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlist, removeFromWishlist as removeFromWishlistApi } from '../_services/wishlist.api';
import { WishlistItem } from '../_types/wishlist.types';

export const WISHLIST_QUERY_KEY = ['wishlist'];

export const useWishlist = () => {
  const queryClient = useQueryClient();

  // دریافت لیست علاقه‌مندی‌ها
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: () => getWishlist(),
    staleTime: 5 * 60 * 1000,
  });

  // حذف از علاقه‌مندی‌ها
  const removeMutation = useMutation({
    mutationFn: (slug: string) => removeFromWishlistApi(slug),
    onSuccess: (_, slug) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          items: oldData.items.filter(
            (item: WishlistItem) => item.slug !== slug
          ),
          total: oldData.total - 1,
        };
      });
    },
  });

  const removeFromWishlist = (slug: string) => {
    return removeMutation.mutateAsync(slug);
  };

  // داده‌ها مستقیم از سرویس فرمت شده‌اند
  const favorites = data?.items.map((item) => ({
    id: item.product_id,
    slug: item.slug,
    title: item.product.name,
    imageSrc: item.product.images?.[0] || "/images/image32.svg",
    price: item.product.price,
    discountPercent: item.product.discount || 0,
    rating: item.product.rating || 0,
  })) || [];

  return {
    favorites,
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    removeFromWishlist,
    isRemoving: removeMutation.isPending,
  };
};