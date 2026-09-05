"use client";

import { PencilIcon } from "@/src/shared/constants/icons";
import Image from "next/image";
import { useState } from "react";
import { AVATAR_OPTIONS, DEFAULT_AVATAR } from "../_constants/avatars";

interface AvatarPickerProps {
  imageId: number;
  onSelect: (id: number) => void;
  isSaving?: boolean | undefined;
}

export function AvatarPicker({
  imageId,
  onSelect,
  isSaving = false,
}: AvatarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentSrc =
    AVATAR_OPTIONS.find((a) => a.id === imageId)?.src || DEFAULT_AVATAR;

  const handleSelect = (id: number) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative h-[9vw] w-[9vw]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-white/60">
          <Image
            src={currentSrc}
            alt="Avatar"
            fill
            className="object-cover"
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={isSaving}
          className="absolute -bottom-[0.3vw] -left-[0.3vw] flex h-[1.8vw] w-[1.8vw] cursor-pointer items-center justify-center rounded-full border border-white bg-secondary shadow-md transition-transform hover:scale-105 disabled:opacity-50"
        >
          <PencilIcon size="xs" color="text-white" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full z-10 mt-2 flex w-max flex-wrap gap-2 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
          {AVATAR_OPTIONS.map((avatar) => (
            <button
              key={avatar.id}
              type="button"
              onClick={() => handleSelect(avatar.id)}
              className={`relative h-12 w-12 overflow-hidden rounded-full border-2 transition ${
                avatar.id === imageId
                  ? "border-secondary"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={avatar.src}
                alt={`Avatar ${avatar.id}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
