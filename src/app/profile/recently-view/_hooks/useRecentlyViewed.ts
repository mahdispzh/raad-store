// hooks/useRecentlyViewed.ts
import { useQuery } from '@tanstack/react-query';
import { getRecentlyViewedProducts } from '../_services/recently-view.api';

export const RECENTLY_VIEWED_QUERY_KEY = ['recently-viewed'];

export const useRecentlyViewed = () => {
  console.log('🔵 useRecentlyViewed hook called');

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: RECENTLY_VIEWED_QUERY_KEY,
    queryFn: () => {
      console.log('🟡 Query function called');
      return getRecentlyViewedProducts();
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: {
      items: [],
      total: 0,
    },
    retry: 1,
  });

  console.log('🟡 Query result - isLoading:', isLoading);
  console.log('🟡 Query result - data:', data);
  console.log('🟡 Query result - error:', error);

  const recentlyViewed = data?.items?.map((item) => ({
    id: item.product_id,
    title: item.product?.name || 'محصول نامشخص',
    imageSrc: item.product?.images?.[0] || "/images/image32.svg",
    price: item.product?.price || 0,
    discountPercent: item.product?.discount || 0,
    rating: item.product?.rating || 0,
    viewedAt: item.viewed_at,
  })) || [];

  console.log('🟢 Mapped recentlyViewed:', recentlyViewed);
  console.log('🟢 recentlyViewed count:', recentlyViewed.length);

  return {
    recentlyViewed,
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    isEmpty: recentlyViewed.length === 0,
  };
};