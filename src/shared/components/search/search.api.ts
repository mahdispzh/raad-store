// src/shared/services/search.api.ts
"use client";

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import {
  ProductsResponse,
  SettingsResponse,
  UserWithRecentSearch,
} from "./search.types";

export const getUserById = async (
  userId: number,
): Promise<UserWithRecentSearch> => {
  try {
    return await fetcher<UserWithRecentSearch>(() =>
      apiClient.get(`protected/users/${userId}`),
    );
  } catch (error) {
    return {
      id: userId,
      name: null,
      phone: null,
      mail: null,
      recently_search: [],
    };
  }
};

export const updateRecentSearches = async (
  userId: number,
  searches: string[],
) => {
  const currentUser = await getUserById(userId);
  await fetcher<{ success: boolean }>(() =>
    apiClient.put(`protected/users/${userId}`, {
      name: currentUser?.name || null,
      mail: currentUser?.mail || null,
      phone: currentUser?.phone || null,
      recentlySearch: searches,
      recentlyview: currentUser?.recently_search || [],
    }),
  );
  return { success: true };
};

export const getPopularSearches = async (): Promise<string[]> => {
  try {
    const response = await fetcher<SettingsResponse>(() =>
      apiClient.get("public/settings"),
    );
    return response?.data?.[0]?.popular_search || [];
  } catch {
    return [];
  }
};

export const searchProducts = async (
  searchTerm: string,
): Promise<ProductsResponse> => {
  return fetcher<ProductsResponse>(() =>
    apiClient.get(`public/products?search=${encodeURIComponent(searchTerm)}`),
  );
};