/* eslint-disable @typescript-eslint/no-explicit-any */
// src/shared/lib/seo/metadata.ts

import type { Blog } from "@/src/app/(landing)/blogs/_services/blog.api";
import type { TermsData } from "@/src/app/(landing)/terms/_types/terms.types";
import type { Metadata } from "next";

/* ثابت‌های مشترک */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3006";
export const SITE_NAME = "فروشگاه لباس بنامی";

const DEFAULT_HOME_IMAGE = `${SITE_URL}/images/og-home.jpg`;
const DEFAULT_BLOG_IMAGE = `${SITE_URL}/images/image32.svg`;
const DEFAULT_PRODUCT_IMAGE = `${SITE_URL}/images/image32.svg`;

/*  هلپرهای مشترک */

// حذف تگ HTML از content و کوتاه‌کردن متن برای meta description
function stripHtmlAndTruncate(html: string, maxLength = 155): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

// created_at/updated_at ممکنه Date | string | null باشن؛ این تابع همه‌شون رو
// به ISO string یکدست می‌کنه (چون Next فقط string خام قبول می‌کنه)
function toIsoStringOrUndefined(
  value: Date | string | null | undefined,
): string | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

/*  صفحه اصلی (Home) */

export const homeMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "فروشگاه اینترنتی لباس بنامی | خرید آنلاین لباس زنانه",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "خرید آنلاین انواع لباس زنانه با بهترین قیمت و کیفیت. ارسال سریع، ضمانت بازگشت کالا و تنوع بالای محصولات در فروشگاه لباس بنامی.",
  keywords: [
    "خرید لباس زنانه",
    "فروشگاه لباس آنلاین",
    "لباس بنامی",
    "مانتو",
    "پوشاک زنانه",
    "خرید اینترنتی لباس",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "فروشگاه لباس بنامی",
    description: "بهترین قیمت و کیفیت لباس زنانه، ارسال سریع به سراسر ایران",
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_HOME_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فروشگاه لباس بنامی",
    description: "خرید آنلاین لباس زنانه با بهترین قیمت",
    images: [DEFAULT_HOME_IMAGE],
  },
  verification: {
    google: "kqtjn2FbybH04hFvY-yFg4plaVl5bNrZhmuFVDBUaW0",
  },
};

export function getHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: "فروشگاه آنلاین انواع لباس زنانه",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
      },
    ],
  };
}

/* 
   درباره ما (About Us)
   */

export const aboutMetadata: Metadata = {
  title: "فروشگاه اینترنتی لباس بنامی | تماس با ما و درباره ما",
  description:
    "آشنایی با فروشگاه لباس بنامی، تاریخچه، اهداف و تیم ما. ارائه بهترین و باکیفیت‌ترین لباس‌ها با بهترین قیمت",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "درباره ما",
    description:
      "با ما آشنا شوید. فروشگاه لباس بنامی از سال ۱۳۹۰ فعالیت خود را آغاز کرده است.",
    type: "website",
    locale: "fa_IR",
    url: `${SITE_URL}/about-us`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "درباره ما",
    description: "آشنایی با تاریخچه و اهداف فروشگاه لباس بنامی",
  },
};

export function getAboutJsonLd(aboutData: {
  description: string;
  email: string;
  phoneNumbers: string;
  address: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: aboutData.description,
    email: aboutData.email,
    telephone: aboutData.phoneNumbers,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IR",
      streetAddress: aboutData.address,
    },
  };
}

/* 
   لیست بلاگ‌ها (Blogs List)
   */

export const blogsMetadata: Metadata = {
  title: "مجله بنامی | مقالات و راهنمای خرید لباس",
  description:
    "جدیدترین مقالات آموزشی، راهنمای خرید، ترندهای مد و استایل زنانه در مجله فروشگاه بنامی.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "مجله بنامی",
    description: "مقالات و راهنمای خرید لباس زنانه",
    type: "website",
    locale: "fa_IR",
    url: `${SITE_URL}/blogs`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "مجله بنامی",
    description: "جدیدترین مقالات مد و استایل",
  },
};

type BlogListItem = {
  slug: string;
  title: string;
  image?: string;
  createdAt?: string;
};

export function getBlogsJsonLd(blogs: BlogListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "مجله بنامی",
    url: `${SITE_URL}/blogs`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogs.map((blog, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blogs/${blog.slug}`,
        name: blog.title,
      })),
    },
  };
}

/* 
   جزئیات یک بلاگ (Blog Detail)
   */

export function buildBlogMetadata(blog: Blog): Metadata {
  const description = stripHtmlAndTruncate(blog.content || "");
  const image = blog.image || DEFAULT_BLOG_IMAGE;
  const url = `${SITE_URL}/blogs/${blog.slug}`;
  const publishedTime = toIsoStringOrUndefined(blog.created_at);

  return {
    title: blog.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      locale: "fa_IR",
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }],
      publishedTime,
      authors: blog.author ? [blog.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [image],
    },
  };
}

export function getBlogJsonLd(blog: Blog) {
  const url = `${SITE_URL}/blogs/${blog.slug}`;
  const description = stripHtmlAndTruncate(blog.content || "");
  const datePublished = toIsoStringOrUndefined(blog.created_at);
  const blogWithUpdatedAt = blog as Blog & {
    updated_at?: Date | string | null;
  };
  const dateModified =
    toIsoStringOrUndefined(blogWithUpdatedAt.updated_at) || datePublished;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description,
    image: blog.image || DEFAULT_BLOG_IMAGE,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: blog.author || `کاربر ${blog.user_id}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/* 
   سوالات متداول (FAQ)
   */

export const faqMetadata: Metadata = {
  title: "فروشگاه اینترنی لباس بنامی | سوالات متداول",
  description:
    "پاسخ به سوالات رایج شما درباره خدمات، نحوه استفاده و مشکلات احتمالی",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "سوالات متداول",
    description: "راهنمای کامل پاسخ به سوالات شما",
    type: "website",
    locale: "fa_IR",
    url: `${SITE_URL}/faq`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "سوالات متداول",
    description: "پاسخ به سوالات رایج شما",
  },
};

export function getFaqJsonLd(categories: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.items.map((item: any) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };
}

/* 
   لیست محصولات (Products List)
   */

export const productsListMetadata: Metadata = {
  title: "خرید انواع لباس زنانه | فروشگاه بنامی",
  description:
    "مشاهده و خرید آنلاین کامل‌ترین مجموعه لباس زنانه با امکان فیلتر بر اساس رنگ، سایز، قیمت و دسته‌بندی. ارسال سریع و ضمانت بازگشت کالا.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "خرید انواع لباس زنانه",
    description: "کامل‌ترین مجموعه لباس زنانه با بهترین قیمت",
    type: "website",
    locale: "fa_IR",
    url: `${SITE_URL}/products`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "خرید انواع لباس زنانه",
    description: "کامل‌ترین مجموعه لباس زنانه با بهترین قیمت",
  },
};

type ProductListItem = {
  id: number | string;
  slug: string;
  name: string;
};

export function getProductsListJsonLd(products: ProductListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/products/${product.slug}`,
      name: product.name,
    })),
  };
}

/* 
   جزئیات یک محصول (Product Detail)
   */

// این تایپ مستقیم از schema.prisma واقعی پروژه گرفته شده
export type ProductForSeo = {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  images?: string[] | null;
  guide_image?: string | null; // ⚠️ توی کدهای UI به اشتباه guid_image نوشته شده
  categories?: { name?: string; slug?: string } | null;
  brands?: { name?: string; slug?: string } | null;
  product_variants?: { price: number | null; stock: number }[] | null;
};

function getPrimaryVariant(product: ProductForSeo) {
  return product.product_variants?.[0];
}

export function buildProductMetadata(product: ProductForSeo): Metadata {
  const description = stripHtmlAndTruncate(product.description || product.name);
  const image = product.images?.[0] || DEFAULT_PRODUCT_IMAGE;
  const url = `${SITE_URL}/products/${product.slug}`;
  const variant = getPrimaryVariant(product);

  return {
    title: `${product.name} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.name,
      description,
      type: "website",
      locale: "fa_IR",
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [image],
    },
    other: variant?.price
      ? {
          "product:price:amount": String(variant.price),
          "product:price:currency": "IRT", // ⚠️ بسته به واحد پول واقعی (تومان/ریال) تنظیم کن
        }
      : undefined,
  };
}

export function getProductJsonLd(
  product: ProductForSeo,
  ratingInfo?: { ratingValue: number; reviewCount: number },
) {
  const url = `${SITE_URL}/products/${product.slug}`;
  const variant = getPrimaryVariant(product);
  const inStock = (variant?.stock ?? 0) > 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: stripHtmlAndTruncate(product.description || product.name, 300),
    image: product.images?.length ? product.images : [DEFAULT_PRODUCT_IMAGE],
    sku: String(product.id),
    brand: product.brands?.name
      ? { "@type": "Brand", name: product.brands.name }
      : undefined,
    category: product.categories?.name,
    offers: variant?.price
      ? {
          "@type": "Offer",
          url,
          priceCurrency: "IRT", // ⚠️ چک کن واحد پول واقعی چیه
          price: variant.price,
          availability: inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        }
      : undefined,
    aggregateRating: ratingInfo
      ? {
          "@type": "AggregateRating",
          ratingValue: ratingInfo.ratingValue,
          reviewCount: ratingInfo.reviewCount,
        }
      : undefined,
  };
}

/* 
   قوانین و مقررات (Terms)
   */

export const termsMetadata: Metadata = {
  title: "قوانین و مقررات فروشگاه بنامی",
  description:
    "شرایط استفاده از سایت، نحوه ثبت سفارش، پرداخت، ارسال و مرجوعی کالا در فروشگاه لباس بنامی.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "قوانین و مقررات",
    description: "شرایط و قوانین خرید از فروشگاه بنامی",
    type: "website",
    locale: "fa_IR",
    url: `${SITE_URL}/terms`,
    siteName: SITE_NAME,
  },
};

export function getTermsJsonLd(termsData: TermsData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: termsData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Answer باید یه متن باشه، نه آرایه؛ آیتم‌های answer به یک پاراگراف تبدیل می‌شن
        text: faq.answer.join(" "),
      },
    })),
  };
}
/* 
   آموزش‌ها - به‌زودی (Tutorial)
   */

export const tutorialMetadata: Metadata = {
  title: "آموزش‌ها به‌زودی | فروشگاه بنامی",
  description:
    "بخش آموزش‌های فروشگاه بنامی به‌زودی راه‌اندازی می‌شود. راهنمای انتخاب سایز، نگهداری پوشاک و مقالات آموزشی دیگر در این بخش قرار می‌گیرد.",
  alternates: {
    canonical: "/tutorial",
  },
  // ⚠️ فعلاً noindex چون محتوای واقعی نداره. وقتی محتوای واقعی گذاشتی،
  // این بخش رو حذف کن یا index: true بذار.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "آموزش‌ها به‌زودی",
    description: "بخش آموزش‌های فروشگاه بنامی به‌زودی راه‌اندازی می‌شود.",
    type: "website",
    locale: "fa_IR",
    url: `${SITE_URL}/tutorial`,
    siteName: SITE_NAME,
  },
};

/* 
   اپلیکیشن موبایل - به‌زودی (Application)
   */

export const applicationMetadata: Metadata = {
  title: "اپلیکیشن موبایل به‌زودی | فروشگاه بنامی",
  description:
    "اپلیکیشن موبایل فروشگاه بنامی به‌زودی برای اندروید و iOS منتشر می‌شود. خرید راحت‌تر و سریع‌تر لباس زنانه از طریق اپلیکیشن اختصاصی بنامی.",
  alternates: {
    canonical: "/application",
  },
  // ⚠️ فعلاً noindex چون محتوای واقعی نداره. وقتی اپ منتشر شد، این بخش
  // رو حذف کن یا index: true بذار.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "اپلیکیشن موبایل به‌زودی",
    description: "اپلیکیشن موبایل فروشگاه بنامی به‌زودی منتشر می‌شود.",
    type: "website",
    locale: "fa_IR",
    url: `${SITE_URL}/application`,
    siteName: SITE_NAME,
  },
};
