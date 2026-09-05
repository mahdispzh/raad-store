import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import type {
  StoreInfoData,
  StoreInformationRaw,
  UpdateAddressPayload,
  UpdateContactPayload,
  UpdateGeneralPayload,
  UpdateLogoPayload,
  UpdateSocialPayload,
} from "../_types/store-info.types";

// ---------- تبدیل داده‌ی خام دیتابیس به شکل فرانت ----------
function mapRawToStoreInfo(raw: StoreInformationRaw): StoreInfoData {
  return {
    logo: {
      rectLogoUrl: raw.logo_main || "/images/logo.svg",
      circleLogoUrl: raw.logo_sub || "/images/circular-icon.svg",
      storeName: raw.title || "",
    },
    general: {
      storeName: raw.title || "",
      description: raw.description || "",
    },
    address: {
      address: raw.address || "",
      companyAddressUrl: raw.map || "",
    },
    contact: {
      mobile: raw.phone_primary || "",
      phone: raw.office_phone || "",
      email: raw.mail || "",
    },
    social: {
      bale: raw.bale || "",
      eitaa: raw.eita || "",
      rubika: raw.rubika || "",
      whatsapp: raw.whatsapp || "",
      telegram: raw.telegram || "",
      instagram: raw.instagram || "",
    },
  };
}

// ---------- دریافت اطلاعات کامل ----------
export const getStoreInfo = async (): Promise<StoreInfoData> => {
  const raw = await fetcher<StoreInformationRaw>(() =>
    apiClient.get("/protected/store-info"),
  );
  return mapRawToStoreInfo(raw);
};

// ---------- به‌روزرسانی اطلاعات کلی ----------
export const updateGeneralInfo = async (
  data: UpdateGeneralPayload,
): Promise<StoreInfoData> => {
  const raw = await fetcher<StoreInformationRaw>(() =>
    apiClient.put("/protected/store-info", {
      title: data.storeName,
      description: data.description,
    }),
  );
  return mapRawToStoreInfo(raw);
};

// ---------- به‌روزرسانی آدرس ----------
export const updateAddressInfo = async (
  data: UpdateAddressPayload,
): Promise<StoreInfoData> => {
  const raw = await fetcher<StoreInformationRaw>(() =>
    apiClient.put("/protected/store-info", {
      address: data.address,
      map: data.companyAddressUrl,
    }),
  );
  return mapRawToStoreInfo(raw);
};

// ---------- به‌روزرسانی اطلاعات تماس ----------
export const updateContactInfo = async (
  data: UpdateContactPayload,
): Promise<StoreInfoData> => {
  const raw = await fetcher<StoreInformationRaw>(() =>
    apiClient.put("/protected/store-info", {
      phone_primary: data.mobile,
      office_phone: data.phone,
      mail: data.email,
    }),
  );
  return mapRawToStoreInfo(raw);
};

// ---------- به‌روزرسانی شبکه‌های اجتماعی ----------
export const updateSocialInfo = async (
  data: UpdateSocialPayload,
): Promise<StoreInfoData> => {
  const raw = await fetcher<StoreInformationRaw>(() =>
    apiClient.put("/protected/store-info", {
      bale: data.bale,
      eita: data.eitaa,
      rubika: data.rubika,
      whatsapp: data.whatsapp,
      telegram: data.telegram,
      instagram: data.instagram,
    }),
  );
  return mapRawToStoreInfo(raw);
};

// ---------- به‌روزرسانی لوگو ----------
export const updateLogoInfo = async (
  data: UpdateLogoPayload,
): Promise<StoreInfoData> => {
  const raw = await fetcher<StoreInformationRaw>(() =>
    apiClient.put("/protected/store-info", {
      logo_main: data.rectLogoUrl,
      logo_sub: data.circleLogoUrl,
      title: data.storeName,
    }),
  );
  return mapRawToStoreInfo(raw);
};
