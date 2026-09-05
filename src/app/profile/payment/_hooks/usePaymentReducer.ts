// src/app/profile/payment/_hooks/usePaymentReducer.ts

import { useReducer } from "react";
import { PaymentState, PaymentAction } from "../_types/payment.types";
import { STEPS } from "../_constants/payment.data";
import { Order } from "../_types/order.types";

const initialState: PaymentState = {
  step: "order-summary",
  selectedShipping: "regular",
 selectedGateway: "zarinpal",
   orderId: null,
  orderData: null,
  refId: null,

  isProcessing: false,
  discount: {
    code: "",
    amount: 0,
    error: null,
    isOpen: false,
  },
  paymentStatus: "unknown",
  isVerifying: false,
};

function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };

    case "NEXT_STEP": {
      const currentIndex = STEPS.indexOf(state.step);
      const nextStep = STEPS[currentIndex + 1];
      return nextStep ? { ...state, step: nextStep } : state;
    }

    case "PREV_STEP": {
      const currentIndex = STEPS.indexOf(state.step);
      const prevStep = STEPS[currentIndex - 1];
      return prevStep ? { ...state, step: prevStep } : state;
    }

    case "SET_SHIPPING":
      return { ...state, selectedShipping: action.payload };

    case "SET_GATEWAY":
      return { ...state, selectedGateway: action.payload };

    case "SET_ORDER":
      return {
        ...state,
        orderId: action.payload.orderId,
        orderData: action.payload.orderData,
      };

    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload };

    case "SET_DISCOUNT_CODE":
      return {
        ...state,
        discount: { ...state.discount, code: action.payload },
      };

    case "SET_DISCOUNT_AMOUNT":
      return {
        ...state,
        discount: { ...state.discount, amount: action.payload },
      };

    case "SET_DISCOUNT_ERROR":
      return {
        ...state,
        discount: { ...state.discount, error: action.payload },
      };

    case "TOGGLE_DISCOUNT":
      return {
        ...state,
        discount: {
          ...state.discount,
          isOpen: !state.discount.isOpen,
          error: state.discount.isOpen ? null : state.discount.error,
        },
      };

    case "RESET_DISCOUNT":
      return {
        ...state,
        discount: {
          code: "",
          amount: 0,
          error: null,
          isOpen: false,
        },
      };
case "SET_REF_ID":
  return { ...state, refId: action.payload };
    case "SET_PAYMENT_STATUS":
      return { ...state, paymentStatus: action.payload };

    case "SET_VERIFYING":
      return { ...state, isVerifying: action.payload };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function usePaymentReducer() {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  return {
    
    state,
    dispatch,
    // Action Creators
    setStep: (step: PaymentState["step"]) => dispatch({ type: "SET_STEP", payload: step }),
    nextStep: () => dispatch({ type: "NEXT_STEP" }),
    prevStep: () => dispatch({ type: "PREV_STEP" }),
    setShipping: (method: PaymentState["selectedShipping"]) =>
      dispatch({ type: "SET_SHIPPING", payload: method }),
    setGateway: (gateway: PaymentState["selectedGateway"]) =>
      dispatch({ type: "SET_GATEWAY", payload: gateway }),
    setOrder: (orderId: number, orderData: Order) =>
      dispatch({ type: "SET_ORDER", payload: { orderId, orderData } }),
    setProcessing: (isProcessing: boolean) =>
      dispatch({ type: "SET_PROCESSING", payload: isProcessing }),
    setDiscountCode: (code: string) =>
      dispatch({ type: "SET_DISCOUNT_CODE", payload: code }),
    setDiscountAmount: (amount: number) =>
      dispatch({ type: "SET_DISCOUNT_AMOUNT", payload: amount }),
    setDiscountError: (error: string | null) =>
      dispatch({ type: "SET_DISCOUNT_ERROR", payload: error }),
    toggleDiscount: () => dispatch({ type: "TOGGLE_DISCOUNT" }),
    resetDiscount: () => dispatch({ type: "RESET_DISCOUNT" }),
  setPaymentStatus: (status: PaymentState["paymentStatus"]) =>
  dispatch({ type: "SET_PAYMENT_STATUS", payload: status }),
    setVerifying: (isVerifying: boolean) =>
      dispatch({ type: "SET_VERIFYING", payload: isVerifying }),
    reset: () => dispatch({ type: "RESET" }),
    setRefId: (refId: number | null) =>
  dispatch({ type: "SET_REF_ID", payload: refId }),
  };
}