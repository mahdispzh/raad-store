"use client";

import { Subtitle, Text } from "@/src/shared/ui";
import Image from "next/image";
import { ReactNode } from "react";

type StatusPageProps = {
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  description: string;
  children?: ReactNode;
};

export function StatusPage({
  image,
  imageWidth = 300,
  imageHeight = 225,
  title,
  description,
  children,
}: StatusPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src={image}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        className="h-auto w-[450px] object-cover transition-transform hover:scale-105"
      />

      <div className="flex w-[350px] flex-col items-center gap-6">
        <Subtitle text={title} size="xl" weight="medium" />

        <Text text={description} size="md" weight="regular" />

        <div className="flex w-full gap-2">{children}</div>
      </div>
    </div>
  );
}
