"use client";

import { useState, useCallback, useEffect } from "react";
import type { Address, AddressFormData, UserData } from "../types/address.types";
import {
  getUserInfo,
  getAddresses,
  createAddress,
  updateAddress as updateAddressApi,
  deleteAddress as deleteAddressApi,
} from "../services/address.api";
import { useAuthStore } from "@/src/shared/store/store";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    hasMore: false,
  });

  const authUser = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const fetchUserInfo = useCallback(async () => {
    if (!authUser?.id) {
      return null;
    }

    setIsLoadingUser(true);
    setError(null);
    try {
      const data = await getUserInfo();
      setUserInfo(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در دریافت اطلاعات کاربر";
      setError(message);
      return null;
    } finally {
      setIsLoadingUser(false);
    }
  }, [authUser?.id]);

  const fetchAddresses = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAddresses(page, limit);

      let processedAddresses = response.data;

      // اگر فقط یک آدرس وجود دارد، آن را پیش‌فرض کن
      if (processedAddresses.length === 1) {
        processedAddresses = processedAddresses.map(addr => ({
          ...addr,
          default: true
        }));
      } else if (processedAddresses.length > 1) {
        // اگر چند آدرس داریم و هیچکدام پیش‌فرض نیستند، اولین را پیش‌فرض کن
        const hasDefault = processedAddresses.some(addr => addr.default);
        if (!hasDefault) {
          processedAddresses = processedAddresses.map((addr, index) => ({
            ...addr,
            default: index === 0
          }));
        }
      }

      setAddresses(processedAddresses);
      setMeta(response.meta);
      return { ...response, data: processedAddresses };
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در دریافت آدرس‌ها";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addAddress = useCallback(async (data: AddressFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const receiverName = data.receiverName || userInfo?.name || authUser?.name || "کاربر";
      const receiverPhone = data.receiverPhone || userInfo?.phone || authUser?.phone || "";

      const isFirstAddress = addresses.length === 0;

      const addressData = {
        ...data,
        receiverName,
        receiverPhone,
        default: isFirstAddress,
      };

      const newAddress = await createAddress(addressData);

      let updatedAddresses = [newAddress, ...addresses];

      // اگر آدرس جدید پیش‌فرض است، بقیه را غیرپیش‌فرض کن
      if (newAddress.default) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          default: addr.id === newAddress.id
        }));
      }

      setAddresses(updatedAddresses);

      return { success: true, data: newAddress };
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در ثبت آدرس";
      setError(message);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  }, [userInfo, authUser, addresses]);

  const updateAddress = useCallback(async (id: number, data: AddressFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const receiverName = data.receiverName || userInfo?.name || authUser?.name || "کاربر";
      const receiverPhone = data.receiverPhone || userInfo?.phone || authUser?.phone || "";

      const addressData = {
        ...data,
        receiverName,
        receiverPhone,
      };

      const updatedAddress = await updateAddressApi(id, addressData);

      let updatedAddresses = addresses.map((addr) =>
        addr.id === id ? updatedAddress : addr
      );

      // اگر آدرس به‌روزرسانی شده پیش‌فرض است، بقیه را غیرپیش‌فرض کن
      if (updatedAddress.default) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          default: addr.id === id
        }));
      }

      setAddresses(updatedAddresses);

      return { success: true, data: updatedAddress };
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در ویرایش آدرس";
      setError(message);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  }, [userInfo, authUser, addresses]);

  // تابع انتخاب آدرس و تنظیم به عنوان پیش‌فرض
  const selectAddress = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const addressToSelect = addresses.find(addr => addr.id === id);
      if (!addressToSelect) {
        throw new Error("آدرس پیدا نشد");
      }

      // اگر آدرس قبلاً پیش‌فرض نیست
      if (!addressToSelect.default) {
        // 1. همه آدرس‌های دیگه رو غیرپیش‌فرض کن
        const otherAddresses = addresses.filter(addr => addr.id !== id);

        // به‌روزرسانی همه آدرس‌های دیگه با default: false
        await Promise.all(
          otherAddresses.map(addr =>
            updateAddressApi(addr.id, {
              title: addr.title,
              province: addr.province,
              city: addr.city,
              address: addr.address,
              postalCode: addr.postal_code,
              receiverName: addr.receiver_name,
              receiverPhone: addr.receiver_phone,
              default: false,
            })
          )
        );

        // 2. آدرس مورد نظر رو با default: true به‌روزرسانی کن
        const updatedAddress = await updateAddressApi(id, {
          title: addressToSelect.title,
          province: addressToSelect.province,
          city: addressToSelect.city,
          address: addressToSelect.address,
          postalCode: addressToSelect.postal_code,
          receiverName: addressToSelect.receiver_name,
          receiverPhone: addressToSelect.receiver_phone,
          default: true,
        });

        // 3. همه آدرس‌ها رو در state به‌روزرسانی کن
        const updatedAddresses = addresses.map(addr => ({
          ...addr,
          default: addr.id === id
        }));

        setAddresses(updatedAddresses);
        return { success: true, data: updatedAddress };
      }

      // اگر آدرس قبلاً پیش‌فرض بود، هیچ کاری نکن
      return { success: true, data: addressToSelect };
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در انتخاب آدرس";
      setError(message);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  }, [addresses]);

  const deleteAddress = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const addressToDelete = addresses.find(addr => addr.id === id);
      const wasDefault = addressToDelete?.default;

      await deleteAddressApi(id);

      const remainingAddresses = addresses.filter((addr) => addr.id !== id);

      // اگر آدرس حذف شده پیش‌فرض بود و آدرس دیگری وجود دارد
      if (wasDefault && remainingAddresses.length > 0) {
        // اولین آدرس باقی‌مانده را پیش‌فرض کن
        const firstAddress = remainingAddresses[0];
        if (firstAddress) {
          await updateAddressApi(firstAddress.id, {
            title: firstAddress.title,
            province: firstAddress.province,
            city: firstAddress.city,
            address: firstAddress.address,
            postalCode: firstAddress.postal_code,
            receiverName: firstAddress.receiver_name,
            receiverPhone: firstAddress.receiver_phone,
            default: true,
          });

          // همه آدرس‌ها رو به‌روزرسانی کن
          const updatedAddresses = remainingAddresses.map((addr, index) => ({
            ...addr,
            default: index === 0
          }));
          setAddresses(updatedAddresses);
        }
      } else {
        setAddresses(remainingAddresses);
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در حذف آدرس";
      setError(message);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  }, [addresses]);

  useEffect(() => {
    if (authUser?.id && accessToken && isHydrated) {
      const loadData = async () => {
        try {
          await Promise.all([
            fetchUserInfo(),
            fetchAddresses(),
          ]);
        } catch (error) {
          // خطا در بارگذاری داده‌ها
        }
      };
      loadData();
    }
  }, [authUser?.id, accessToken, isHydrated, fetchUserInfo, fetchAddresses]);

  return {
    addresses,
    isLoading,
    isLoadingUser,
    error,
    meta,
    userInfo,
    fetchAddresses,
    fetchUserInfo,
    addAddress,
    updateAddress,
    deleteAddress,
    selectAddress,
  };
};