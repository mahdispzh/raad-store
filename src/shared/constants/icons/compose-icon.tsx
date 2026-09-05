import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ComposeIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M23.0608 6.25728L12.1449 17.4356C11.0578 18.5488 7.83109 19.0644 7.11023 18.3262C6.38937 17.588 6.88139 14.2837 7.9684 13.1705L18.8958 1.98039C19.1653 1.67932 19.4915 1.43731 19.8549 1.26893C20.2182 1.10055 20.6111 1.00927 21.0099 1.00067C21.4085 0.99208 21.8049 1.0663 22.1748 1.21887C22.5447 1.37144 22.8807 1.59923 23.1623 1.88842C23.4439 2.1776 23.6654 2.52221 23.8133 2.90146C23.9613 3.28071 24.0328 3.68672 24.0233 4.09502C24.0138 4.50331 23.9235 4.90544 23.7582 5.27706C23.5927 5.64868 23.3555 5.98214 23.0608 6.25728Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.298 3.44514H5.5769C4.36303 3.44514 3.19895 3.93894 2.34061 4.81792C1.48228 5.6969 1 6.88905 1 8.13211V19.8495C1 21.0926 1.48228 22.2848 2.34061 23.1637C3.19895 24.0427 4.36303 24.5365 5.5769 24.5365H18.1634C20.6921 24.5365 21.5961 22.4274 21.5961 19.8495V13.9908"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
