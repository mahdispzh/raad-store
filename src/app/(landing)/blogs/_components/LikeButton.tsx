"use client";

import { useState } from "react";

import { LikedButtonIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";

type LikeButtonProps = {
  initialLikes: number;
};

export function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
      return;
    }

    setLikes((prev) => prev + 1);
    setIsLiked(true);
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleLike}
        className={`flex cursor-pointer items-center gap-2 rounded-md border border-secondary/10 bg-accent px-4 py-1 shadow-sm transition-all duration-200 ${
          isLiked ? "bg-primary/10" : "hover:bg-primary/5"
        }`}
      >
        <Text
          text={String(likes)}
          size="lg"
          weight="medium"
          color={isLiked ? "primary" : "secondary"}
        />
        <LikedButtonIcon
          size={"md"}
          color={isLiked ? "text-primary" : "text-secondary"}
        />
      </button>
    </div>
  );
}
