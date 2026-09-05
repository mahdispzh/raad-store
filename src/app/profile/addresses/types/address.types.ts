// types/address.types.ts
export interface Address {
  id: number;
  title: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  receiver_name: string;
  receiver_phone: string;
  default: boolean;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
}
export interface AddressFormData {
  title: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  pelak?: string;
  unit?: string;
  default?: boolean; 
  receiverName?: string;
  receiverPhone?: string;
}

export interface AddressesResponse {
  data: Address[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

// ✅ مطابق با ساختار API /api/protected/users/[userId]
export interface UserData {
  id: number;
  name: string | null;
  phone: string | null;
  mail: string | null;
  role: number;
  recently_search: string[] | null;
  recently_view: number[] | null;
  created_at: string;
  updated_at: string;
  carts: any[];
  orders: any[];
  user_addresses: Address[];
}
