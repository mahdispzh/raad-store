import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ShopIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 17"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.617064 5.56922L1.0454 11.3385C1.19349 13.7136 3.1295 15.5717 5.48528 15.5996H11.7128C14.069 15.5723 16.0057 13.7141 16.1538 11.3385L16.5822 5.56922C16.6925 4.30378 16.2763 3.04906 15.4335 2.10621C14.5907 1.16336 13.3974 0.617482 12.14 0.599609H5.05809C3.80085 0.617806 2.60785 1.16382 1.76531 2.10662C0.922785 3.04944 0.506758 4.30397 0.617064 5.56922Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0273 5.21484C12.0273 6.45154 11.3741 7.5943 10.3139 8.21265C9.25367 8.831 7.94741 8.831 6.88719 8.21265C5.82696 7.5943 5.17383 6.45154 5.17383 5.21484"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}