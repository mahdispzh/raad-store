// notifications.mock.ts
// داده‌های نمونه نوتیفیکیشن (در آینده از API دریافت می‌شود)

import { NotificationItem } from "../notifications-modal/notifications-modal.types";

export const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    category: "order",
    text: "سفارش شما با موفقیت ثبت شد.",
    time: "۲ روز قبل",
    extraData: "سفارش شما انجام شد و در اسرع وقت برای شما آماده می‌شود.",
    isRead: false,
  },
  {
    id: "2",
    category: "favorite",
    text: "کالاهای مورد علاقه شما, در تخفیف ویژه قرار گرفتند.",
    time: "امروز",
    extraData:
      "کالاهای مورد علاقه شما با قیمت کمتر در دسترس است, بهترین زمان برای خرید است.",
    isRead: false,
  },
  {
    id: "3",
    category: "comment",
    text: "نظر شما درمورد کالای خریداری شده چیست؟ به آن امتیاز دهید.",
    time: "هفته پیش",
    extraData: "دیدگاه و امتیاز شما برای کاربران دیگر نمایش داده می‌شود.",
    isRead: false,
  },
  {
    id: "4",
    category: "delivery",
    text: "سفارش شما در مرحله ارسال قرار گرفت.",
    time: "هفته پیش",
    extraData: "سفارش شما به زودی ارسال می‌شود و به دست شما خواهد رسید.",
    isRead: false,
  },
];
