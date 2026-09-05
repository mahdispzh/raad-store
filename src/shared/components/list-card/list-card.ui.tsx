"use client";

import Image from "next/image";

import { DropleftArrowIcon } from "../../constants/icons";
import { EmptyImage, Subtitle, Text } from "../../ui";
import { StyledButton } from "../../ui/styled-button/styled-button.ui";

import { useListCard } from "./useListCard";
import type { ListCardProps } from "./list-card.types";

export function ListCard({ icon, title, items, unit,  onButtonClick, }: ListCardProps) {
  const { hasItems } = useListCard(items);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-accent/50 p-[1.2vw]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-[0.6vw]">
          <div className="flex h-[2.3vw] w-[2.3vw] flex-shrink-0 items-center justify-center rounded-full bg-secondary/20">
            {icon}
          </div>
          <Text text={title} size="lg" color="secondary" weight="regular" />
        </div>

        <div className="flex h-[2vw] w-[2vw] flex-shrink-0 items-center justify-center rounded-full border border-secondary">
   {onButtonClick && (
          <StyledButton
            variant="icon"
            type="primary"
              action={onButtonClick}
            icon={<DropleftArrowIcon size="xs" color="text-secondary" />}
          />
   )}
        </div>
      </div>

      {/* Items */}
    {/* Items */}
{hasItems && (
<div
  className="mt-[1.2vw] grid gap-[0.8vw] overflow-y-auto scrollbar-hide"
  style={{ maxHeight: "calc(3 * 7vw + 2 * 0.8vw)" }}
>    {items.map((item) => (
      <div
        key={item.id}
        className="flex min-w-0 items-center gap-[0.8vw] rounded-sm bg-white p-[0.5vw]"
      >
       <div className="relative h-[6vw] w-[4.9vw] flex-shrink-0 overflow-hidden rounded-sm">
{item.image ? (    <Image
      src={item.image}
      alt={item.name}
      fill
      className="object-contain"
    />
  ) : (
    <EmptyImage />
  )}
</div>

        <div className="flex min-w-0 flex-1 flex-col">
          <Subtitle
            text={`${item.count} ${unit}`}
            size="xl"
            color="secondary"
            weight="bold"
          />
          <div className="truncate">
            <Text
              text={item.name}
              size="sm"
              color="secondary"
              weight="light"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}