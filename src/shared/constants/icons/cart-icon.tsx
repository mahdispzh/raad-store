import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function CartIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 17"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8348 15.5991C14.7155 15.5991 15.4294 14.8555 15.4294 13.9382C15.4294 13.0209 14.7155 12.2773 13.8348 12.2773C12.9541 12.2773 12.2402 13.0209 12.2402 13.9382C12.2402 14.8555 12.9541 15.5991 13.8348 15.5991Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.86214 15.5991C6.74279 15.5991 7.4567 14.8555 7.4567 13.9382C7.4567 13.0209 6.74279 12.2773 5.86214 12.2773C4.98149 12.2773 4.26758 13.0209 4.26758 13.9382C4.26758 14.8555 4.98149 15.5991 5.86214 15.5991Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.599609 0.643533C0.599609 0.643533 4.299 0.593706 3.78874 3.96531L3.23866 7.33693C3.15708 7.74119 3.16509 8.15949 3.26216 8.56009C3.35923 8.96061 3.54279 9.33282 3.7988 9.64839C4.05483 9.96387 4.37659 10.2143 4.7396 10.3808C5.1026 10.5473 5.49726 10.6252 5.89357 10.6089H12.2718C13.1551 10.5816 14.0034 10.2432 14.6782 9.64889C15.353 9.05462 15.8144 8.23954 15.9871 7.33693L16.5373 3.92379C16.6244 3.51498 16.6201 3.09078 16.5248 2.68396C16.4295 2.27714 16.2456 1.89857 15.9875 1.57753C15.7294 1.25648 15.4038 1.00154 15.0361 0.832392C14.6683 0.663247 14.268 0.584438 13.8664 0.602019H6.93002"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}