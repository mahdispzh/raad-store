// // src/app/dashboard/products/_types/product.types.ts

// export type ProductVariant = {
//   id?: number;
//   color_id: number;
//   size_id: number;
//   sku?: string;
//   price: number;
//   stock: number;
// };

// export type ProductFormValues = {
//   name: string;
//   description: string;
//   category_id: number;
//   brand_id: number;
//   product_variants: ProductVariant[];
//   images: (File | string)[];
//   variant_draft?: ProductVariant;
// };

// export type Product = {
//   id: number;
//   name: string;
//   description: string;
//   status: number;
//   created_at: string | null;
//   updated_at: string | null;
//   images: string[];
//   slug: string;
//   discount: number | null;
//   sold_count: number | null;
//   views: number | null;
//   category_id: number;
//   brand_id: number;
//   guide_image: string | null;
//   product_variants: (ProductVariant & {
//     id: number;
//     colors: { id: number; name: string; hex_code: string };
//     sizes: { id: number; name: string };
//   })[];
//   brands?: any;
//   categories?: any;
// };
// src/app/dashboard/products/_types/product.types.ts

export type ProductVariant = {
  id?: number;
  color_id: number;
  size_id: number;
  sku?: string;
  price: number;
  stock: number;
};

// ⬇️ جدید
export type ProductFeature = {
  id?: number;
  name: string;
  value: string;
};

export type ProductFormValues = {
  name: string;
  description: string;
  category_id: number;
  brand_id: number;
  discount?: number; // ⬅️ جدید
  product_variants: ProductVariant[];
  features: ProductFeature[]; // ⬅️ جدید
  images: (File | string)[];
  variant_draft?: ProductVariant;
  feature_draft?: ProductFeature; // ⬅️ جدید
};

export type Product = {
  id: number;
  name: string;
  description: string;
  status: number;
  created_at: string | null;
  updated_at: string | null;
  images: string[];
  slug: string;
  discount: number | null;
  sold_count: number | null;
  views: number | null;
  category_id: number;
  brand_id: number;
  guide_image: string | null;
  product_variants: (ProductVariant & {
    id: number;
    colors: { id: number; name: string; hex_code: string };
    sizes: { id: number; name: string };
  })[];
  features?: ProductFeature[]; // ⬅️ جدید
  brands?: any;
  categories?: any;
};
