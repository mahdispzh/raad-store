// icon-label-button._constants.ts

import { DropdownArrowIcon } from "@/src/shared/constants/icons/dropdown-arrow-icon";
import { DropleftArrowIcon } from "@/src/shared/constants/icons/dropleft-arrow-icon";
import { FilterHamburgerIcon } from "@/src/shared/constants/icons/filter-hamburger-icon";

import { IconComponentType, IconType } from "./icon-label-button.types";

/**
 * مپ آیکون‌ها بر اساس نوع
 */
export const iconMap: Record<Exclude<IconType, "none">, IconComponentType> = {
  filter: FilterHamburgerIcon,
  dropdown: DropdownArrowIcon,
  dropleft: DropleftArrowIcon,
};
