// src/app/dashboard/blogs/(pages)/[slug]/edit/page.tsx
"use client";

import { useAuthStore } from "@/src/shared/store/store";
import { Text } from "@/src/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm ,Resolver} from "react-hook-form";

import { useBlog } from "../../../_hooks/useBlog";
import { blogFormSchema, BlogFormValues } from "../../../_components/blog.schema";
import { updateBlog } from "../../../_services/blog.api";
import { Step1Content } from "../../../_components/step1-content";
import { Step2Content } from "../../../_components/step2-content";
import { Step3Content } from "../../../_components/step3-content";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  const user = useAuthStore((state) => state.user);
  const defaultAuthor = user?.name || "";

  const { data: blog, isLoading } = useBlog(slug);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsingNickname, setIsUsingNickname] = useState(false);
  const [existingImage, setExistingImage] = useState<string | null>(null);

const methods = useForm<BlogFormValues>({
  resolver: zodResolver(blogFormSchema) as Resolver<BlogFormValues>,
  defaultValues: {
    title: "",
    author: defaultAuthor,
    summary: "",
    keywords: [],
    tags: [],
    readTime: "",
    content: "",
    image: null,
    status: 1,
    publishAt: "",
  },
  mode: "onChange",
});
  const {
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = methods;

  // پر کردن فرم با داده‌ی بلاگ وقتی از سرور رسید
  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title || "",
        author: blog.author || defaultAuthor,
        summary: blog.summary || "",
        keywords: blog.keywords || [],
        tags: blog.tags || [],
        readTime: blog.rading_time?.toString() || "",
        content: blog.content || "",
        status: blog.status ?? 1,
        publishAt: blog.publish_at
          ? new Date(blog.publish_at).toISOString().slice(0, 16)
          : "",
        image: null,
      });
      setExistingImage(blog.image || null);

      if (blog.author && blog.author !== defaultAuthor) {
        setIsUsingNickname(true);
      } else {
        setIsUsingNickname(false);
      }
    }
  }, [blog, defaultAuthor, reset]);

  const handleAuthorTypeChange = (value: boolean) => {
    setIsUsingNickname(value);
    if (!value) {
      setValue("author", defaultAuthor);
      clearErrors("author");
    } else {
      setValue("author", "");
    }
  };

  const onSubmit = async (values: BlogFormValues) => {
    setIsSubmitting(true);
    const authorToSend = isUsingNickname ? values.author : defaultAuthor;
    const statusValue = values.status ?? 1;
const publishAt = statusValue === 2 ? (values.publishAt ?? "") : "";
    try {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("summary", values.summary.trim());
      formData.append("content", values.content);
      formData.append("status", String(statusValue));
      formData.append("keywords", JSON.stringify(values.keywords));
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("publish_at", publishAt);
      formData.append("rading_time", values.readTime.trim());
      formData.append("author", authorToSend);
      if (values.image && values.image instanceof File) {
        formData.append("image", values.image);
      }

      await updateBlog(slug, formData);
      router.push("/dashboard/blogs");
    } catch (error: any) {
      console.error("❌ خطا در ویرایش بلاگ:", error);
      alert(error?.message || "خطا در ویرایش بلاگ");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !blog) {
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
        <Text text="ویرایش بلاگ" size="lg" weight="bold" />

        <Step1Content
          standalone
          errors={errors}
          isUsingNickname={isUsingNickname}
          onAuthorTypeChange={handleAuthorTypeChange}
          defaultAuthor={defaultAuthor}
          currentImage={existingImage}
        />

<Step2Content standalone errors={errors} />
        <Step3Content standalone errors={errors} />

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`flex h-11 w-35 items-center justify-center rounded-xs transition-all duration-300 ${
              isSubmitting
                ? "cursor-not-allowed bg-gray"
                : "cursor-pointer bg-secondary"
            }`}
          >
            <Text
              text={isSubmitting ? "در حال ثبت..." : "ذخیره تغییرات"}
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