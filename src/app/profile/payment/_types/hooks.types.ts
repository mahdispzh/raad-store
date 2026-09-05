// src/app/profile/payment/_types/hooks.types.ts

import { Address } from "./address.types";
import { GatewayType, ShippingMethodType } from "./common.types";

export interface UsePaymentReturn {
  // State
  step: "order-summary" | "shipping-method" | "payment-method" | "success"; // ⬅️ payment-gateway حذف شد
  selectedShipping: ShippingMethodType;
  selectedGateway: GatewayType;
  shippingCost: number;
  totalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountError: string;
  address: string;
  data: {
    productCount: number;
    totalProductPrice: number;
    productPrice: number;
    regularShippingCost: number;
    expressShippingCost: number;
    address: string;
  };
  isDiscountOpen: boolean;
  discountCodeInput: string;
  
  // Address Modal
  isAddressModalOpen: boolean;
  selectedAddressId: string | number | null;
  addresses: Address[];
  isLoadingAddresses: boolean;
  
  // Payment Processing
  isProcessingPayment: boolean;
  
  // Cart Actions
  products: any[];
  handleProductIncrease: (id: number) => void;
  handleProductDecrease: (id: number) => void;
  handleProductRemove: (id: number) => void;
  
  // Navigation Actions
  goToNextStep: () => void;
  goToPrevStep: () => void;
  
  // Shipping Actions
  selectShipping: (method: ShippingMethodType) => void;
  
  // Payment Actions
  selectGateway: (gateway: GatewayType) => void;
  applyDiscount: (code: string) => boolean;
  toggleDiscount: () => void;
  setDiscountCodeInput: (value: string) => void;
  startPayment: () => void;
  
  // Address Actions
  setAddress: (address: string) => void;
  openAddressModal: () => void;
  closeAddressModal: () => void;
  setSelectedAddressId: (id: string | number | null) => void;
  confirmAddressSelection: () => void;
}