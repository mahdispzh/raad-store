import { Comment, Product, SuggestedProduct } from "../_types/product";

export const productComments: Comment[] = [
  {
    user: "کاربر سایت",
    date: "۸ اردیبهشت ۱۴۰۵",
    rate: 4,
    text: "بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود.",
  },
  {
    user: "کاربر سایت",
    date: "۸ اردیبهشت ۱۴۰۵",
    rate: 1.2,
    text: "بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود.",
  },
  {
    user: "کاربر سایت",
    date: "۸ اردیبهشت ۱۴۰۵",
    rate: 5.0,
    text: "بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود.",
  },
  {
    user: "کاربر سایت",
    date: "۸ اردیبهشت ۱۴۰۵",
    rate: 3,
    text: "بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود بسیار باکیفیت و خوش دوخت بود واقعا جنس پارچه هم خیلی خوب بود دقیقا شبیه به عکسش بود.",
  },
];

// export const mainProduct: Product = {
//   id: "1",
//   name: "کت چرم زنانه",
//   price: 7800000,
//   rate: 4.2,
//   ratingsCount: 50,
//   reviewsCount: 40,
//   colors: [
//     { name: "مشکی", value: "#000000" },
//     { name: "بنفش", value: "#7C3AED" },
//     { name: "طوسی", value: "#E5E7EB" },
//   ],
//   sizes: ["S", "M", "L"],
//   features: [
//     { title: "جنس", value: "چرم" },
//     { title: "کشور", value: "ترکیه" },
//     { title: "برند", value: "زارا" },
//     { title: "مدل", value: "2024" },
//     { title: "مدل", value: "2024" },
//     { title: "مدل", value: "2024" },
//   ],
//   description:
//     "کتان یکی از انواع پارچه‌هایی‌ست که مناسب فصل تابستان است. کتان انواع مختلفی دارد و از انواع آن می توانیم لینن را نام ببریم که امسال بخصوص اسم آن را زیاد شنیده‌اید. البته بیشتر به نام لنین شهرت داشت که نام درست آن همان لینن است. اصل لینن از الیاف کتان یا flax بافته می‌شود که در بعضی از موارد هم به نوعی از پارچه کنفی لینن می‌گویند. لینن در انواع مختلف وجود دارد که به راحتی می‌توان بر روی آن چاپ یا دوخت‌های تزیینی انجام داد. کسانی که عاشق پارچه‌های طبیعی هستند از طرفداران پروپا قرص پارچه کتان به شمار می‌آیند. این پارچه 30 درصد از پنبه قوی‌تر است. نکته ی جالب توجه در این نوع از پارچه این است که هر چه بیشتر آن را بپوشید و بشویید نرم‌تر می‌شود.",
//   galleryImages: [
//     "/images/landing-product.svg",
//     "/images/image 71.svg",
//     "/images/landing-product.svg",
//     "/images/image 71.svg",
//     "/images/landing-product.svg",
//     "/images/image 71.svg",
//   ] as const,
//   comments: productComments,
// };

export const mainProduct: Product = {
  id: "1", // ← اضافه شده
  name: "کت چرم زنانه",
  price: 7800000,
  rate: 4.2,
  ratingsCount: 50,
  reviewsCount: 40,
  colors: [
    { name: "مشکی", value: "#000000" },
    { name: "بنفش", value: "#7C3AED" },
    { name: "طوسی", value: "#E5E7EB" },
  ],
  sizes: ["S", "M", "L"],
  features: [
    { title: "جنس", value: "چرم" },
    { title: "کشور", value: "ترکیه" },
    { title: "برند", value: "زارا" },
    { title: "مدل", value: "2024" },
    { title: "مدل", value: "2024" },
    { title: "مدل", value: "2024" },
  ],
  description: "کتان یکی از انواع پارچه‌هایی‌ست که مناسب فصل تابستان است. ...",
  galleryImages: [
    "/images/landing-product.svg",
    "/images/image 71.svg",
    "/images/landing-product.svg",
    "/images/image 71.svg",
    "/images/landing-product.svg",
    "/images/image 71.svg",
  ] as const,
  comments: productComments,
};

export const suggestedProducts: SuggestedProduct[] = [
  {
    id: 1,
    imageSrc: "/images/SuggestedProduct.svg",
    productName: "کت جیر",
    rate: 3.9,
    price: 7400000,
  },
  {
    id: 2,
    imageSrc: "/images/SuggestedProduct.svg",
    productName: "کت جیر",
    rate: 3.9,
    discount: 10,
    price: 1400000,
  },
  {
    id: 3,
    imageSrc: "/images/SuggestedProduct.svg",
    productName: "کت جیر",
    rate: 3.9,
    discount: 10,
    price: 2400000,
  },
  {
    id: 4,
    imageSrc: "/images/SuggestedProduct.svg",
    productName: "کت جیر",
    rate: 3.9,
    discount: 10,
    price: 2400000,
  },
];

// export const similarProducts: SimilarProduct[] = [
//   {
//     id: 1,
//     imageSrc: "/images/similar-product.svg",
//     productName: "کت جیر",
//     rate: 3.9,
//     discount: 10,
//     price: 3400000,
//   },
//   {
//     id: 2,
//     imageSrc: "/images/similar-product.svg",
//     productName: "کت جیر",
//     rate: 3.9,
//     discount: 10,
//     price: 3400000,
//   },
//   {
//     id: 3,
//     imageSrc: "/images/similar-product.svg",
//     productName: "کت جیر",
//     rate: 3.9,
//     discount: 10,
//     price: 3400000,
//   },
//   {
//     id: 4,
//     imageSrc: "/images/similar-product.svg",
//     productName: "کت جیر",
//     rate: 3.9,
//     discount: 10,
//     price: 3400000,
//   },
// ];

// export const productPageData = {
//   mainProduct,
//   suggestedProducts,
//   similarProducts,
// };
