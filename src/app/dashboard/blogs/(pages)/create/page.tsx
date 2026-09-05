"use client";

import { useAuthStore } from "@/src/shared/store/store";
import { Text } from "@/src/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { blogFormSchema } from "../../_components/blog.schema";
import { Step1Content } from "../../_components/step1-content";
import { Step2Content } from "../../_components/step2-content";
import { Step3Content } from "../../_components/step3-content";
import { createBlog } from "../../_services/blog.api";

export default function CreateBlogPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const defaultAuthor = user?.name || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsingNickname, setIsUsingNickname] = useState(false);

  const methods = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
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
    formState: { errors },
  } = methods;

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
    const slugBase = values.title.trim().replace(/\s+/g, "-").toLowerCase();
    const uniqueSlug = `${slugBase}-${Date.now()}`;
    const statusValue = values.status ?? 1;
    const publishAt = statusValue === 2 ? values.publishAt : "";

    try {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("slug", uniqueSlug);
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

      const result = await createBlog(formData);
      console.log("✅ بلاگ ایجاد شد:", result);
      router.push("/dashboard/blogs");
    } catch (error: any) {
      console.error("❌ خطا در ایجاد بلاگ:", error);
      alert(error?.message || "خطا در ایجاد بلاگ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col gap-6 rounded-xs bg-accent/50 p-6"
      >
        <Step1Content
          standalone
          errors={errors}
          isUsingNickname={isUsingNickname}
          onAuthorTypeChange={handleAuthorTypeChange}
          defaultAuthor={defaultAuthor}
          currentImage={null}
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
              text={isSubmitting ? "در حال ثبت..." : "ثبت بلاگ"}
              size="sm"
              weight="medium"
              color="white"
            />
          </button>
          {/* <DefaultButton
            type="primary"
            style="fill"
            label={isSubmitting ? "در حال ثبت..." : "ثبت بلاگ"}
            action={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          /> */}
        </div>
      </form>
    </FormProvider>
  );
}
