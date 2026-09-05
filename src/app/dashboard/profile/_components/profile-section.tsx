"use client";

import { ReactNode } from "react";
import { SectionHeader } from "./section-header";

interface ProfileSectionProps {
  title: string;
  editing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: ReactNode;
  className?: string;
}

export function ProfileSection({
  title,
  editing,
  onEditToggle,
  onSave,
  onCancel,
  children,
  className = "",
}: ProfileSectionProps) {
  return (
    <div className={`w-full rounded-md bg-accent/50 p-[1.5vw] ${className}`}>
      <SectionHeader
        title={title}
        editing={editing}
        onEditToggle={onEditToggle}
        onSave={onSave}
        onCancel={onCancel}
      />
      {children}
    </div>
  );
}
