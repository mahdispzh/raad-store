import { useAuthStore } from "@/src/shared/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../_services/cart.api";
import { addComment } from "../_services/comment.api";
import type { ProductItem } from "../_types";
import type {
  ColorItem,
  ProductVariant,
  SizeItem,
  TemporaryProduct,
} from "../_types/landing-product.types";
import { useCartt } from "./useCartt";

interface UseLandingProductLogicParams {
  slug: string;
  initialProduct?: ProductItem | null | undefined;
  similarProducts?: unknown[];
}

export function useLandingProductLogic({
  initialProduct,
  similarProducts = [],
}: UseLandingProductLogicParams) {
  const router = useRouter();
  const reviewsRef = useRef<HTMLDivElement>(null);

  // ==================== وضعیت احراز هویت ====================
  const isLoggedIn = !!useAuthStore((state) => state.user)?.id;
  const userId = useAuthStore((state) => state.user)?.id;

  // ==================== سبد خرید ====================
  const {
    data: cartData,
    isLoading: cartLoading,
    refetchCart,
  } = useCartt(isLoggedIn);

  // ==================== وضعیت‌های محلی ====================
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [submitType, setSubmitType] = useState<"named" | "anonymous">("named");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isButtonActive = review.trim().length > 0;

  // ==================== پردازش داده‌های اولیه ====================
  const product = initialProduct ?? null;
  const isLoading = !product;
  const isError = false;
  const error = null;

  // تبدیل به فرمت موقت (TemporaryProduct)
  let tempProduct: TemporaryProduct = {
    id: 0,
    name: "",
    description: "",
    images: [],
    product_variants: [],
    comments: [],
    ratings: [],
    category_id: null,
    slug: "",
    isLiked: false,
  };

  let variants: ProductVariant[] = [];
  let uniqueColors: ColorItem[] = [];
  let uniqueSizes: SizeItem[] = [];
  let rawComments: Array<{
    id: number;
    user_id: number;
    isUnknown: boolean | null;
    parent_id: number | null;
    created_at: string | null;
    text: string;
    status: number | null;
    users: { name: string | null };
    rating?: number | null;
  }> = [];
  let averageRating = 0;

  if (product) {
    tempProduct = {
      ...(product as unknown as TemporaryProduct),
      product_variants: ((
        product as ProductItem & { product_variants?: ProductVariant[] }
      ).product_variants ?? []) as ProductVariant[],
      comments: ((
        product as Partial<TemporaryProduct> & {
          comments?: Array<{
            id: number;
            user_id: number;
            isUnknown: boolean | null;
            parent_id: number | null;
            created_at: string | null;
            text: string;
            status: number | null;
            users: { name: string | null };
            rating?: number | null;
          }>;
        }
      ).comments ?? []) as Array<{
        id: number;
        user_id: number;
        isUnknown: boolean | null;
        parent_id: number | null;
        created_at: string | null;
        text: string;
        status: number | null;
        users: { name: string | null };
        rating?: number | null;
      }>,
      ratings: ((
        product as Partial<TemporaryProduct> & {
          ratings?: Array<{ rating?: number }>;
        }
      ).ratings ?? []) as Array<{ rating?: number }>,
      category_id:
        (product as Partial<TemporaryProduct> & { category_id?: number | null })
          .category_id ?? null,
      slug: product.slug,
      isLiked: product.isLiked ?? false,
      features: (product as any)?.features ?? [],
    };

    variants = tempProduct.product_variants || [];

    // استخراج رنگ‌های یکتا
    uniqueColors = Array.from(
      new Map(
        variants.map((v) => [
          v.color_id,
          {
            id: v.color_id,
            name: v.colors?.name || "نامشخص",
            hex_code: v.colors?.hex_code || "#000000",
          },
        ]),
      ).values(),
    );

    // استخراج سایزهای یکتا
    uniqueSizes = Array.from(
      new Map(
        variants.map((v) => [
          v.size_id,
          {
            id: v.size_id,
            name: v.sizes?.name || "نامشخص",
          },
        ]),
      ).values(),
    );

    rawComments = (tempProduct.comments ?? []) as Array<{
      id: number;
      user_id: number;
      isUnknown: boolean | null;
      parent_id: number | null;
      created_at: string | null;
      text: string;
      status: number | null;
      users: { name: string | null };
      rating?: number | null;
    }>;

    const ratingsArray =
      (
        product as Partial<TemporaryProduct> & {
          ratings?: Array<{ rating?: number }>;
        }
      ).ratings || [];
    averageRating = ratingsArray.length
      ? ratingsArray.reduce((s: number, r) => s + (r.rating ?? 0), 0) /
        ratingsArray.length
      : 0;
  }

  // ==================== توابع کمکی واریانت ====================
  const getVariantsByColor = (colorId: number) =>
    variants.filter((v) => v.color_id === colorId);

  const getVariantsBySize = (sizeId: number) =>
    variants.filter((v) => v.size_id === sizeId);

  const findVariant = (cId: number | null, sId: number | null) =>
    variants.find((v) => v.color_id === cId && v.size_id === sId) || null;

  // ==================== افکت انتخاب پیش‌فرض واریانت ====================
  useEffect(() => {
    if (!variants.length) return;

    if (!selectedColorId && !selectedSizeId) {
      const first = variants[0]!;
      setSelectedVariant(first);
      setSelectedColorId(first.color_id);
      setSelectedSizeId(first.size_id);
      return;
    }

    const variant = findVariant(selectedColorId, selectedSizeId);
    if (variant) {
      setSelectedVariant(variant);
      return;
    }

    if (selectedColorId) {
      const first = getVariantsByColor(selectedColorId)[0];
      if (first) {
        setSelectedVariant(first);
        setSelectedSizeId(first.size_id);
      }
    } else if (selectedSizeId) {
      const first = getVariantsBySize(selectedSizeId)[0];
      if (first) {
        setSelectedVariant(first);
        setSelectedColorId(first.color_id);
      }
    }
  }, [
    selectedColorId,
    selectedSizeId,
    variants,
    findVariant,
    getVariantsByColor,
    getVariantsBySize,
  ]);

  // ==================== هندلرهای انتخاب رنگ و سایز ====================
  const handleSelectColor = (colorId: number) => {
    setSelectedColorId(colorId);
    // اگر سایز انتخاب‌شده برای این رنگ موجود نیست، آن را ریست کن
    if (
      selectedSizeId &&
      !getVariantsByColor(colorId).some((v) => v.size_id === selectedSizeId)
    ) {
      setSelectedSizeId(null);
    }
  };

  const handleSelectSize = (sizeId: number) => {
    setSelectedSizeId(sizeId);
    // اگر رنگ انتخاب‌شده برای این سایز موجود نیست، آن را ریست کن
    if (
      selectedColorId &&
      !getVariantsBySize(sizeId).some((v) => v.color_id === selectedColorId)
    ) {
      setSelectedColorId(null);
    }
  };

  // ==================== اطلاعات واریانت فعلی ====================
  const currentPrice = selectedVariant?.price ?? 0;
  const currentColorName = selectedVariant?.colors?.name ?? "نامشخص";
  const currentSizeName = selectedVariant?.sizes?.name ?? "نامشخص";

  // ==================== وضعیت در سبد خرید ====================
  const cartItem = cartData?.cart_items?.find(
    (item: { variant_id?: number }) => item.variant_id === selectedVariant?.id,
  );
  const isInCart = !!cartItem;
  const quantityInCart = cartItem?.quantity || 0;

  // ==================== توابع مدیریت سبد خرید ====================
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return;
    await addToCart(selectedVariant.id, 1);
    await refetchCart();
  };

  const handleIncrease = async () => {
    if (!cartItem?.id) return;
    await updateCartItem(cartItem.id, quantityInCart + 1);
    await refetchCart();
  };

  const handleDecrease = async () => {
    if (!cartItem?.id) return;
    if (quantityInCart === 1) {
      await deleteCartItem(cartItem.id);
    } else {
      await updateCartItem(cartItem.id, quantityInCart - 1);
    }
    await refetchCart();
  };

  const handleViewCart = () => router.push("/profile/cart");

  // ==================== اسکرول به نظرات ====================
  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ==================== ثبت دیدگاه ====================
  const handleSubmitReview = async () => {
    if (!isButtonActive || !tempProduct.id) return;

    setIsSubmitting(true);
    try {
      const result = await addComment({
        product_id: tempProduct.id,
        text: review,
        isUnknown: submitType === "anonymous",
      });

      if (result.success) {
        setIsReviewModalOpen(false);
        setReview("");
        setIsNameModalOpen(false);
        // در صورت نیاز می‌توانید لیست نظرات را به‌روز کنید (مثلاً با refetch)
      }
    } catch (error) {
      console.error("خطا در ثبت دیدگاه:", error);
      alert("خطا در ثبت دیدگاه. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== خروجی ====================
  return {
    // داده‌های اصلی
    product: tempProduct,
    isLoading,
    isError,
    error,
    userId,
    isLoggedIn,

    // نظرات و امتیاز
    rawComments,
    averageRating,
    reviewsRef,
    scrollToReviews,

    // لایک
    isLiked: tempProduct.isLiked ?? false,

    // واریانت‌ها و انتخاب
    uniqueColors,
    uniqueSizes,
    selectedColorId,
    selectedSizeId,
    selectedVariant,
    handleSelectColor,
    handleSelectSize,
    currentPrice,
    currentColorName,
    currentSizeName,

    // سبد خرید
    cartLoading,
    isInCart,
    quantityInCart,
    handleAddToCart,
    handleIncrease,
    handleDecrease,
    handleViewCart,

    // محصولات مشابه (از props)
    similarProducts,

    // مودال نظرات
    isReviewModalOpen,
    setIsReviewModalOpen,
    review,
    setReview,
    isNameModalOpen,
    setIsNameModalOpen,
    submitType,
    setSubmitType,
    isButtonActive,
    handleSubmitReview,
    isSubmitting,
  };
}
