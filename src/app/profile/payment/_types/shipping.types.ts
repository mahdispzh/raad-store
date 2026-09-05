// src/app/profile/payment/_types/shipping.types.ts

import type { ShippingMethodType } from "./common.types";

export interface ShippingMethodProps {
  productCount: number;
  totalProductPrice: number;
  regularShippingCost: number;
  expressShippingCost: number;
  selectedShipping: ShippingMethodType;
  onSelectShipping: (method: ShippingMethodType) => void;
  onConfirm: () => void;
}

export interface ShippingOptionsProps {
  regularCost: number;
  expressCost: number;
  selected: ShippingMethodType;
  onSelect: (method: ShippingMethodType) => void;
}

export interface ShippingSummaryProps {
  productPrice: number;
  shippingPrice: number;
  totalPrice: number;
  onConfirm: () => void;
  count: number;
}