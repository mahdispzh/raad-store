"use client";

import {
  EditPanelIcon,
  ErrorIcon,
  SuccessOutlineIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
  editing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function SectionHeader({
  title,
  icon,
  editing,
  onEditToggle,
  onSave,
  onCancel,
}: SectionHeaderProps) {
  return (
    <div className="mb-[1vw] flex items-center justify-between border-b border-gray-200 pb-[0.75vw]">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
          {icon}
        </div>
        <Text text={title} size="lg" color="secondary" weight="regular" />
      </div>

      {editing ? (
        <div className="flex items-center gap-3">
          <button onClick={onSave} className="cursor-pointer transition-colors">
            <SuccessOutlineIcon size="sm" color="text-success" />
          </button>
          <button
            onClick={onCancel}
            className="cursor-pointer transition-colors"
          >
            <ErrorIcon size="sm" color="text-danger" />
          </button>
        </div>
      ) : (
        <button
          onClick={onEditToggle}
          className="cursor-pointer transition-colors"
        >
          <EditPanelIcon size="xs" color="text-secondary" />
        </button>
      )}
    </div>
  );
}
