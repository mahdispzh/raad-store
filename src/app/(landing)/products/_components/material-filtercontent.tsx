"use client";

import { Caption } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/check-box/checkbox.ui";
import { materials } from "../_constants/materials";
import { MaterialFilterContentProps } from "../_types";

export function MaterialFilterContent({
  selectedMaterials,
  onToggleMaterial,
}: MaterialFilterContentProps) {
  return (
    <div className="flex flex-col gap-[0.8vw] p-[1vw]">
      {materials.map((material, index) => (
        <div key={material}>
          <div className="flex flex-row items-center gap-[0.7vw]">
            <Checkbox
              checked={selectedMaterials.includes(material)}
              onChange={() => onToggleMaterial(material)}
              variant="primary"
            />
            <Caption size="xs" text={material} weight="regular" />
          </div>
          {index !== materials.length - 1 && (
            <div className="py-[0.7vw]">
              <div className="h-px bg-gray" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
