// src/app/profile/addresses/_services/address.api.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import type {
  Address,
  AddressesResponse,
  UserData,
} from "../_types/address.types";

// دریافت اطلاعات کاربر
export const getUserInfo = async (): Promise<UserData> => {
  return fetcher<UserData>(() => apiClient.get("protected/users/me"));
};

// دریافت لیست آدرس‌ها
export const getAddresses = async (
  page: number = 1,
  limit: number = 10,
): Promise<AddressesResponse> => {
  return fetcher<AddressesResponse>(() =>
    apiClient.get(`protected/addresses?page=${page}&limit=${limit}`),
  );
};

// تنظیم آدرس پیش‌فرض
export const setDefaultAddress = async (id: number): Promise<Address> => {
  return fetcher<Address>(() =>
    apiClient.patch(`protected/addresses/${id}/default`),
  );
};

// سازگاری با importهای قدیمی (addressService.xxx)؛ اگه دیگه جایی صداش
// نمی‌زنه، می‌تونی این export رو حذف کنی.
export const addressService = {
  getUserInfo,
  getAddresses,
  setDefaultAddress,
};