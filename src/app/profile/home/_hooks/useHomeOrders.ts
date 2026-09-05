// src/app/profile/home/_hooks/useHomeOrders.ts
import { useState, useEffect, useCallback } from 'react';
import { getOrderStatusCounts } from '../../orders/_services/orders.api';
import type { OrderStatusCounts } from '../_types/home.types';

export function useHomeOrders() {
  const [counts, setCounts] = useState<OrderStatusCounts>({
    current: 0,
    delivered: 0,
    returned: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getOrderStatusCounts();
      setCounts(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return { counts, loading, error, refetch: fetchCounts };
}