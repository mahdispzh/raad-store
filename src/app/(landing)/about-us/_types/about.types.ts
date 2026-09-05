// src/app/(landing)/about-us/_types/about.types.ts
export interface ContactInfo {
  title: string;
  phoneNumbers: string;
  address: string;
  email: string;
  map: string;
}

export interface AboutContent {
  title: string;
  description1: string;
  description2: string;
}

export interface SocialLinks {
  telegram: string;
  whatsapp: string;
  instagram: string;
  eita: string;
  bale: string;
  rubika: string;
}

export interface AboutData {
  contactUs: ContactInfo;
  aboutUs: AboutContent;
  socialMedia: SocialLinks;
}

export interface StoreInformation {
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
}

export interface AboutApiResponse {
  data: StoreInformation | undefined;
}
