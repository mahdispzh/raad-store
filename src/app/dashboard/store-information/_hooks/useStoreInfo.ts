"use client";

import { useEffect, useState } from "react";
import {
  getStoreInfo,
  updateAddressInfo,
  updateContactInfo,
  updateGeneralInfo,
  updateLogoInfo,
  updateSocialInfo,
} from "../_services/store-info.api";
import type {
  AddressInfo,
  ContactInfo,
  GeneralInfo,
  LogoInfo,
  SocialInfo,
  StoreInfoData,
} from "../_types/store-info.types";

export function useStoreInfo() {
  const [data, setData] = useState<StoreInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Draftها
  const [generalDraft, setGeneralDraft] = useState<GeneralInfo | null>(null);
  const [addressDraft, setAddressDraft] = useState<AddressInfo | null>(null);
  const [contactDraft, setContactDraft] = useState<ContactInfo | null>(null);
  const [socialDraft, setSocialDraft] = useState<SocialInfo | null>(null);
  const [logoDraft, setLogoDraft] = useState<LogoInfo | null>(null);

  // وضعیت ویرایش
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);

  // بارگذاری اولیه
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getStoreInfo();
        setData(result);
        setGeneralDraft(result.general);
        setAddressDraft(result.address);
        setContactDraft(result.contact);
        setSocialDraft(result.social);
        setLogoDraft(result.logo);
        setError(null);
      } catch (err: any) {
        setError(err.message || "خطا در دریافت اطلاعات فروشگاه");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // شروع ویرایش (عمومی)
  const startEdit = <T>(
    setDraft: (v: T) => void,
    current: T,
    setEditing: (v: boolean) => void,
  ) => {
    setDraft({ ...current });
    setEditing(true);
  };

  // ذخیره اطلاعات کلی
  const saveGeneral = async () => {
    if (!generalDraft || !data) return;
    try {
      const updated = await updateGeneralInfo(generalDraft);
      setData(updated);
      setIsEditingGeneral(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره اطلاعات کلی");
    }
  };

  const cancelGeneral = () => {
    if (data) {
      setGeneralDraft({ ...data.general });
      setIsEditingGeneral(false);
    }
  };

  // ذخیره آدرس
  const saveAddress = async () => {
    if (!addressDraft || !data) return;
    try {
      const updated = await updateAddressInfo(addressDraft);
      setData(updated);
      setIsEditingAddress(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره آدرس");
    }
  };

  const cancelAddress = () => {
    if (data) {
      setAddressDraft({ ...data.address });
      setIsEditingAddress(false);
    }
  };

  // ذخیره تماس
  const saveContact = async () => {
    if (!contactDraft || !data) return;
    try {
      const updated = await updateContactInfo(contactDraft);
      setData(updated);
      setIsEditingContact(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره اطلاعات تماس");
    }
  };

  const cancelContact = () => {
    if (data) {
      setContactDraft({ ...data.contact });
      setIsEditingContact(false);
    }
  };

  // ذخیره شبکه‌های اجتماعی
  const saveSocial = async () => {
    if (!socialDraft || !data) return;
    try {
      const updated = await updateSocialInfo(socialDraft);
      setData(updated);
      setIsEditingSocial(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره شبکه‌های اجتماعی");
    }
  };

  const cancelSocial = () => {
    if (data) {
      setSocialDraft({ ...data.social });
      setIsEditingSocial(false);
    }
  };

  // به‌روزرسانی لوگو
  const updateLogo = async (newLogo: LogoInfo) => {
    if (!data) return;
    try {
      const updated = await updateLogoInfo(newLogo);
      setData(updated);
      setLogoDraft(newLogo);
      setError(null);
    } catch (err: any) {
      setError(err.message || "خطا در آپلود لوگو");
    }
  };

  // توابع آپدیت فیلدها
  const updateGeneralField = <K extends keyof GeneralInfo>(
    field: K,
    value: GeneralInfo[K],
  ) => {
    if (generalDraft) {
      setGeneralDraft({ ...generalDraft, [field]: value });
    }
  };

  const updateAddressField = <K extends keyof AddressInfo>(
    field: K,
    value: AddressInfo[K],
  ) => {
    if (addressDraft) {
      setAddressDraft({ ...addressDraft, [field]: value });
    }
  };

  const updateContactField = <K extends keyof ContactInfo>(
    field: K,
    value: ContactInfo[K],
  ) => {
    if (contactDraft) {
      setContactDraft({ ...contactDraft, [field]: value });
    }
  };

  const updateSocialField = <K extends keyof SocialInfo>(
    field: K,
    value: SocialInfo[K],
  ) => {
    if (socialDraft) {
      setSocialDraft({ ...socialDraft, [field]: value });
    }
  };

  return {
    data,
    loading,
    error,
    generalDraft,
    addressDraft,
    contactDraft,
    socialDraft,
    logoDraft,
    isEditingGeneral,
    isEditingAddress,
    isEditingContact,
    isEditingSocial,
    // ✅ ست‌کننده‌ها رو هم برگردون
    setGeneralDraft,
    setAddressDraft,
    setContactDraft,
    setSocialDraft,
    setIsEditingGeneral,
    setIsEditingAddress,
    setIsEditingContact,
    setIsEditingSocial,
    startEdit,
    saveGeneral,
    cancelGeneral,
    saveAddress,
    cancelAddress,
    saveContact,
    cancelContact,
    saveSocial,
    cancelSocial,
    updateLogo,
    updateGeneralField,
    updateAddressField,
    updateContactField,
    updateSocialField,
  };
}
