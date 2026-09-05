import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function RecycleBinIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      viewBox="0 0 20 22"
      fill="none"
    >
      <path
        d="M7.47656 10.9468V16.4736"
        stroke="currentColor" // ✅ تغییر به currentColor
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.793 10.9468V16.4736"
        stroke="currentColor" // ✅ تغییر به currentColor
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 5.4209H18.2692"
        stroke="currentColor" // ✅ تغییر به currentColor
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.1582 8.73633V17.5786C3.1582 19.4099 4.6079 20.8944 6.39617 20.8944H12.8721C14.6604 20.8944 16.1101 19.4099 16.1101 17.5786V8.73633"
        stroke="currentColor" // ✅ تغییر به currentColor
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.39648 3.21074C6.39648 1.98978 7.36286 1 8.55495 1H10.7134C11.9055 1 12.8719 1.98978 12.8719 3.21074V5.42149H6.39648V3.21074Z"
        stroke="currentColor" // ✅ قبلاً هم currentColor بود
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}