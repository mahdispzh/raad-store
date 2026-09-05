import {
  PayIcon,
  PriceIcon,
  SuccessRoundedIcon,
  WaitingIcon,
  DeliveryIcon,
  OfficerIcon,
  UserIcon,
  ReturnIcon,
} from "../../constants/icons";
import { OrderStatus, OrderStatusConfig } from "./order-status-badge.types";

// اسم آیکون‌ها رو با اسم واقعی export شده‌شون تو فایل constants/icons چک کن،
// اگه فرق داره فقط همین importها رو اصلاح کن، بقیه فایل‌ها دست‌نخورده می‌مونن.
export const ORDER_STATUS_MAP: Record<OrderStatus, OrderStatusConfig> = {
  0: { label: "انتظار پرداخت", Icon: PayIcon },
  1: { label: "پرداخت شده", Icon: PriceIcon },
  2: { label: "تایید اولیه", Icon: SuccessRoundedIcon },
  3: { label: "آماده سازی", Icon: WaitingIcon },
  4: { label: "آماده ارسال", Icon: DeliveryIcon },
  5: { label: "تحویل به پست", Icon: OfficerIcon },
  6: { label: "تحویل به مشتری", Icon: UserIcon },
  7: { label: "مرجوع شده", Icon: ReturnIcon },
};
