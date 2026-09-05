"use client";

import { PencilIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import Image from "next/image";
import { useRef } from "react";

interface StoreLogoUploadProps {
  logo: {
    rectLogoUrl: string;
    circleLogoUrl: string;
    storeName: string;
  };
  onLogoChange: (rect: string, circle: string) => void;
}

export function StoreLogoUpload({ logo, onLogoChange }: StoreLogoUploadProps) {
  const rectInputRef = useRef<HTMLInputElement>(null);
  const circleInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "rect" | "circle",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "rect") {
      onLogoChange(url, logo.circleLogoUrl);
    } else {
      onLogoChange(logo.rectLogoUrl, url);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-[1vw] rounded-md bg-accent/50 p-[1.5vw]">
      {/* لوگوی مستطیلی */}
      <div className="relative h-[6vw] w-[12vw]">
        <div className="relative h-full w-full overflow-hidden rounded-[0.6vw] shadow-sm">
          <Image
            src={logo.rectLogoUrl}
            alt="Rect Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <button
          type="button"
          onClick={() => rectInputRef.current?.click()}
          className="absolute -right-[0.4vw] -bottom-[0.4vw] flex h-[1.8vw] w-[1.8vw] cursor-pointer items-center justify-center rounded-full border border-white bg-secondary shadow-md transition-transform hover:scale-105"
        >
          <PencilIcon size="xs" color="text-white" />
        </button>
        <input
          ref={rectInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "rect")}
          className="hidden"
        />
      </div>

      {/* لوگوی دایره‌ای */}
      <div className="relative h-[4vw] w-[4vw]">
        <div className="relative h-full w-full overflow-hidden rounded-full shadow-md">
          <Image
            src={logo.circleLogoUrl}
            alt="Circle Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <button
          type="button"
          onClick={() => circleInputRef.current?.click()}
          className="absolute -right-[0.2vw] -bottom-[0.2vw] flex h-[1.4vw] w-[1.4vw] cursor-pointer items-center justify-center rounded-full border border-white bg-secondary shadow-md transition-transform hover:scale-105"
        >
          <PencilIcon size="xs" color="text-white" />
        </button>
        <input
          ref={circleInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "circle")}
          className="hidden"
        />
      </div>

      <Text text={logo.storeName} size="md" color="primary" weight="medium" />
    </div>
  );
}
