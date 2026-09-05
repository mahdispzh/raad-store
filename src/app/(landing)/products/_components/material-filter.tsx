"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { MaterialFilterProps } from "../_types";
import { MaterialFilterContent } from "./material-filtercontent";

export function MaterialFilter({
  show,
  setShow,
  selectedMaterials,
  onToggleMaterial,
}: MaterialFilterProps) {
  return (
    <>
      <div className="flex justify-between px-[0.5vw]">
        <Text text="جنس" size="md" weight="medium" />
        <button
          onClick={() => setShow(!show)}
          className="transition-all duration-300"
        >
          <div
            className={`transition-transform duration-300 ${
              show ? "rotate-180" : "rotate-0"
            }`}
          >
            <DropdownArrowIcon size="sm" />
          </div>
        </button>
      </div>
      {show && (
        <MaterialFilterContent
          selectedMaterials={selectedMaterials}
          onToggleMaterial={onToggleMaterial}
        />
      )}
    </>
  );
}
