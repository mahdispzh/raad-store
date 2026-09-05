"use client";

import { ColorFilterContentProps } from "../_types";
import { Color } from "../_types/landing-products.types";
import { FilterColor } from "./filter-color";

export function ColorFilterContent({
  selectedColorIds,
  onToggleColor,
  colors = [],
}: ColorFilterContentProps & { colors: Color[] }) {
  console.log("coooooooooooolers", colors);
  return (
    <div className="grid grid-cols-4 gap-x-[1vw] gap-y-[2vw] p-[1vw]">
      {colors.map((item) => (
        <FilterColor
          key={item.id}
          color={item.hex_code}
          name={item.name}
          selected={selectedColorIds.includes(item.id)}
          onClick={() => onToggleColor(item.id)}
        />
      ))}
    </div>
  );
}
