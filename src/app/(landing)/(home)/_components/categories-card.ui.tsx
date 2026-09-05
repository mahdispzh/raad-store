"use client";

import { Subtitle } from "@/src/shared/ui";
import { EmptyImage } from "@/src/shared/ui/empty-image/empty-image.ui";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  IMAGE_CONTAINER_CLASS,
  IMAGE_CLASS,
} from "../_constants/landing.constants";

// ✅ image رو optional کن
interface CategoryCardProps {
  name: string;
  image?: string | undefined;  // اضافه کردن undefined
  href?: string;
}

export function CategoryCard({ name, image, href = "#" }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  const isValidImageUrl = (url: string | undefined): boolean => {
    if (!url || typeof url !== "string") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith("/") || url.startsWith("http");
    }
  };

  const hasValidImage = isValidImageUrl(image) && !imageError;

  return (
    <div className="group flex  flex-col items-center gap-4">
      <Link href={href} className="block cursor-pointer">
        <div className={IMAGE_CONTAINER_CLASS}>
          {!hasValidImage ? (
            <EmptyImage />
          ) : (
            <Image
              src={image!}
              alt={name}
              fill
              className={IMAGE_CLASS}
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </div>
        <div className="flex  justify-center">
      <Subtitle text={name} />

        </div>
            </Link>

    </div>
  );
}