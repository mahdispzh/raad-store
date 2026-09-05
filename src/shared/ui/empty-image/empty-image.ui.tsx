"use client";

import { Text } from "@/src/shared/ui";
import { ImageOffIcon } from "../../constants/icons/image-off-icon";

export function EmptyImage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 text-gray-400">
      <ImageOffIcon size="2xl" color="text-accent" />
      <Text text="تصویر موجود نیست" size="sm" color="secondary" />
    </div>
  );
}
