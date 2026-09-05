import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function PhoneCallIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 23 23"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M12.1953 1.0835C12.1953 1.0835 14.6397 1.30571 17.7508 4.41676C20.8619 7.52781 21.0841 9.97221 21.0841 9.97221"
        stroke="currentColor"
        strokeWidth="2.16667"
        strokeLinecap="round"
      />
      <path
        d="M12.4258 5.01221C12.4258 5.01221 13.5258 5.32648 15.1756 6.97636C16.8255 8.62625 17.1398 9.72617 17.1398 9.72617"
        stroke="currentColor"
        strokeWidth="2.16667"
        strokeLinecap="round"
      />
      <path
        d="M7.79236 4.76854L8.51346 6.06065C9.16423 7.22672 8.90302 8.7564 7.87803 9.78136C7.87803 9.78136 6.63491 11.0247 8.8889 13.2787C11.1422 15.532 12.3863 14.2896 12.3863 14.2896C13.4113 13.2646 14.941 13.0034 16.1071 13.6542L17.3991 14.3753C19.16 15.3579 19.3679 17.8272 17.8203 19.375C16.8903 20.3049 15.7509 21.0286 14.4915 21.0763C12.3714 21.1567 8.77091 20.6201 5.15917 17.0084C1.54746 13.3967 1.01089 9.79627 1.09126 7.67617C1.13901 6.41676 1.86265 5.27748 2.79265 4.3475C4.34035 2.79981 6.80967 3.00776 7.79236 4.76854Z"
        stroke="currentColor"
        strokeWidth="2.16667"
        strokeLinecap="round"
      />
    </svg>
  );
}
