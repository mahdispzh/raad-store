"use client";

import { Text } from "@/src/shared/ui";
import { ImageUploaderRHF } from "@/src/shared/ui/extar-components/form-filds/custom-image-uploader/image-uploader-rhf";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { ProductDescriptionEditor } from "../../../_components/product-description-editor";
import { ProductFeaturesSection } from "../../../_components/product-features/product-features-section";
import { ProductVariantsSection } from "../../../_components/product-variants/product-variants-section";
import { Step1ProductInfo } from "../../../_components/Step1ProductInfo";
import { useAddProductForm } from "../../../_hooks/useAddProductForm";
import { useProduct } from "../../../_hooks/useProduct";
import { useUpdateProduct } from "../../../_hooks/useUpdateProduct";
import { ProductFormValues } from "../../../_types/product.types";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  const { data: product, isLoading } = useProduct(slug);
  const updateMutation = useUpdateProduct();

  const methods = useAddProductForm();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        brand_id: product.brand_id,
        discount: product.discount ?? 0, // ⬅️ جدید
        images: product.images ?? [],
        product_variants: product.product_variants.map((v) => ({
          ...(v.id !== undefined ? { id: v.id } : {}),
          color_id: v.color_id,
          size_id: v.size_id,
          price: v.price,
          stock: v.stock,
          ...(v.sku ? { sku: v.sku } : {}),
        })),
        // ⬇️ جدید — ویژگی‌ها
        features:
          product.features?.map((f) => ({
            ...(f.id !== undefined ? { id: f.id } : {}),
            name: f.name ?? "",
            value: f.value ?? "",
          })) ?? [],
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category_id", String(data.category_id));
      formData.append("brand_id", String(data.brand_id));

      const slugValue = data.name.toLowerCase().replace(/\s+/g, "-");
      formData.append("slug", slugValue);
      formData.append("status", "1");

      // ⬇️ جدید — تخفیف
      if (data.discount !== undefined && data.discount !== null) {
        formData.append("discount", String(data.discount));
      }

      const variants = data.product_variants.map((v, index) => ({
        ...(v.id ? { id: v.id } : {}),
        color_id: v.color_id,
        size_id: v.size_id,
        price: v.price,
        stock: v.stock,
        sku:
          v.sku ||
          `PROD-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`,
      }));
      formData.append("product_variants", JSON.stringify(variants));

      // ⬇️ جدید — ویژگی‌ها
      if (data.features && data.features.length > 0) {
        const features = data.features.map((f) => ({
          ...(f.id ? { id: f.id } : {}),
          name: f.name,
          value: f.value,
        }));
        formData.append("features", JSON.stringify(features));
      }

      if (data.images && data.images.length > 0) {
        data.images.forEach((image: any) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      await updateMutation.mutateAsync({ slug, data: formData });
      router.push("/dashboard/products/list");
    } catch (error) {
      console.error("PRODUCT UPDATE ERROR:", error);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="flex h-40 items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col gap-6 rounded-xs bg-accent/50 p-6"
      >
        <Text text="ویرایش محصول" size="lg" weight="bold" />

        <div className="flex w-full items-center justify-center">
          <ImageUploaderRHF control={control} name="images" maxImages={10} />
        </div>

        <Step1ProductInfo control={control} />

        <ProductVariantsSection control={control} />

        <ProductFeaturesSection control={control} />

        <ProductDescriptionEditor control={control} />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting || updateMutation.isPending}
            className={`flex h-11 w-35 items-center justify-center rounded-xs transition-all duration-300 ${
              isSubmitting || updateMutation.isPending
                ? "cursor-not-allowed bg-gray"
                : "cursor-pointer bg-secondary"
            }`}
          >
            <Text
              text={
                isSubmitting || updateMutation.isPending
                  ? "در حال ذخیره..."
                  : "ذخیره تغییرات"
              }
              size="sm"
              weight="medium"
              color="white"
            />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
