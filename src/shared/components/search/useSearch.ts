// hooks/useSearch.ts

"use client";

import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { useAuthStore } from "@/src/shared/store/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPopularSearches, getUserById, searchProducts, updateRecentSearches } from "./search.api";

export function useSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  // state های جستجو
  const [value, setValue] = useState("");
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const lastSavedSearchRef = useRef<string>("");

  const debouncedValue = useDebounce(value, 500);

  // دریافت جستجوهای اخیر
  const {
    data: userData,
    refetch,
    isLoading: isRecentLoading,
  } = useQuery({
    queryKey: ["recent-searches", user?.id],
    queryFn: () => getUserById(user!.id),
    enabled: isLoggedIn && !!user?.id,
    staleTime: 1000 * 60,
  });

  const recentSearches = userData?.recently_search || [];

  // همگام‌سازی با URL
  useEffect(() => {
    if (pathname !== "/products" && value) {
      setValue("");
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/products") {
      const searchParams = new URLSearchParams(window.location.search);
      const searchQuery = searchParams.get("search");
      if (searchQuery && searchQuery !== value) {
        setValue(searchQuery);
      }
    }
  }, [pathname]);

  // مدیریت دیباینس
  useEffect(() => {
    if (value.length >= 1) {
      setIsDebouncing(true);
      const timer = setTimeout(() => {
        setIsDebouncing(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsDebouncing(false);
    }
  }, [value]);

  // دریافت جستجوهای پرطرفدار
  useEffect(() => {
    const loadPopularSearches = async () => {
      setIsPopularLoading(true);
      const searches = await getPopularSearches();
      setPopularSearches(searches);
      setIsPopularLoading(false);
    };
    loadPopularSearches();
  }, []);

  // ذخیره جستجوها
  const saveRecentSearches = useCallback(
    async (searches: string[]) => {
      if (!isLoggedIn || !user?.id) return false;
      try {
        await updateRecentSearches(user.id, searches);
        queryClient.setQueryData(["recent-searches", user.id], {
          ...userData,
          recently_search: searches,
        });
        await refetch();
        return true;
      } catch (error) {
        console.error("Failed to save recent searches:", error);
        return false;
      }
    },
    [isLoggedIn, user?.id, userData, queryClient, refetch],
  );

  // اضافه کردن جستجو
  const addToRecentSearches = useCallback(
    async (searchTerm: string) => {
      if (!isLoggedIn) return false;
      if (!searchTerm.trim()) return false;
      const currentSearches = recentSearches;
      const filtered = currentSearches.filter((item) => item !== searchTerm);
      const updated = [searchTerm, ...filtered].slice(0, 5);
      return await saveRecentSearches(updated);
    },
    [isLoggedIn, recentSearches, saveRecentSearches],
  );

  // اجرای جستجو
  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm.trim()) return;
      if (searchTerm.length < 1) return;
      if (lastSavedSearchRef.current === searchTerm) {
        router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
        return;
      }
      lastSavedSearchRef.current = searchTerm;
      if (isLoggedIn) {
        await addToRecentSearches(searchTerm);
      }
      setTimeout(() => {
        lastSavedSearchRef.current = "";
      }, 500);
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    },
    [addToRecentSearches, router, isLoggedIn],
  );

  // حذف یک جستجو
  const removeRecentItem = useCallback(
    async (item: string) => {
      if (!isLoggedIn) return;
      const updated = recentSearches.filter((search) => search !== item);
      await saveRecentSearches(updated);
    },
    [isLoggedIn, recentSearches, saveRecentSearches],
  );

  // حذف همه جستجوها
  const clearAllRecent = useCallback(async () => {
    if (!isLoggedIn) return;
    await saveRecentSearches([]);
  }, [isLoggedIn, saveRecentSearches]);

  // جستجوی زنده
  const {
    data: liveResults,
    isLoading: liveLoading,
    isFetching,
  } = useQuery({
    queryKey: ["live-search", debouncedValue],
    queryFn: () => searchProducts(debouncedValue),
    enabled: debouncedValue.length >= 1 && pathname !== "/products",
  });

  const isSearching =
    isDebouncing || (debouncedValue.length >= 1 && (liveLoading || isFetching));

  return {
    value,
    setValue,
    recentSearches,
    popularSearches,
    liveResults: liveResults?.data || [],
    liveLoading: isSearching,
    isDebouncing,
    isPopularLoading,
    isRecentLoading: isLoggedIn ? isRecentLoading : false,
    removeRecentItem,
    clearAllRecent,
    handleSearch,
    isLoggedIn,
  };
}