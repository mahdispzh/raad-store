// select-item.tsx
"use client";

import React from "react";
import { SelectOption } from "./select.types";
import { ITEM_SIZE_CLASSES } from "./select.constants";

interface Props {
  item: SelectOption;
  onClick: (value: SelectOption["value"]) => void;
  size?: keyof typeof ITEM_SIZE_CLASSES;
  isSelected?: boolean;
}

export const SelectItem: React.FC<Props> = ({ 
  item, 
  onClick, 
  size = "md",
  isSelected = false 
}) => {
  return (
    <div
      className={`px-3 flex items-center cursor-pointer transition-colors ${
        isSelected ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
      } ${ITEM_SIZE_CLASSES[size]}`}
      onClick={() => onClick(item.value)}
    >
      <span className="flex-1">{item.label}</span>
      {isSelected && (
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
};