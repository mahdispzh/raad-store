import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function EditPanelIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M19.7281 5.46317L10.461 14.953C9.53817 15.898 6.79882 16.3357 6.18685 15.709C5.57487 15.0824 5.99257 12.2772 6.91539 11.3321L16.1922 1.8323C16.421 1.57671 16.6979 1.37125 17.0064 1.22831C17.3148 1.08536 17.6484 1.00787 17.9869 1.00057C18.3254 0.993276 18.6619 1.05628 18.9759 1.18581C19.29 1.31534 19.5752 1.50872 19.8142 1.75422C20.0533 1.99972 20.2413 2.29228 20.3669 2.61424C20.4925 2.93621 20.5533 3.28089 20.5452 3.62751C20.5371 3.97414 20.4605 4.31552 20.3201 4.63101C20.1797 4.94649 19.9783 5.22959 19.7281 5.46317Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.74252 3.07568H4.88556C3.85504 3.07568 2.8668 3.49489 2.13811 4.2411C1.40943 4.98732 1 5.99938 1 7.05468V17.0022C1 18.0575 1.40943 19.0696 2.13811 19.8157C2.8668 20.562 3.85504 20.9812 4.88556 20.9812H15.5709C17.7176 20.9812 18.485 19.1906 18.485 17.0022V12.0284"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
