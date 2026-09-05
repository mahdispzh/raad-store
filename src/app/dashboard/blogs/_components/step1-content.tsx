// "use client";

// import { Text } from "@/src/shared/ui";
// import { CustomSelect } from "@/src/shared/ui/custom-select/custom-select.ui";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";
// import { BlogFormValues } from "./blog.schema";

// interface Step1ContentProps {
//   onNext?: () => void;
//   errors: any;
//   isUsingNickname: boolean;
//   onAuthorTypeChange: (value: boolean) => void;
//   defaultAuthor: string;
//   currentImage?: string | null;
//   standalone?: boolean;
// }

// const statusMap: Record<number, { label: string; color: string }> = {
//   0: { label: "پیش‌نویس", color: "bg-gray-200 text-gray-700" },
//   1: { label: "منتشر شده", color: "bg-green-100 text-green-700" },
//   2: { label: "زمان بندی شده", color: "bg-blue-100 text-blue-700" },
//   3: { label: "منتشر نشده", color: "bg-red-100 text-red-700" },
// };

// const authorTypeOptions = [
//   { label: "نام پیش فرض", value: "default" },
//   { label: "وارد کردن نام", value: "nickname" },
// ];

// export function Step1Content({
//   onNext,
//   errors,
//   isUsingNickname,
//   onAuthorTypeChange,
//   defaultAuthor,
//   currentImage,
//   standalone = false,
// }: Step1ContentProps) {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors: formErrors },
//   } = useFormContext<BlogFormValues>();

//   const status = watch("status") || 0;
//   const showPublishAt = status === 2;
//   const selectedImage = watch("image") as File | null;

//   const [previewUrl, setPreviewUrl] = useState<string | null>(
//     currentImage || null,
//   );

//   useEffect(() => {
//     if (selectedImage instanceof File) {
//       const objectUrl = URL.createObjectURL(selectedImage);
//       setPreviewUrl(objectUrl);
//       return () => URL.revokeObjectURL(objectUrl);
//     } else {
//       setPreviewUrl(currentImage || null);
//     }
//   }, [selectedImage, currentImage]);

//   const handleAuthorTypeChange = (value: string | number) => {
//     const boolValue = value === "nickname";
//     onAuthorTypeChange(boolValue);
//     if (!boolValue) {
//       setValue("author", defaultAuthor);
//     } else {
//       setValue("author", "");
//     }
//   };

//   const handleStatusChange = (value: number) => {
//     setValue("status", value);
//     if (value !== 2) {
//       setValue("publishAt", "");
//     }
//   };

//   const fields = (
//     <div className="flex flex-col gap-3">
//       <div>
//         <Text text="عکس بلاگ" size="md" weight="medium" />
//         <div className="mt-1 flex items-center gap-3">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray bg-gray-50">
//             {previewUrl ? (
//               <Image
//                 src={previewUrl}
//                 alt="پیش‌نمایش تصویر"
//                 width={64}
//                 height={64}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <Text text="بدون عکس" size="sm" color="gray" />
//             )}
//           </div>

//           <label className="flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-dashed border-gray px-3 py-3 text-center text-sm text-primary transition hover:bg-gray-50">
//             <Text
//               text={
//                 selectedImage
//                   ? selectedImage.name
//                   : "برای وارد کردن تصویر کلیک کنید "
//               }
//               size="sm"
//             />

//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0] || null;
//                 setValue("image", file, { shouldValidate: true });
//               }}
//             />
//           </label>
//         </div>
//       </div>
//       {/* عنوان بلاگ */}
//       <div>
//         <Text text="عنوان بلاگ" size="md" weight="medium" />
//         <input
//           type="text"
//           {...register("title")}
//           placeholder="عنوان بلاگ را وارد کنید"
//           className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
//         />
//         {formErrors.title && (
//           <Text text={`${formErrors.title.message}`} size="sm" color="danger" />
//         )}
//       </div>

//       {/* نام نویسنده */}
//       <div>
//         <Text text="نام نویسنده" size="md" weight="medium" />
//         <div className="mt-1 flex gap-2">
//           <div className="w-[180px]">
//             <CustomSelect
//               value={isUsingNickname ? "nickname" : "default"}
//               onChange={handleAuthorTypeChange}
//               options={authorTypeOptions}
//               className="w-1/3"
//               placeholder="انتخاب کنید"
//             />
//           </div>

//           <input
//             type="text"
//             {...register("author")}
//             placeholder={
//               isUsingNickname ? "نام مستعار را وارد کنید" : defaultAuthor
//             }
//             disabled={!isUsingNickname}
//             className={`text-regular flex-1 rounded-sm border px-3 py-2.5 text-sm text-primary shadow-sm focus:border-primary focus:outline-none ${
//               !isUsingNickname
//                 ? "cursor-not-allowed border-gray bg-gray-100 text-gray"
//                 : "border-gray bg-white"
//             }`}
//           />
//         </div>
//         {formErrors.author && (
//           <Text
//             text={`${formErrors.author.message}`}
//             size="sm"
//             color="danger"
//           />
//         )}
//       </div>

//       {/* خلاصه بلاگ */}
//       <div>
//         <Text text="خلاصه بلاگ" size="md" weight="medium" />
//         <textarea
//           {...register("summary")}
//           placeholder="خلاصه بلاگ را وارد کنید"
//           rows={3}
//           className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
//         />
//         {formErrors.summary && (
//           <Text
//             text={`${formErrors.summary.message}`}
//             size="sm"
//             color="danger"
//           />
//         )}
//       </div>

//       {/* وضعیت انتشار */}
//       <div>
//         <Text text="وضعیت انتشار" size="md" weight="medium" />
//         <div className="mt-2 flex flex-wrap gap-3">
//           {Object.entries(statusMap).map(([key, { label, color }]) => {
//             const value = Number(key);
//             const isSelected = status === value;
//             return (
//               <button
//                 key={key}
//                 type="button"
//                 onClick={() => handleStatusChange(value)}
//                 className={`cursor-pointer rounded-sm px-4 py-2 font-medium text-sm transition-all ${color} ${
//                   isSelected
//                     ? `shadow-md ring-2 ring-${color} ring-offset-2`
//                     : "hover:scale-105 hover:shadow-sm"
//                 }`}
//               >
//                 <Text text={label} size="sm" weight="regular" />
//               </button>
//             );
//           })}
//         </div>
//         {formErrors.status && (
//           <Text
//             text={`${formErrors.status.message}`}
//             size="sm"
//             color="danger"
//           />
//         )}
//       </div>

//       {/* زمان انتشار */}
//       {showPublishAt && (
//         <div>
//           <Text text="زمان انتشار" size="md" weight="medium" />
//           <input
//             type="datetime-local"
//             {...register("publishAt")}
//             className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-2.5 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
//           />
//           {formErrors.publishAt && (
//             <Text
//               text={`${formErrors.publishAt.message}`}
//               size="sm"
//               color="danger"
//             />
//           )}
//         </div>
//       )}

//       {/* عکس بلاگ */}
//       {/* <div>
//         <Text text="عکس بلاگ" size="md" weight="medium" />
//         <div className="mt-1 flex items-center gap-3">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray bg-gray-50">
//             {previewUrl ? (
//               <Image
//                 src={previewUrl}
//                 alt="پیش‌نمایش تصویر"
//                 width={64}
//                 height={64}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <Text text="بدون عکس" size="sm" color="gray" />
//             )}
//           </div>

//           <label className="flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-dashed border-gray px-3 py-3 text-center text-sm text-primary transition hover:bg-gray-50">
//             <Text
//               text={
//                 selectedImage
//                   ? selectedImage.name
//                   : "برای وارد کردن تصویر کلیک کنید "
//               }
//               size="sm"
//             />

//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0] || null;
//                 setValue("image", file, { shouldValidate: true });
//               }}
//             />
//           </label>
//         </div>
//       </div> */}
//     </div>
//   );

//   if (standalone) {
//     return fields;
//   }

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onNext?.();
//       }}
//       className="mt-4 flex h-full flex-col justify-between px-6"
//     >
//       {fields}
//       <div className="mb-10">
//         <button
//           type="submit"
//           className="hover:bg-primary-dark flex w-full cursor-pointer items-center justify-center rounded-sm bg-secondary py-3 text-white"
//         >
//           <Text text="مرحله بعد" size="lg" weight="medium" color="white" />
//         </button>
//       </div>
//     </form>
//   );
// }
// src/app/(landing)/blogs/_components/step1-content.tsx
"use client";

import { CloseIcon, ExitIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { CustomSelect } from "@/src/shared/ui/custom-select/custom-select.ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BlogFormValues } from "./blog.schema";

interface Step1ContentProps {
  onNext?: () => void;
  errors: any;
  isUsingNickname: boolean;
  onAuthorTypeChange: (value: boolean) => void;
  defaultAuthor: string;
  currentImage?: string | null;
  standalone?: boolean;
}

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "پیش‌نویس", color: "bg-gray-200 text-gray-700" },
  1: { label: "منتشر شده", color: "bg-green-100 text-green-700" },
  2: { label: "زمان بندی شده", color: "bg-blue-100 text-blue-700" },
  3: { label: "منتشر نشده", color: "bg-red-100 text-red-700" },
};

const authorTypeOptions = [
  { label: "نام پیش فرض", value: "default" },
  { label: "وارد کردن نام", value: "nickname" },
];

export function Step1Content({
  onNext,
  errors,
  isUsingNickname,
  onAuthorTypeChange,
  defaultAuthor,
  currentImage,
  standalone = false,
}: Step1ContentProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useFormContext<BlogFormValues>();

  const status = watch("status") || 0;
  const showPublishAt = status === 2;
  const selectedImage = watch("image") as File | null;

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || null,
  );

  useEffect(() => {
    if (selectedImage instanceof File) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(currentImage || null);
    }
  }, [selectedImage, currentImage]);

  const handleAuthorTypeChange = (value: string | number) => {
    const boolValue = value === "nickname";
    onAuthorTypeChange(boolValue);
    if (!boolValue) {
      setValue("author", defaultAuthor);
    } else {
      setValue("author", "");
    }
  };

  const handleStatusChange = (value: number) => {
    setValue("status", value);
    if (value !== 2) {
      setValue("publishAt", "");
    }
  };

  const removeImage = () => {
    setValue("image", null);
    setPreviewUrl(null);
    // ریست کردن input file
    const input = document.getElementById("blog-image") as HTMLInputElement;
    if (input) input.value = "";
  };

  const fields = (
    <div className="flex flex-col gap-6">
      {/* ===== عکس بلاگ با استایل جدید ===== */}
      <div className="flex w-full flex-col gap-4">
        <label
          htmlFor="blog-image"
          className="flex h-50 w-full cursor-pointer flex-col items-center justify-center rounded-xs border-2 border-dashed border-gray transition"
        >
          <div className="rotate-90">
            <ExitIcon size="md" color="text-secondary" />
          </div>
          <Text
            text="تصویر بلاگ را بارگزاری کنید."
            weight="regular"
            size="md"
            color="secondary"
          />
          {!selectedImage && !currentImage ? (
            <Text
              text="هنوز تصویری انتخاب نشده است"
              color="secondary"
              weight="light"
            />
          ) : (
            <Text
              text="PNG, JPG, JPEG"
              size="sm"
              weight="light"
              color="secondary"
            />
          )}
          <input
            id="blog-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setValue("image", file, { shouldValidate: true });
            }}
            className="hidden"
          />
        </label>

        {/* پیش‌نمایش تصویر */}
        {previewUrl && (
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Image
                src={previewUrl}
                alt="پیش‌نمایش تصویر"
                width={100}
                height={100}
                className="h-25 w-25 rounded border border-gray object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-danger"
              >
                <CloseIcon size="2xs" color="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex w-full flex-row gap-3">
        {/* عنوان بلاگ */}
        <div className="w-full flex-1">
          <Text text="عنوان بلاگ" size="md" weight="medium" />
          <input
            type="text"
            {...register("title")}
            placeholder="عنوان بلاگ را وارد کنید"
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
          {formErrors.title && (
            <Text
              text={`${formErrors.title.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* نام نویسنده */}
        <div className="w-full flex-1">
          <Text text="نام نویسنده" size="md" weight="medium" />
          <div className="mt-1 flex gap-2">
            <div className="w-[180px]">
              <CustomSelect
                value={isUsingNickname ? "nickname" : "default"}
                onChange={handleAuthorTypeChange}
                options={authorTypeOptions}
                className="w-1/3"
                placeholder="انتخاب کنید"
              />
            </div>

            <input
              type="text"
              {...register("author")}
              placeholder={
                isUsingNickname ? "نام مستعار را وارد کنید" : defaultAuthor
              }
              disabled={!isUsingNickname}
              className={`text-regular flex-1 rounded-sm border px-3 py-2.5 text-sm text-primary shadow-sm focus:border-primary focus:outline-none ${
                !isUsingNickname
                  ? "border-gray bg-gray-100 text-gray"
                  : "border-gray"
              }`}
            />
          </div>
          {formErrors.author && (
            <Text
              text={`${formErrors.author.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>
      </div>

      {/* خلاصه بلاگ */}
      <div>
        <Text text="خلاصه بلاگ" size="md" weight="medium" />
        <textarea
          {...register("summary")}
          placeholder="خلاصه بلاگ را وارد کنید"
          rows={3}
          className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
        />
        {formErrors.summary && (
          <Text
            text={`${formErrors.summary.message}`}
            size="sm"
            color="danger"
          />
        )}
      </div>

      {/* وضعیت انتشار */}
      <div>
        <Text text="وضعیت انتشار" size="md" weight="medium" />
        <div className="mt-2 flex flex-wrap gap-3">
          {Object.entries(statusMap).map(([key, { label, color }]) => {
            const value = Number(key);
            const isSelected = status === value;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleStatusChange(value)}
                className={`cursor-pointer rounded-sm px-4 py-2 font-medium text-sm transition-all ${color} ${
                  isSelected
                    ? `shadow-md ring-2 ring-${color} ring-offset-2`
                    : "hover:scale-105 hover:shadow-sm"
                }`}
              >
                <Text text={label} size="sm" weight="regular" />
              </button>
            );
          })}
        </div>
        {formErrors.status && (
          <Text
            text={`${formErrors.status.message}`}
            size="sm"
            color="danger"
          />
        )}
      </div>

      {/* زمان انتشار */}
      {showPublishAt && (
        <div>
          <Text text="زمان انتشار" size="md" weight="medium" />
          <input
            type="datetime-local"
            {...register("publishAt")}
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-2.5 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
          {formErrors.publishAt && (
            <Text
              text={`${formErrors.publishAt.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>
      )}
    </div>
  );

  if (standalone) {
    return fields;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext?.();
      }}
      className="mt-4 flex h-full flex-col justify-between px-6"
    >
      {fields}
      <div className="mb-10">
        <button
          type="submit"
          className="hover:bg-primary-dark flex w-full cursor-pointer items-center justify-center rounded-sm bg-secondary py-3 text-white"
        >
          <Text text="مرحله بعد" size="lg" weight="medium" color="white" />
        </button>
      </div>
    </form>
  );
}
