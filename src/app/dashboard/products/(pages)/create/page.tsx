"use client";

import { Text } from "@/src/shared/ui";
import { ImageUploaderRHF } from "@/src/shared/ui/extar-components/form-filds/custom-image-uploader/image-uploader-rhf";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { ProductDescriptionEditor } from "../../_components/product-description-editor";
import { ProductFeaturesSection } from "../../_components/product-features/product-features-section";
import { ProductVariantsSection } from "../../_components/product-variants/product-variants-section";
import { Step1ProductInfo } from "../../_components/Step1ProductInfo";
import { useAddProductForm } from "../../_hooks/useAddProductForm";
import { useCreateProduct } from "../../_hooks/useCreateProduct";
import { ProductFormValues } from "../../_types/product.types";

export default function CreateProductPage() {
  const router = useRouter();
  const methods = useAddProductForm();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;
  const createMutation = useCreateProduct();

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category_id", String(data.category_id));
      formData.append("brand_id", String(data.brand_id));

      const baseSlug = data.name.trim().replace(/\s+/g, "-");
      formData.append("slug", `${baseSlug}-${Date.now()}`);
      formData.append("status", "1");

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

      await createMutation.mutateAsync(formData);
      router.push("/dashboard/products/list");
    } catch (error: any) {
      console.error("PRODUCT SUBMIT ERROR:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "خطا در ثبت محصول. لطفاً دوباره تلاش کنید.";
      alert(message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col gap-6 rounded-xs bg-accent/50 p-6"
      >
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
            disabled={isSubmitting || createMutation.isPending}
            className={`flex h-11 w-35 items-center justify-center rounded-xs transition-all duration-300 ${
              isSubmitting || createMutation.isPending
                ? "cursor-not-allowed bg-gray"
                : "cursor-pointer bg-secondary"
            }`}
          >
            <Text
              text={
                isSubmitting || createMutation.isPending
                  ? "در حال افزودن..."
                  : "افزودن محصول"
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
