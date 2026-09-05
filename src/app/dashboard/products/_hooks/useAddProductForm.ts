import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { ProductFormValues } from "../_types/product.types";

const addProductSchema = z.object({
  name: z.string().min(1, "نام محصول ضروری است"),
  description: z.string().min(1, "توضیحات ضروری است"),
  category_id: z.number().min(1, "دسته‌بندی ضروری است"),
  brand_id: z.number().min(1, "برند ضروری است"),

  // ⬇️ جدید — تخفیف اختیاری، بین ۰ تا ۱۰۰
  discount: z
    .number()
    .min(0, "تخفیف نمی‌تواند منفی باشد")
    .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد")
    .optional(),

  product_variants: z
    .array(
      z.object({
        id: z.number().optional(),
        color_id: z.number().min(1, "رنگ ضروری است"),
        size_id: z.number().min(1, "سایز ضروری است"),
        price: z.number().min(0, "قیمت باید بیشتر از ۰ باشد"),
        stock: z.number().min(0, "موجودی باید بیشتر از ۰ باشد"),
        sku: z.string().optional(),
      }),
    )
    .min(1, "حداقل یک واریانت ضروری است"),

  variant_draft: z
    .object({
      id: z.number().optional(),
      color_id: z.number().default(0),
      size_id: z.number().default(0),
      price: z.number().default(0),
      stock: z.number().default(0),
      sku: z.string().optional(),
    })
    .optional(),

  // ⬇️ جدید — ویژگی‌ها (اختیاری، می‌تونه خالی باشه)
  features: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "نام ویژگی ضروری است"),
        value: z.string().min(1, "مقدار ویژگی ضروری است"),
      }),
    )
    .optional()
    .default([]),

  feature_draft: z
    .object({
      id: z.number().optional(),
      name: z.string().default(""),
      value: z.string().default(""),
    })
    .optional(),

  images: z.array(z.any()).min(1, "حداقل یک تصویر ضروری است"),
});

export function useAddProductForm() {
  return useForm<ProductFormValues>({
    resolver: zodResolver(addProductSchema) as Resolver<ProductFormValues>,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      category_id: 0,
      brand_id: 0,
      discount: 0, // ⬅️ جدید
      images: [],
      product_variants: [],
      features: [], // ⬅️ جدید
      variant_draft: {
        color_id: 0,
        size_id: 0,
        price: 0,
        stock: 0,
        sku: "",
      },
      feature_draft: {
        // ⬅️ جدید
        name: "",
        value: "",
      },
    },
  });
}
