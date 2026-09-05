// src/app/profile/home/_hooks/useFrequentProducts.ts
import { useState, useEffect, useCallback } from "react";
import { getFrequentProducts } from "../_services/home.api";
import type { FrequentProduct } from "../_types/home.types";

export function useFrequentProducts() {
  const [products, setProducts] = useState<FrequentProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getFrequentProducts();
      setProducts(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}