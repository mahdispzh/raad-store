"use client";

import { NewIcon } from "../../constants/icons/new-icon";
import { SolidStarIcon } from "../../constants/icons/solid-star-icon";
import { Caption } from "../caption/caption.ui";
import { Text } from "../text/text.ui";
import type { BadgeProps } from "./badge.types";

export function Badge({
  type = "new",
  label = "",
  number,
  rating,
  iconSize = "sm",
  iconColor = "text-danger",
}: BadgeProps) {
  // NEW
  if (type === "new") {
    return (
      <div className="inline-flex items-center justify-center">
        <NewIcon size={iconSize} color={iconColor} />
      </div>
    );
  }

  // NUMBER
  if (type === "number") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-danger">
        <span className="mt-1 leading-none">
          <Text
            text={number && number > 99 ? "99+" : `${number || 0}`}
            size="sm"
            weight="light"
            color="white"
          />
        </span>
      </div>
    );
  }

  // COUNTER
  if (type === "counter") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
        <span className="mt-1 leading-none">
          <Text
            text={number && number > 99 ? "99+" : `${number || 0}`}
            size="sm"
            weight="light"
            color="white"
          />
        </span>
      </div>
    );
  }

  // MESSAGES
  if (type === "messages") {
    return (
      <div className="absolute -top-1 -right-2 flex h-[0.7vw] w-[0.7vw] items-center justify-center rounded-full bg-danger text-xs text-white">
        {number || 0}
      </div>
    );
  }

  // RATING
  if (type === "rating") {
    return (
      <div className="inline-flex items-center gap-1">
        <div className="pt-1">
          <Text
            text={Number(rating).toFixed(1)}
            size="sm"
            color="primary"
            weight="bold"
          />
        </div>

        <SolidStarIcon size="xs" color="text-danger" />
      </div>
    );
  }
  // DISCOUNT
  return (
    <div className="inline-flex h-4 items-center justify-center rounded-full bg-danger px-2 font-bold text-xs whitespace-nowrap text-white">
      <Caption text={label || "10%"} size="xs" color="white" weight="medium" />
    </div>
  );
}
