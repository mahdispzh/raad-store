"use client";

import { Subtitle, Text } from "../../ui";
import type { SummaryCardProps } from "./summary-card.types";

export function SummaryCard({ title, titleIcon, items }: SummaryCardProps) {
  return (
    <div className="relative w-full ">
      <div className="relative aspect-[871/140] w-full">
        <svg
          className="h-full w-full"
          viewBox="0 0 871 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M16 0H703.5C708.141 0 712.593 1.84374 715.874 5.12563C719.156 8.40752 721 12.8587 721 17.5C721 22.1413 722.844 26.5925 726.126 29.8744C729.407 33.1563 733.859 35 738.5 35H853.5C858.141 35 862.593 36.8437 865.874 40.1256C869.156 43.4075 871 47.8587 871 52.5V124C871 128.243 869.314 132.313 866.314 135.314C863.313 138.314 859.243 140 855 140H16C11.7565 140 7.68687 138.314 4.68629 135.314C1.68571 132.313 0 128.243 0 124V16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0Z"
            fill="#E8E5E5"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col p-4">
<div className="-mt-2 mb-4 flex items-center gap-2">            {titleIcon ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full">
                {titleIcon}
              </div>
            ) : null}
            <Subtitle text={title} color="secondary" size="xl" weight="regular" />
            
          </div>

          <div className="flex flex-1 items-center justify-between px-2">
            {items.map((item, index) => (
              <div key={item.id ?? index} className="flex flex-col items-center gap-1">
                <Subtitle text={String(item.value)} size="3xl" color="secondary" weight="bold" />
                <div className="flex items-center gap-1">
                  {item.icon}
                  <Text text={item.label} size="md" color="secondary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}