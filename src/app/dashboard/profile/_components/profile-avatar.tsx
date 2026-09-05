"use client";

import { Text } from "@/src/shared/ui";
import { AvatarPicker } from "./avatar-picker";

interface ProfileAvatarProps {
  name: string;
  imageId: number;
  onAvatarChange: (id: number) => void;
  isSaving?: boolean;
}

export function ProfileAvatar({
  name,
  imageId,
  onAvatarChange,
  isSaving,
}: ProfileAvatarProps) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-[1vw] rounded-md bg-accent/50 p-[1.5vw]">
      <AvatarPicker
        imageId={imageId}
        onSelect={onAvatarChange}
        isSaving={isSaving}
      />
      <Text text={name} size="md" color="primary" weight="medium" />
    </div>
  );
}
