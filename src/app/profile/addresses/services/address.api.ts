// services/address.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { useAuthStore } from "@/src/shared/store/store";
import type {
  Address,
  AddressFormData,
  AddressesResponse,
  UserData,
} from "../types/address.types";

export const getUserInfo = async (): Promise<UserData> => {
  const userId = useAuthStore.getState().user?.id;

  if (!userId) {
    throw new Error("کاربر وارد نشده است");
  }

  return fetcher<UserData>(() => apiClient.get(`protected/users/${userId}`));
};

export const getAddresses = async (
  page: number = 1,
  limit: number = 10,
): Promise<AddressesResponse> => {
  return fetcher<AddressesResponse>(() =>
    apiClient.get(`protected/addresses?page=${page}&limit=${limit}`),
  );
};

export const createAddress = async (
  data: AddressFormData,
): Promise<Address> => {
  const payload = {
    title: data.title,
    province: data.province,
    city: data.city,
    address: data.address,
    postalCode: data.postalCode,
    receiverName: data.receiverName,
    receiverPhone: data.receiverPhone,
    default: data.default || false,
  };

  return fetcher<Address>(() =>
    apiClient.post("protected/addresses", payload),
  );
};

export const updateAddress = async (
  id: number,
  data: AddressFormData,
): Promise<Address> => {
  const payload = {
    title: data.title,
    province: data.province,
    city: data.city,
    address: data.address,
    postalCode: data.postalCode,
    receiverName: data.receiverName,
    receiverPhone: data.receiverPhone,
    default: data.default,
  };

  return fetcher<Address>(() =>
    apiClient.put(`protected/addresses/${id}`, payload),
  );
};

// تنظیم یک آدرس به‌عنوان پیش‌فرض
export const setDefaultAddress = async (id: number): Promise<Address> => {
  return fetcher<Address>(() =>
    apiClient.patch(`protected/addresses/${id}/set-default`),
  );
};

export const deleteAddress = async (
  id: number,
): Promise<{ success: boolean }> => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete(`protected/addresses/${id}`),
  );
};

export const getAddress = async (id: number): Promise<Address> => {
  return fetcher<Address>(() => apiClient.get(`protected/addresses/${id}`));
};