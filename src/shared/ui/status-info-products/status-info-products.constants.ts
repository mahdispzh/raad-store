// _constants/status-info-products._constants.ts
import { ErrorIcon } from "@/src/shared/constants/icons/dashboard-error-icon";
import { SuccessOutlineIcon } from "@/src/shared/constants/icons/dashboard-success-outline-icon";
import { MinusIcon } from "@/src/shared/constants/icons/minus-icon";
import { RefreshIcon } from "@/src/shared/constants/icons/refresh-icon";
import { StatusInfoProductsVariant } from "./status-info-products.types";

// کانفیگ هر واریانت (آیکون، رنگ، مقدار پیش‌فرض، لیبل پیش‌فرض)
export const variantConfig: Record<
  StatusInfoProductsVariant,
  {
    icon: React.ComponentType<any>;
    color: string;
    defaultValue: number;
    defaultLabel: string;
  }
> = {
  success: {
    icon: SuccessOutlineIcon,
    color: "text-success",
    defaultValue: 12,
    defaultLabel: "محصول فعال است",
  },
  warning: {
    icon: MinusIcon,
    color: "text-primary",
    defaultValue: 3,
    defaultLabel: "محصول در وضعیت انتظار",
  },
  danger: {
    icon: ErrorIcon,
    color: "text-danger",
    defaultValue: 0,
    defaultLabel: "محصول غیرفعال است",
  },
  refresh: {
    icon: RefreshIcon,
    color: "text-warning",
    defaultValue: 1,
    defaultLabel: "در حال بروزرسانی",
  },
} as const;
