"use client";

import { CloseModalIcon } from "@/src/shared/constants/icons";
import { useAuthStore } from "@/src/shared/store/store";
import { Modal, Text } from "@/src/shared/ui";
import { FormStepper } from "@/src/shared/ui/form-stepper/form-stepper.ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useBlog } from "../_hooks/useBlog";
import { createBlog, updateBlog } from "../_services/blog.api";
import { blogFormSchema, BlogFormValues } from "./blog.schema";
import { Step1Content } from "./step1-content";
import { Step2Content } from "./step2-content";
import { Step3Content } from "./step3-content";

type Step = 1 | 2 | 3;

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "update";
  blogSlug?: string;
  onAddBlog?: (blog: any) => void;
  onUpdateBlog?: (blog: any) => void;
}

const BLOG_STEPS = [
  { id: 1, title: "اطلاعات پایه" },
  { id: 2, title: "کلیدواژه و تگ" },
  { id: 3, title: "محتوا" },
];

export function AddBlogModal({
  isOpen,
  onClose,
  mode = "create",
  blogSlug,
  onAddBlog,
  onUpdateBlog,
}: AddBlogModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsingNickname, setIsUsingNickname] = useState(false);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const methods = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      author: "",
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
    trigger,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = methods;

  const user = useAuthStore((state) => state.user);
  const defaultAuthor = user?.name || "";

  // دریافت داده در حالت ویرایش
  const { data: blogData, isLoading: isLoadingBlog } = useBlog(
    mode === "update" && blogSlug ? blogSlug : undefined,
  );

  // پر کردن فرم با داده‌های بلاگ در حالت ویرایش
  useEffect(() => {
    if (mode === "update" && blogData) {
      const blog = blogData;
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
        image: null, // تصویر جدید جداگانه مدیریت می‌شود
      });
      setExistingImage(blog.image || null);
      // تنظیم وضعیت استفاده از نام مستعار
      if (blog.author && blog.author !== defaultAuthor) {
        setIsUsingNickname(true);
        setValue("author", blog.author);
      } else {
        setIsUsingNickname(false);
        setValue("author", defaultAuthor);
      }
    }
  }, [mode, blogData, defaultAuthor, reset, setValue]);

  const handleAuthorTypeChange = (value: boolean) => {
    setIsUsingNickname(value);
    if (!value) {
      setValue("author", defaultAuthor);
      clearErrors("author");
    } else {
      setValue("author", "");
    }
  };

  const handleClose = () => {
    reset();
    setStep(1);
    setIsSubmitting(false);
    setIsUsingNickname(false);
    onClose();
  };

  const goToNextStep = async () => {
    let isValid = false;

    if (step === 1) {
      const isTitleSummaryValid = await trigger(["title", "summary"]);
      let isAuthorValid = true;
      if (isUsingNickname) {
        isAuthorValid = await trigger("author");
      } else {
        clearErrors("author");
      }
      const status = getValues("status");
      let isPublishAtValid = true;
      if (status === 2) {
        isPublishAtValid = await trigger("publishAt");
      } else {
        clearErrors("publishAt");
      }
      isValid = isTitleSummaryValid && isAuthorValid && isPublishAtValid;
    } else if (step === 2) {
      isValid = await trigger(["keywords", "tags", "readTime"]);
    } else if (step === 3) {
      isValid = await trigger(["content"]);
    }

    if (!isValid) return;

    if (step === 3) {
      await handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const goToPrevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const values = getValues();
    const authorToSend = isUsingNickname ? values.author : defaultAuthor;
    const slugBase = values.title.trim().replace(/\s+/g, "-").toLowerCase();
    const uniqueSlug =
      mode === "create"
        ? `${slugBase}-${Date.now()}`
        : blogSlug
          ? decodeURIComponent(blogSlug)
          : slugBase;
    const status = values.status ?? 1;
    const publishAt = status === 2 ? values.publishAt : "";

    try {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("slug", uniqueSlug);
      formData.append("summary", values.summary.trim());
      formData.append("content", values.content);
      formData.append("status", String(status));
      formData.append("keywords", JSON.stringify(values.keywords));
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("publish_at", publishAt);
      formData.append("rading_time", values.readTime.trim());
      formData.append("author", authorToSend);
      if (values.image && values.image instanceof File) {
        formData.append("image", values.image);
      }

      let result;
      if (mode === "create") {
        result = await createBlog(formData);
        if (onAddBlog) onAddBlog(result);
      } else {
        if (!blogSlug) throw new Error("اسلاگ بلاگ وجود ندارد");
        result = await updateBlog(blogSlug, formData);
        if (onUpdateBlog) onUpdateBlog(result);
      }
      console.log(
        `✅ بلاگ ${mode === "create" ? "ایجاد" : "ویرایش"} شد:`,
        result,
      );
      handleClose();
    } catch (error: any) {
      console.error(
        `❌ خطا در ${mode === "create" ? "ایجاد" : "ویرایش"} بلاگ:`,
        error,
      );
      alert(
        error?.message ||
          `خطا در ${mode === "create" ? "ایجاد" : "ویرایش"} بلاگ`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingBlog && mode === "update") {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="w-[700px] rounded-sm bg-white p-6 text-center">
          <Text text="در حال بارگذاری..." size="lg" color="gray" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <FormProvider {...methods}>
        <div className="flex h-[670px] w-[700px] max-w-full flex-col rounded-sm bg-white">
          <div className="border-b-2 border-gray px-6 pt-6 pb-8">
            <div className="mb-3 flex items-center justify-between">
              <Text
                text={mode === "create" ? "افزودن بلاگ جدید" : "ویرایش بلاگ"}
                size="md"
                weight="bold"
              />
              <FormStepper steps={BLOG_STEPS} currentStep={step} />
              <button className="cursor-pointer" onClick={handleClose}>
                <CloseModalIcon size="sm" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {step === 1 && (
              <Step1Content
                onNext={goToNextStep}
                errors={errors}
                isUsingNickname={isUsingNickname}
                onAuthorTypeChange={handleAuthorTypeChange}
                defaultAuthor={defaultAuthor}
              />
            )}
            {step === 2 && (
              <Step2Content
                onNext={goToNextStep}
                onPrev={goToPrevStep}
                errors={errors}
                currentImage={existingImage}
              />
            )}
            {step === 3 && (
              <Step3Content
                onPrev={goToPrevStep}
                onNext={goToNextStep}
                isSubmitting={isSubmitting}
                errors={errors}
              />
            )}
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
}
