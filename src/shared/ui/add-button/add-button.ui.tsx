"use client";

import { PlusEmptyIcon } from "../../constants/icons";
import { Text } from "../text/text.ui";
import { AddButtonProps } from "./add-button.types";
import { useAddButton } from "./useAddButton";

export function AddButton({
  text,
  className = "",
  action,
  isLoading = false,
  disabled = false,
}: AddButtonProps) {
  const { handleClick, isPending } = useAddButton(action);

  const showLoading = isLoading || isPending;

  return (
    <button
      onClick={handleClick}
      disabled={disabled || showLoading}
      className={`
        flex
        h-[4vw]
        w-full
        flex-col
        items-center
        justify-center
        rounded-sm
        bg-accent/50
        cursor-pointer
        transition-all
        duration-200
        hover:bg-accent/60
        active:scale-95
        gap-1
        ${disabled || showLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {showLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
      ) : (
        <>
          <PlusEmptyIcon size="xs" color="text-secondary" />
          <Text text={text} size="sm" color="secondary" weight="light" />
        </>
      )}
    </button>
  );
}