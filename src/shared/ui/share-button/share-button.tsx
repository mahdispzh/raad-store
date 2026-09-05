"use client";

import { ShareIcon } from "@/src/shared/constants/icons";

type ShareButtonProps = {
  size?: "md" | "lg";
  color?: "secondary" | "primary";
};

export function ShareButton({
  size = "md",
  color = "secondary",
}: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "این صفحه رو ببین",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("لینک کپی شد");
      }
    } catch (error) {
      console.error("Share canceled:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="cursor-pointer hover:opacity-70"
    >
      <ShareIcon size={size} color={`text-${color}`} />
    </button>
  );
}
