import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function RulerIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M1.24783 7.70462C0.639087 7.09591 0.334717 6.79154 0.334717 6.41328C0.334717 6.03506 0.639087 5.73069 1.24783 5.12194L5.12182 1.24795C5.73057 0.639209 6.03494 0.334839 6.41315 0.334839C6.79141 0.334839 7.09579 0.639209 7.70449 1.24795L8.35016 1.89362C8.95891 2.50236 9.26329 2.80673 9.26329 3.18496C9.26329 3.56318 8.95891 3.86755 8.35016 4.47631L4.47619 8.35029C3.86743 8.95904 3.56306 9.26341 3.18483 9.26341C2.80661 9.26341 2.50224 8.95904 1.8935 8.35029L1.24783 7.70462Z"
        stroke="#595757"
        strokeWidth="0.669643"
      />
      <path
        d="M3.2207 3.22076L3.85205 3.85211"
        stroke="#595757"
        strokeWidth="0.669643"
        strokeLinecap="round"
      />
      <path
        d="M5.1145 1.32672L5.74584 1.95807"
        stroke="#595757"
        strokeWidth="0.669643"
        strokeLinecap="round"
      />
      <path
        d="M1.32642 5.11487L1.95776 5.74621"
        stroke="#595757"
        strokeWidth="0.669643"
        strokeLinecap="round"
      />
      <path
        d="M2.27368 4.16785L3.2207 5.11486"
        stroke="#595757"
        strokeWidth="0.669643"
        strokeLinecap="round"
      />
      <path
        d="M4.16772 2.27368L5.11478 3.2207"
        stroke="#595757"
        strokeWidth="0.669643"
        strokeLinecap="round"
      />
    </svg>
  );
}
