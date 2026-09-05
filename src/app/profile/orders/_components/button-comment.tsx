// src/app/profile/orders/_components/ui/button-comment.tsx
import { CircularCommentIcon } from "@/src/shared/constants/icons/circular-comment-icon";
import { DefaultButton } from "@/src/shared/ui";

interface Props {
productSlug?: string | undefined;
  onClick?: () => void;
}

export function ButtonComment({ productSlug = "", onClick }: Props) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (productSlug) {
      // منطق پیش‌فرض - هدایت به صفحه محصول
      window.location.href = `/products/${productSlug}`;
    }
  };

  return (
    <DefaultButton
      action={handleClick}
      label="ثبت دیدگاه"
      style="fill"
      type="secondary"
      icon={<CircularCommentIcon size="md" color="text-danger" />}
    />
  );
}