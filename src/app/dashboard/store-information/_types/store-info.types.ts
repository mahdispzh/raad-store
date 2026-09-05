// ---------- تایپ خام دیتابیس ----------
export interface StoreInformationRaw {
  id: number;
  phone_primary: string | null;
  phone_secondary: string | null;
  office_phone: string | null;
  address: string | null;
  map: string | null;
  mail: string | null;
  telegram: string | null;
  whatsapp: string | null;
  instagram: string | null;
  bale: string | null;
  eita: string | null;
  rubika: string | null;
  logo_main: string | null;
  logo_sub: string | null;
  logo_fav: string | null;
  title: string | null;
  description: string | null;
}

// ---------- تایپ‌های فرانت (بدون تغییر) ----------
export interface LogoInfo {
  rectLogoUrl: string;
  circleLogoUrl: string;
  storeName: string;
}

export interface GeneralInfo {
  storeName: string;
  description: string;
}

export interface AddressInfo {
  address: string;
  companyAddressUrl: string;
}

export interface ContactInfo {
  mobile: string;
  phone: string;
  email: string;
}

export interface SocialInfo {
  bale: string;
  eitaa: string;
  rubika: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
}

export interface StoreInfoData {
  logo: LogoInfo;
  general: GeneralInfo;
  address: AddressInfo;
  contact: ContactInfo;
  social: SocialInfo;
}

// ---------- Payloadها (بدون تغییر) ----------
export type UpdateGeneralPayload = GeneralInfo;
export type UpdateAddressPayload = AddressInfo;
export type UpdateContactPayload = ContactInfo;
export type UpdateSocialPayload = SocialInfo;
export type UpdateLogoPayload = {
  rectLogoUrl: string;
  circleLogoUrl: string;
  storeName: string;
};
