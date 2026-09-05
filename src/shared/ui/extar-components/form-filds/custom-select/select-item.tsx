import React from "react";
import { SelectOption } from "./select.types";
import { ITEM_SIZE_CLASSES } from "./select.constants";

export const SelectItem: React.FC<{
  item: SelectOption;
  onClick: (value: SelectOption["value"]) => void;
  size?: keyof typeof ITEM_SIZE_CLASSES;
}> = ({ item, onClick, size = "md" }) => {
  return (
    <div
      className={`px-3 flex items-center hover:bg-gray-100 cursor-pointer ${ITEM_SIZE_CLASSES[size]}`}
      onClick={() => onClick(item.value)}
    >
      {item.label}
    </div>
  );
};
