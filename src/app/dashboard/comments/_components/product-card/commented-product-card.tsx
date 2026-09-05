// صفحه: dashboard/profile/comments/AddProductModal.tsx

import Image from "next/image";

import { Caption, DefaultButton, Text } from "@/src/shared/ui";

import { CommentedProductType } from "@/src/app/dashboard/comments/_types/product-comments.types";
import { StoreIcon } from "@/src/shared/constants/icons/store-icon";
import { VerifiedIcon } from "@/src/shared/constants/icons/verified-icon";
import { useRouter } from "next/navigation";

interface CommentedProductCardProps {
  product: CommentedProductType;
}

export function CommentedProductCard({ product }: CommentedProductCardProps) {
  const router = useRouter();
  const handleViewProduct = () => {
    // اگر product.slug وجود دارد، به صفحه محصول برو
    if (product.slug) {
      router.push(`/products/${product.slug}`);
    } else {
      // اگر slug وجود نداشت، می‌توانی از id استفاده کنی یا خطا بدهی
      console.error("slug محصول وجود ندارد");
      // router.push(`/products/${product.id}`); // راه جایگزین
    }
  };
  return (
    <div className="flex w-[340px] flex-shrink-0 flex-col justify-between rounded-sm bg-accent">
      <div className="flex">
        <div className="h-[220px] w-[160px] overflow-hidden rounded-bl">
          <Image
            src={product.image}
            alt={product.title}
            width={160}
            height={220}
            className="h-full w-full"
          />
        </div>

        <div className="flex flex-1 flex-col px-6">
          <div className="flex flex-col gap-2 border-b-2 border-gray py-6">
            <Text text={product.title} size="md" weight="bold" />

            {/* <Text text={product.variant} size="sm" /> */}
          </div>

          <div className="flex flex-col gap-3 py-6">
            <div className="flex items-center gap-2">
              <StoreIcon size="md" />

              <Caption text={product.storeName} size="2xs" weight="bold" />
            </div>

            <div className="flex items-center gap-2">
              <VerifiedIcon size="md" />

              <Caption text={product.guarantee} size="2xs" weight="bold" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 px-6 pt-12 pb-6">
        {/* <Price price={product.price} /> */}
        <DefaultButton
          label=" مشاهده محصول"
          style="fill"
          type="primary"
          action={handleViewProduct}
        />
      </div>
    </div>
  );
}
