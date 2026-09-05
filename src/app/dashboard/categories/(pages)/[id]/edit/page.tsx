// src/app/dashboard/categories/(pages)/[id]/edit/page.tsx
"use client";

import { DefaultButton, Text } from "@/src/shared/ui";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CategoryParentSelector } from "../../../_components/category-parent-selector.ui";
import { useCategories } from "../../../_hooks/useCategories";
import { useCategory } from "../../../_hooks/useCategory";
import { useUpdateCategory } from "../../../_hooks/useUpdateCategory";

type CategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
};

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const categoryId = params.id;

  const { data: category, isLoading } = useCategory(categoryId);
  const updateMutation = useUpdateCategory();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const methods = useForm<CategoryFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parent_id: null,
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const nameValue = watch("name");
  const parentIdValue = watch("parent_id");

  // پر کردن فرم وقتی داده‌ی دسته‌بندی از سرور رسید
  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        slug: category.slug,
        description: category.description ?? "",
        parent_id: category.parent_id,
      });
      setPreviewUrl(category.image ?? null);
    }
  }, [category, reset]);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories(1, 1000);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("name", value);
    const autoSlug = value.trim().replace(/\s+/g, "-").toLowerCase();
    setValue("slug", autoSlug);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("slug", values.slug.trim());
      formData.append("description", values.description.trim());
      if (values.parent_id) {
        formData.append("parentId", String(values.parent_id));
      }
      // فقط اگه عکس جدید انتخاب شده باشه ارسال می‌شه؛ در غیر این صورت
      // route.ts فعلی PUT عکس قبلی رو نگه می‌داره
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await updateMutation.mutateAsync({ id: categoryId, data: formData });
      router.push("/dashboard/categories");
    } catch (error: any) {
      console.error("❌ خطا در ویرایش دسته‌بندی:", error);
      alert(error?.message || "خطا در ویرایش دسته‌بندی");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !category) {
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
        className="flex h-auto w-full flex-col gap-6 rounded-xs bg-accent p-6"
      >
        <Text text="ویرایش دسته‌بندی" size="lg" weight="bold" />

        {/* عکس دسته‌بندی */}
        <div>
          <Text text="عکس دسته‌بندی" size="md" weight="medium" />
          <div className="mt-1 flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray bg-gray-50">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="پیش‌نمایش تصویر"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Text text="بدون عکس" size="sm" color="gray" />
              )}
            </div>

            <label className="flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-dashed border-gray px-3 py-3 text-center text-sm text-primary transition hover:bg-gray-50">
              <Text
                text={
                  imageFile ? imageFile.name : "برای تغییر تصویر کلیک کنید"
                }
                size="sm"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* نام دسته‌بندی */}
        <div>
          <Text text="نام دسته‌بندی" size="md" weight="medium" />
          <input
            type="text"
            value={nameValue}
            onChange={handleNameChange}
            placeholder="نام دسته‌بندی را وارد کنید"
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
          {errors.name && (
            <Text text={`${errors.name.message}`} size="sm" color="danger" />
          )}
        </div>

        {/* انتخاب دسته‌بندی والد — خود دسته‌بندی رو از لیست حذف می‌کنیم */}
        <CategoryParentSelector
          control={control}
          name="parent_id"
          categories={categoriesData?.data?.filter((c) => c.id !== category.id)}
          isLoading={isCategoriesLoading}
          parentIdValue={parentIdValue}
          onChangeParentId={(val) => setValue("parent_id", val)}
        />

        {/* توضیحات */}
        <div>
          <Text text="توضیحات" size="md" weight="medium" />
          <textarea
            {...register("description")}
            placeholder="توضیحات دسته‌بندی را وارد کنید"
            rows={4}
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <DefaultButton
            type="primary"
            style="fill"
            label={isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            action={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </FormProvider>
  );
}