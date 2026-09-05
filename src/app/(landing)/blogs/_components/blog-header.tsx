"use client";

import { Subtitle } from "@/src/shared/ui";

import { SaveEmptyIcon, SaveFilledIcon } from "@/src/shared/constants/icons";
import { ShareButton } from "@/src/shared/ui/share-button/share-button";

type BlogHeaderProps = {
  title: string;
  saved: boolean;
  onToggleSave: () => void;
};

export function BlogHeader({ title, saved, onToggleSave }: BlogHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <Subtitle color="secondary" size="xl" text={title} weight="bold" />

      <div className="flex items-center justify-center gap-3">
        <ShareButton />

        <button
          type="button"
          className="cursor-pointer hover:opacity-70"
          onClick={onToggleSave}
        >
          {saved ? (
            <SaveFilledIcon size="md" color="text-secondary" />
          ) : (
            <SaveEmptyIcon size="md" color="text-secondary" />
          )}
        </button>
      </div>
    </div>
  );
}
