// src/app/profile/payment/_hooks/useAddressManager.ts

"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useAddresses } from "../../addresses/hooks/useAddresses";
import { Address } from "../_types/address.types";

export function useAddressManager() {
  const {
    addresses: allAddresses,
    isLoading: isLoadingAddresses,
    error: addressesError,
    selectAddress,
    fetchAddresses,
    userInfo,
  } = useAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // ✅ فرمت کردن آدرس‌ها
  const formattedAddresses = useMemo<Address[]>(() => {
    if (!allAddresses || allAddresses.length === 0) {
      return [];
    }

    return allAddresses.map((addr: any) => ({
      id: addr.id,
      title: addr.title || "آدرس",
      fullAddress:
        addr.fullAddress ||
        addr.address ||
        `${addr.province || ""} - ${addr.city || ""} - ${addr.address || ""}`,
      province: addr.province || "",
      city: addr.city || "",
      address: addr.address || "",
      postalCode: addr.postal_code || "",
      receiverName: addr.receiver_name || userInfo?.name || "",
      receiverPhone: addr.receiver_phone || userInfo?.phone || "",
      isDefault: addr.default || false,
    }));
  }, [allAddresses, userInfo]);

  // ✅ آدرس انتخاب شده
  const selectedAddress = useMemo(() => {
    return formattedAddresses.find((a) => a.id === selectedAddressId) || null;
  }, [formattedAddresses, selectedAddressId]);

  // ✅ آدرس پیش‌فرض
  const defaultAddress = useMemo(() => {
    return formattedAddresses.find((a) => a.isDefault) || formattedAddresses[0] || null;
  }, [formattedAddresses]);

  // ✅ **تنظیم آدرس پیش‌فرض هنگام بارگذاری آدرس‌ها**
  useEffect(() => {
    if (formattedAddresses.length > 0 && !selectedAddressId) {
      const defaultAddr = formattedAddresses.find((a) => a.isDefault) || formattedAddresses[0];
      if (defaultAddr) {
        console.log("📍 تنظیم آدرس پیش‌فرض:", defaultAddr);
        setSelectedAddressId(defaultAddr.id);
        selectAddress(defaultAddr.id);
      }
    }
  }, [formattedAddresses, selectedAddressId, selectAddress]);

  // ✅ باز کردن مودال
  const openAddressModal = useCallback(() => {
    setIsAddressModalOpen(true);
  }, []);

  // ✅ بستن مودال
  const closeAddressModal = useCallback(() => {
    setIsAddressModalOpen(false);
  }, []);

  // ✅ تایید انتخاب آدرس
  const confirmAddressSelection = useCallback(() => {
    if (!selectedAddressId) {
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        selectAddress(defaultAddress.id);
      }
      closeAddressModal();
      return;
    }

    const selected = formattedAddresses.find((a) => a.id === selectedAddressId);
    if (selected) {
      selectAddress(selected.id);
    }
    closeAddressModal();
  }, [selectedAddressId, formattedAddresses, defaultAddress, selectAddress, closeAddressModal]);

  // ✅ رفرش آدرس‌ها
  const refreshAddresses = useCallback(async () => {
    await fetchAddresses();
  }, [fetchAddresses]);

  return {
    addresses: formattedAddresses,
    selectedAddress,
    selectedAddressId,
    setSelectedAddressId,
    defaultAddress,
    isAddressModalOpen,
    isLoadingAddresses,
    error: addressesError,
    openAddressModal,
    closeAddressModal,
    confirmAddressSelection,
    refreshAddresses,
  };
}