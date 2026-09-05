export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface FinancialInfo {
  bankName: string;
  accountNumber: string;
  cardNumber: string;
  shebaNumber: string;
}

export interface ProfileData {
  personal: PersonalInfo;
  financial: FinancialInfo;
  avatar?: string;
  created_at: string | null;
}

export interface UpdatePersonalPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface UpdateFinancialPayload {
  bankName: string;
  accountNumber: string;
  cardNumber: string;
  shebaNumber: string;
}

export interface ProfileData {
  id: number;
  name: string | null;
  phone: string | null;
  mail: string | null;
  role: number;
  card_number: string | null;
  account_number: string | null;
  sheba_number: string | null;
  bank_id: number | null;
  image_id: number;
}

export interface UpdateProfilePayload {
  name?: string | undefined;
  phone?: string | undefined;
  mail?: string | undefined;
  card_number?: string | undefined;
  account_number?: string | undefined;
  sheba_number?: string | undefined;
  bank_id?: number | undefined;
  image_id?: number | undefined;
}
