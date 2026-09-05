// src/app/profile/payment/_types/address.types.ts




export interface AddressItemProps {
  title: string;
  addressText: string;
  isSelected: boolean;
  onSelect: () => void;
}



export interface SummaryAddressSelectorProps {
  address: string;
  onOpenModal: () => void;
}// src/app/profile/addresses/_types/address.types.ts

export interface AddressFormData {
  title: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiverName: string;
  receiverPhone: string;
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

export interface SuccessResponse {
  success: boolean;
  message?: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}
export interface Address {
  id: number;
  title: string;
  fullAddress: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
}

export interface AddressItemProps {
  title: string;
  addressText: string;
  isSelected: boolean;
  onSelect: () => void;
}

export interface AddressSelectionModalContentProps {
  addresses: Address[];
  selectedAddressId: number | null; // ✅ فقط number باشد
  onSelectAddressId: (id: number) => void; // ✅ فقط number باشد
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export interface SummaryAddressSelectorProps {
  address: string;
  onOpenModal: () => void;
}