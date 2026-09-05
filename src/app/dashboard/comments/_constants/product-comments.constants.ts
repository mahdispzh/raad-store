// صفحه: dashboard/profile/comments/AddProductModal.tsx

import {
  CommentedProductType,
  ProductCommentsSummaryType,
  ProductCommentType,
} from "@/src/app/dashboard/comments/_types/product-comments.types";

export const PRODUCT_COMMENTS_DATA: ProductCommentType[] = [
  {
    id: 1,
    username: "کاربر سایت",
    date: "۸ اردیبهشت ۱۴۰۵",
    rating: 5,
    text: "بسیار باکیفیت و خوش دوخت بود. جنس پارچه هم خیلی خوب بود و دقیقا شبیه عکس محصول بود.",
    size: "S",
    color: "مشکی",
  },
  {
    id: 2,
    username: "کاربر سایت",
    date: "۱۰ اردیبهشت ۱۴۰۵",
    rating: 4,
    text: "کیفیت دوخت عالی بود و ارسال هم سریع انجام شد.",
    size: "M",
    color: "مشکی",
  },
  {
    id: 3,
    username: "کاربر سایت",
    date: "۱۲ اردیبهشت ۱۴۰۵",
    rating: 5,
    text: "برای هدیه خریدم و کاملا راضی بودم.",
    size: "L",
    color: "قهوه‌ای",
  },
];

export const COMMENTED_PRODUCT_DATA: CommentedProductType = {
  image: "/images/image33.svg",
  title: "کت چرم زنانه",
  variant: "مشکی - S",
  storeName: "فروشگاه بونامی",
  guarantee: "گارانتی اصالت و سلامت فیزیکی کالا",
  price: 3450000,
};

export const PRODUCT_COMMENTS_SUMMARY_DATA: ProductCommentsSummaryType = {
  score: 4,
  totalVotes: 112,
  rating: 4,
};
