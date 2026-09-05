// src/app/robots.ts

import { MetadataRoute } from "next";

// در .env.local و .env.production مقدار NEXT_PUBLIC_SITE_URL رو ست کن
// مثال prod: NEXT_PUBLIC_SITE_URL=https://banami.com
const URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3006";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // صفحات داشبورد/پروفایل کاربر (private, بدون ارزش SEO)
          "/dashboard/",
          "/profile/",

          // API routes
          "/api/",

          // فرآیند خرید و پرداخت
          "/cart/",
          "/checkout/",

          // احراز هویت (لاگین/OTP) — هیچ ارزش ایندکسی ندارن
          "/send-otp/",
          "/verify-otp/",

          // صفحات تستی/داکیومنت داخلی که نباید ایندکس بشن
          "/test/",
          "/test-icon/",
          "/swagger/",

          // پارامترهای فیلتر/سورت/صفحه‌بندی که باعث duplicate content میشن
          "/*?*sort=",
          "/*?*page=",
        ],
      },
      {
        // اجازه به گوگل ایمیج برای ایندکس بهتر تصاویر محصول
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: `${URL}/sitemap.xml`,
    host: URL,
  };
}