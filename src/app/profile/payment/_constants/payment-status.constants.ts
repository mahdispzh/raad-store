// src/app/profile/payment/_constants/payment-status.constants.ts

export const FAILED_LIKE_VARIANTS = {
  unsuccess: {
    imageSrc: "/images/payment-unsuccessful.svg",
    imageAlt: "پرداخت ناموفق",
    title: "متاسفانه پرداخت شما ناموفق بود!",
    titleColor: "danger" as const,
    message: "در صورت ناموفق بودن پرداخت به دلیل اختلال در بانک‌های ملی، صادرات و آینده، از سایر کارت‌های بانکی استفاده کنید.",
    buttonType: "secondary" as const,
  },
  unknown: {
    imageSrc: '/images/payment-unknown.svg',
    imageAlt: "پرداخت نامشخص",
    title: "متاسفانه پرداخت شما نامشخص بود!",
    titleColor: "secondary" as const,
    message: "در صورت ناموفق بودن پرداخت به دلیل اختلال در بانک‌های ملی، صادرات و آینده، از سایر کارت‌های بانکی استفاده کنید.",
    buttonType: "primary" as const,
  },
   "bank-error": {
    imageSrc: "/images/payment-unknown.svg",
    imageAlt: "خطا در ارتباط با بانک",
    title: "ارتباط با بانک برقرار نشد!",
    titleColor: "danger" as const,
    message: "به دلیل قطعی ارتباط با درگاه بانکی، نتیجه‌ی پرداخت شما بررسی نشد. لطفاً دقایقی دیگر دوباره تلاش کنید یا وضعیت سفارش را از بخش سفارش‌های من پیگیری کنید.",
    buttonType: "secondary" as const,
  },
};