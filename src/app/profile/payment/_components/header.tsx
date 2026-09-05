import { RightArrowIcon } from "@/src/shared/constants/icons/right-arrow-icon";
import Image from "next/image";
interface HeaderWithArrowProps {
  onArrowClick?: () => void;
  className?: string;
}

export function Header({ onArrowClick, className = "" }: HeaderWithArrowProps) {
  return (
    <div
      className={`flex w-full items-center rounded-sm border border-gray px-4 py-4 lg:px-6 ${className}`}
    >
      <div onClick={onArrowClick} className="cursor-pointer">
        <RightArrowIcon />
      </div>
      <div className="flex w-full justify-center">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={0}
          height={0}
          className="h-7 w-auto lg:h-12"
        />
      </div>
    </div>
  );
}
