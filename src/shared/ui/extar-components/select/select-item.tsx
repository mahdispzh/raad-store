//آیتم‌های لیست

import React from "react";
import { SelectOption } from "./select.types";

interface Props {
  item: SelectOption;
  onClick: (id: number) => void;
}

export const SelectItem: React.FC<Props> = ({ item, onClick }) => {
  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick(item.id)}
    >
      {item.name}
    </div>
  );
};
